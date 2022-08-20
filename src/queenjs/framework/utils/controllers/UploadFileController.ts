import { set } from "lodash";
import { ModuleHttp } from "../../extends/http";
import { getObjectURLExt, objectURLMaps } from "../overwrites/URL";
// import { createRequestController } from "./RequestController";

export class UploadFileController extends ModuleHttp {
  blobUrlMaps: Map<string, Blob> = new Map();

  createObjectURL(blob: Blob) {
    const blobURL = URL.createObjectURL(blob);
    this.blobUrlMaps.set(blobURL, blob);
    return blobURL;
  }

  revokeObjectURL(blobURL: string) {
    URL.revokeObjectURL(blobURL);
    this.blobUrlMaps.delete(blobURL);
  }

  getFileByObjectURL(blobURL: string) {
    return this.blobUrlMaps.get(blobURL);
  }


  async selectFileToBlob(accept: string = "*") {
    const [file] = await this.selectAnyFile(false, accept);
    if (!file) return;
    const blobUrl = URL.createObjectURL(file.file);
    return {
      url: blobUrl,
      size: file.file.size,
    };
  }

  async uploadBlobs(data: object, dir = "upload") {
    const todoMap = new Map<string, string>();
    addBlobToList(data);
    const todoList = todoMap.entries();

    let err: string = "";

    for (const item of todoList) {
      const [blobUrl, path] = item;
      const file = objectURLMaps.get(blobUrl);
      if (file) {
        const paths = path.split(",");
        const ret = await this.uploadFile(
          file,
          dir, // paths[0]
          getObjectURLExt(blobUrl)
        );
        if (ret.url) {
          paths.forEach((p) => {
            set(data, p, ret.url);
          });
          URL.revokeObjectURL(blobUrl);
          objectURLMaps.delete(blobUrl);
        } else {
          err = ret.error || `上传文件失败[${path}]`;
          break;
        }
      } else {
        err = `上传文件为空[${path}]`;
      }
    }

    return err;

    function addBlobToList(data: any, path: string = "") {
      if (data instanceof Object) {
        if (data instanceof Array) {
          data.forEach((item, i) => {
            addBlobToList(item, path ? path + "." + i : i.toString());
          });
        } else {
          Object.entries(data).forEach(([key, value]) => {
            addBlobToList(value, path ? path + "." + key : key);
          });
        }
      }
      if (typeof data === "string" && /^blob:/.test(data)) {
        if (todoMap.has(data)) {
          path = todoMap.get(data) + "," + path;
        }
        todoMap.set(data, path);
      }
    }
  }

  selectAnyFile(
    multiple: boolean,
    accept: string //"image/*"
  ): Promise<{ ext: string; file: File }[]> {
    return new Promise((resolve) => {
      const fileInput = document.createElement("input");
      fileInput.type = "file";
      if (accept) {
        fileInput.accept = accept;
      }
      if (multiple) {
        fileInput.multiple = multiple;
      }

      fileInput.onchange = function () {
        //@ts-ignore
        const files = this.files;
        const all: { ext: string; file: File }[] = [];
        if (files) {
          for (let i = 0; i < files.length; i++) {
            const ext = files[i].name.split(".").pop().toLowerCase();
            all.push({ ext, file: files[i] });
          }
        }
        //@ts-ignore
        this.value = null;
        resolve(all);
      };

      fileInput.onclose = function () {
        console.log("close");
      };

      fileInput.click();
    });
  }

  async uploadOneImage(
    maxSize: number = 0,
    exts: string[] = ["png", "jpg"]
  ): Promise<{ url?: string; size?: number; error?: string }> {
    return this.uploadOneFile("image", maxSize, exts);
  }

