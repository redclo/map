import { reactive, watch } from "vue";
// const defaultImg = require("@/assets/imgs/default.png");

export function useImage<T extends { url: string }>(observer: () => T) {
  const image = reactive({ ...observer() });
  watch(
    () => [observer(), observer().url],
    () => {
      Object.assign(image, { ...observer() });
      createImage(image);
    }
  );
  createImage(image);
  return image;
}

function createImage(img: { url: string }) {
  const url = img.url;
  let image: any = new Image();
  image.onload = function () {
    img.url = url;
    image = null;
  };
  image.onerror = function () {
    img.url = "defaultImg";
    image = null;
  };
  image.src = url;
}
