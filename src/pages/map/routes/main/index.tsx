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
            //Modal.show(<Info />, {width: "100%"})
            state.showInfo = true;
        }

        const state = reactive({
            showInfo: false,
        })

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

                <div class={"dialog" + (state.showInfo ? " active":"")}>
                    <Info class={state.showInfo? "show":"hide"} onClose={()=>{
                        state.showInfo = false;
                    }} />
                </div>

                <img src={require("@/assets/love.png")} alt="love" class={"lover"} />
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
  .dialog {
    position: fixed;
    left:0;
    right:0;
    bottom:0;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: auto;
    pointer-events: none;

    &.active{
        pointer-events: unset;
    }
    .show {
        transform: scale(1);
        opacity: 1;
    }
    .hide {
        transform: scale(0);
        opacity: 0;
    }
  }
  .lover {
    position: absolute;
    right: 0px;
    bottom: 27px;
    width: 138px;
  }
`;