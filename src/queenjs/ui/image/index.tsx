import { defineComponent, ref } from "vue";
import { bool, number, string } from "vue-types";
import "./index.less";

const defaultImg = require("../assets/default.png");

export default defineComponent({
  props: {
    src: string().def(""),
    ratio: number(),
    noCache: bool(),
    size: number().def(240),
  },
  emits: ["click"],
  setup(props, { emit }) {
    const imgRef = ref();

    const getImgSrc = () => {
      const [base, search] = (props.src || defaultImg).split("?");

      const exts = base.split(".");
      const ext = exts[exts.length - 1];

      if (ext == "svg" || /^blob:/.test(props.src)) {
        return props.src;
      }

      const params = new URLSearchParams(search);
      if (props.size) {
        params.set("x-oss-process", `image/resize,w_${props.size}`);
      }
      if (props.noCache) {
        params.set("t", Date.now.toString().slice(0, 9));
      }

      const paramStr = params.toString();
      return base + (paramStr ? "?" + paramStr : "");
    };

    return () => (
      <img
        class="inf-image"
        ref={imgRef}
        src={getImgSrc()}
        onMousedown={(e) => e.preventDefault()}
        onError={() => (imgRef.value.src = defaultImg)}
        onClick={() => emit("click")}
      />
    );
  },
});