  async uploadOneFile(
    category: string,
    maxSize: number = 0,
    exts: string[]
  ): Promise<{ url?: string; size?: number; error?: string }> {
    const files = await this.selectAnyFile(false, "");
    if (files.length < 1) return { error: "没有选中图片" };
    const oneFile = files[0];

    if (exts.indexOf(oneFile.ext) < 0) {
      return { error: "不支持的文件各式" };
    }
    if (maxSize > 0 && oneFile.file.size > maxSize) {
      return { error: "文件过大!" };
    }
    return await this.uploadFile(oneFile.file, category);
  }

  randomName(length: number) {
    const data = [
      "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "I",
      "J",
      "K",
      "L",
      "M",
      "N",
      "O",
      "P",
      "Q",
      "R",
      "S",
      "T",
      "U",
      "V",
      "W",
      "X",
      "Y",
      "Z",
      "a",
      "b",
      "c",
      "d",
      "e",
      "f",
      "g",
      "h",
      "i",
      "j",
      "k",
      "l",
      "m",
      "n",
      "o",
      "p",
      "q",
      "r",
      "s",
      "t",
      "u",
      "v",
      "w",
      "x",
      "y",
      "z",
    ];
    let nums = "";
    for (let i = 0; i < length; i++) {
      const r = parseInt(Math.random() * 61 + "");
      nums += data[r];
    }
    return nums;
  }

  async uploadFile(
    file: File | Blob,
    category: string,
    fext?: string
  ): Promise<{ url?: string; size?: number; error?: string }> {
    let fileExt = "";
    let fileName = "";
    if (file instanceof File) {
      const ext = file.name.split(".");
      if (ext.length === 1) return { url: "", size: 0 };
      fileExt = ext[ext.length - 1].toLowerCase();
      fileName = ext[0];
    } else {
      fileName = this.randomName(6);
      fileExt = fext || "";
    }

    const key = `${category}/${fileExt}/${Date.now()}${this.randomName(
      6
    )}_${fileName}.${fileExt}`;
    // const key = `${category}/${Date.now()}.${fileExt}`;
    const ret = await this.request("/save/policy", {
      method: "POST",
      data: { key },
    });
    if (ret.errorNo != 200) {
      return { error: "上传生成签名失败!" };
    }

    const policy = ret.result;
    if (policy.saveType == "minio") {
      const url = await this.minioSubmitFormData(file, ret.result);
      // console.log("uploadFile=>", url)
      return { url, size: file.size };
    }
    if (policy.saveType == "obs") {
      const url = await this.obsSubmitFormData(file, ret.result);
      // console.log("uploadFile=>", url)
      return { url, size: file.size };
    }
    return { error: "前端不支持的文件存储类型" + policy.saveType };
  }

  async obsSubmitFormData(
    file: File | Blob,
    obsPolicy: {
      accessKeyId: string;
      policy: string;
      signature: string;
      host: string;
      key: string;
    }
  ): Promise<string> {
    const formData = new FormData();

    formData.append("key", obsPolicy.key); //存储在oss的文件路径
    formData.append("AccessKeyId", obsPolicy.accessKeyId); //accessKeyId
    formData.append("policy", obsPolicy.policy); //policy
    formData.append("signature", obsPolicy.signature); //签名
    formData.append("x-obs-acl", "public-read");
    formData.append("file", file);

    const result = await this.Post(obsPolicy.host, formData);

    console.log("obsSubmitFormData back", result);

    if (!result) return "";

    return obsPolicy.host + "/" + obsPolicy.key;
  }

  minioSubmitFormData(
    file: File | Blob,
    policy: { url: string; uploadUrl: string }
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("PUT", policy.uploadUrl, true);
      xhr.send(file);
      xhr.onload = () => {
        if (xhr.status == 200) {
          resolve(policy.url);
        }
      };
    });
  }

  Post(url: string, data: any) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("POST", url, true);

      xhr.onload = () => {
        resolve(true);
      };
      xhr.onerror = (e) => {
        resolve(false);
      };
      try {
        xhr.send(data);
      } catch (error) {
        resolve(false);
      }
    });
  }
}

// export const uploader = new UploadFileController();
