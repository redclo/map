import { css } from "@linaria/core";
import { defineComponent, ref, onMounted } from "vue";
import { useCtx } from "../../context"

export default defineComponent({
    setup() {
        const canvasRef = ref();
        const { threeM } = useCtx();

        onMounted(() => {
            threeM.actions.initWidthCanvas(canvasRef.value);
        })
        return () => (
            <div class={rootStyle}>
                <canvas ref={canvasRef} />
            </div>
        );
    },
});

const rootStyle = css`
  background-color: black;
  width: 100vw;
  height: 100vh;
  position: relative;
  overflow: hidden;
`;
