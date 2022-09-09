import { css } from "@linaria/core";
import { defineComponent, ref, onMounted, reactive, nextTick, computed } from "vue";
import { useCtx } from "../../context";

import ImgButton from "./components/imgButton";

import Info from "./info";
import Legend from "./legend";


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
            state.showInfo = !state.showInfo;
        }

        const state = reactive({
            showInfo: false,
            showLegend: false,
        })

        return () => (
            <div class={rootStyle}>
                <canvas ref={canvasRef} />
                <div class="hud">
                    <div class="top-left">
                        <ImgButton onClick={() => {
                            showInfo();
                        }} src={require("@/assets/info.png")} width="10vw" />

                        <ImgButton onClick={() => {
                            state.showLegend = !state.showLegend;
                        }} src={require("@/assets/guide.png")} width="10vw" />
                    </div>
                </div>

                {
                    state.showInfo &&  <Info onClose={() => {
                        state.showInfo = false;
                    }} />
                }
        
                {
                    state.showLegend &&  <Legend onClose={() => {
                        state.showLegend = false;
                    }} />
                }                
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
    @media screen and (min-width: 1750px) {
        border: 20px solid #ED81B7;
    }
  }

  .lover {
    position: absolute;
    right: 0px;
    bottom: 27px;
    width: 138px;
  }
`;
