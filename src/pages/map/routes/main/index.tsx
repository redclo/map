import { css } from "@linaria/core";
import { defineComponent, ref, onMounted, reactive, nextTick, computed } from "vue";
import { useCtx } from "../../context";

import ImgButton from "./components/imgButton";
import Button from "./components/btn";

import Info from "./info";
import Legend from "./legend";
import Item from "./components/item";
import Register from "./register";
import { getQuery } from "@/queenjs/framework/utils";


export default defineComponent({
    setup() {
        const { gameMap } = useCtx();
        const canvasRef = ref();
        document.oncontextmenu = function () {
            return false;
        }

        onMounted(() => {
            // document.addEventListener('touchmove', function (e) {
            //     e.preventDefault();
            // }, { passive: false });

            document.title = "地图";
            gameMap.actions.MainLoad().then(() => {
                gameMap.actions.initWidthCanvas(canvasRef.value);
            })
            const query = getQuery();
            if (query.tip) {
                document.title = "地图(展览版本)";
            }
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
                        <div class="border-side"></div>
                        <div class="center">
                            <span class={"left"}></span>
                            <canvas ref={canvasRef} />
                            <span class={"right"}></span>
                        </div>
                        <div class="border-side"></div>
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

                    <img src={require("@/assets/mapsmall.gif")} alt="love" class={"lover"} />
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
    background: #ED81B7;
    .border-side {
        width: 100%;
        height: 14px;
    }
    .center{
        display:flex;
        height: calc(100vh - 28px);

        .left, .right {
            width: 14px;
            height: 100%;
        }
        canvas {
            width: calc( 100% - 28px );
            height: 100%;
        }
    }
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
        top: 32px;
        left: 34px;
    }
  }

  .lover {
    position: absolute;
    right: 0px;
    bottom: 27px;
    width: 138px;
    pointer-events:none;
  }
   @media screen and (max-width: 475px) {
       .lover {
          width: 69px;
          right: 10px;
       }
    }
`;
