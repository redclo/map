import { css } from "@linaria/core";
import { defineComponent, ref, onMounted } from "vue";
import { useCtx } from "../../context";
import yun1Url from "../../../../assets/yun1.png";

export default defineComponent({
    setup() {
        const { anim } = useCtx();
        const canvasRef = ref();
        onMounted(() => {
            anim.initCanvas(canvasRef.value);
        })
        return () => (
            <>
                <canvas class={rootStyle} ref={canvasRef} />
                <img src={yun1Url} />
            </>
        );
    },
});

const rootStyle = css`
  background-color: black;
  width: 100vw;
  height: 100vh;
`;
