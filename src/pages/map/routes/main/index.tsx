import { css } from "@linaria/core";
import { defineComponent, ref, onMounted, reactive, nextTick, computed } from "vue";
import { useCtx } from "../../context";

import ImgButton from "./components/imgButton";
import Button from "./components/btn";

import Info from "./info";
import Legend from "./legend";
import Item from "./components/item";
import Register from "./register";


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
            showRegister: false,
        })

        return () => (
            <>
                <div class={rootStyle}>
                    <div class="canvasContainer">
                        <canvas ref={canvasRef} />
                    </div>

                    <div class="hud">
                        <div class="top-left">
                            <Button text="info" onClick={() => {
                                showInfo();
                            }} />

                            <Button text="guide" onClick={() => {
                                state.showLegend = !state.showLegend;
                            }} />

                            <Button text="register" onClick={() => {
                                state.showRegister = !state.showRegister;
                            }} />
                        </div>
                    </div>

                    {
                        state.showInfo && <Info onClose={() => {
                            state.showInfo = false;
                        }} />
                    }
                    {
                        state.showRegister && <Register onClose={() => {
                            state.showRegister = false;
                        }} />
                    }

                    <img src={require("@/assets/love.png")} alt="love" class={"lover"} />
                </div>
                {
                    state.showLegend && <Legend onClose={() => {
                        state.showLegend = false;
                    }} />
                }
                {
                    gameMap.state.showItem && <Item onClose={() => {
                        gameMap.state.showItem = false;
                    }} />
                }
            </>
        );
    },
});

const rootStyle = css`
  background-color: black;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  user-select: none;
  .canvasContainer{
    width: 100%;
    height: 100%;
    padding: 1.18vw;
    background: #ED81B7;
    @media screen and (min-width: 1750px) {
        padding: 20px;
    }
  }

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
    pointer-events: none;

    .top-left{
        position: absolute;
        top: 24px;
        left: 24px;
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
    pointer-events:none;
  }
`;
