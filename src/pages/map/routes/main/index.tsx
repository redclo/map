import { css } from "@linaria/core";
import { defineComponent, ref, onMounted, reactive, nextTick } from "vue";
import { useCtx } from "../../context";
import { Button, Slider } from "ant-design-vue";

import ImgButton from "./components/imgButton";
import { Modal } from "@/queenjs/ui";
import Info from "./info";

export default defineComponent({
    setup() {
        const { gameMap } = useCtx();
        const canvasRef = ref();
        document.oncontextmenu = function () {
            return false;
        }

        onMounted(() => {
            document.title = "地图";
            gameMap.actions.MainLoad().then(() => {
                gameMap.actions.initWidthCanvas(canvasRef.value);
            })
        })

        function showInfo() {
            Modal.show(<Info />)
        }

        return () => (
            <div class={rootStyle}>
                <canvas ref={canvasRef} />
                <div class="hud">
                    <div class="top-left">
                        <ImgButton onClick={() => {
                            showInfo();
                        }} src={require("@/assets/info.png")} width="10vw" />
                    </div>
                </div>
            </div>
        );
    },
});

const rootStyle = css`
  background-color: black;
  width: 100vw;
  height: 100vh;
  overflow: hidden;

  canvas {
    width: 100%;
    height: 100%;
  }

  .hud{
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0px;
    left: 0px;
    border: 1.18vw solid #ED81B7;
    pointer-events: none;

    .top-left{
        position: absolute;
        top: 12px;
        left: 12px;
    }
  }
`;
