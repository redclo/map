const createObjectURL = URL.createObjectURL;
const revokeObjectURL = URL.revokeObjectURL;

const objectURLMaps = new Map<string, any>();

URL.createObjectURL = function (obj: Blob | MediaSource): string {
  const url = createObjectURL(obj);
  objectURLMaps.set(url, obj);
  return url;
};
URL.revokeObjectURL = function (url: string) {
  revokeObjectURL(url);
  objectURLMaps.delete(url);
};

function getObjectURLName(url: string){
  return objectURLMaps.get(url)?.name;
}

function getObjectURLExt(url: string) {
  const blob = objectURLMaps.get(url);
  let ext = "unkown";
  if (blob) {
    const exp = /^.+\.(.+)$/;
    if (blob.name && exp.test(blob.name)) {
      ext = (exp.exec(blob.name) as any)[1];
    } else if (blob.type) {
      ext = blob.type;
    }
    return ext.toLowerCase();
  } else {
    return ext;
  }
}

function isObjectURL(url: string) {
  return /^blob:/.test(url);
}

export { objectURLMaps, getObjectURLExt, getObjectURLName, isObjectURL };
