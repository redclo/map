import { css } from "@linaria/core";
import { defineComponent, ref, onMounted, reactive, nextTick } from "vue";
import { useCtx } from "../../context";
import { Button, Slider } from "ant-design-vue";

export default defineComponent({
    setup() {
        const { gameMap } = useCtx();
        const canvasRef = ref();
        const init: number[] = [];
        const state = reactive({ selected: init })

        document.oncontextmenu = function () {
            return false;
        }

        onMounted(() => {
            document.title = "Emotional Autonomous Region";
            gameMap.actions.editorLoad().then(() => {
                gameMap.actions.initWidthCanvas(canvasRef.value);
            })
        })

        const iconsRef = ref<{ index: number, imgRef: any }[]>([]);
        for (let i = 0; i < 26; i++) {
            iconsRef.value.push({ index: i, imgRef: ref() });
        }

        return () => (
            <div class={rootStyle}>
                <canvas ref={canvasRef} />
                <div class={"hud" + (gameMap.state.showHud ? "" : " hide")} >

                    <Slider min={0.8} max={12} step={0.1} value={gameMap.state.scale} onChange={(s: any) => {

                        console.log("=>s", s);
                        gameMap.actions.updateScale(s);

                    }} />

                    <Button onClick={() => gameMap.actions.cleanSelect()}>清除选择</Button>
                    <Button onClick={() => {
                        gameMap.actions.saveTiles();
                    }}>保存</Button>
                    <Button onClick={() => {
                        gameMap.actions.loadLocalConfig();
                    }}>导入</Button>

                    <Button onClick={() => {
                        gameMap.state.showIcons = !gameMap.state.showIcons
                    }}>图标</Button>

                    <Button onClick={() => {
                        gameMap.actions.shoeText(!gameMap.state.showText);
                    }}>文字</Button>

                </div>

                <div class={"hud-move" + (gameMap.state.showHud ? "" : " hide")}>
                    <Button onClick={() => {
                        gameMap.actions.moveX(-gameMap.state.IconSize * 0.5);
                    }}>左移</Button>
                    <Button onClick={() => {
                        gameMap.actions.moveX(gameMap.state.IconSize * 0.5);
                    }}>右移</Button>
                    <Button onClick={() => {
                        gameMap.actions.moveY(-gameMap.state.IconSize * 0.5);
                    }}>上移</Button>
                    <Button onClick={() => {
                        gameMap.actions.moveY(gameMap.state.IconSize * 0.5);
                    }}>下移</Button>
                    <Button onClick={() => {
                        gameMap.actions.moveX(-gameMap.state.offsetX);
                        gameMap.actions.moveY(-gameMap.state.offsetY);
                    }}>归零</Button>
                </div>

                <div class={"icons " + (!gameMap.state.showIcons ? "hide" : "")}>
                    <div class={"items"}>
                        {
                            iconsRef.value.map(item => <img onClick={() => {
                                const i = state.selected.indexOf(item.index);
                                if (i == -1) {
                                    state.selected.push(item.index);
                                    return;
                                }
                                state.selected.splice(i, 1);
                            }} src={`./icons/${item.index + 1}.jpg`} alt={item + ""} key={item.index} class={state.selected.indexOf(item.index) > -1 ? "selected" : ""} />)
                        }
                    </div>

                    <Button onClick={() => {
                        gameMap.actions.insertIcons(state.selected);
                    }}>放置</Button>

                    <Button onClick={() => {
                        gameMap.actions.cleanIcons();
                    }}>清除</Button>

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
    right: 10px;
    top: 10px;
    &.hide {
        visibility: hidden;
    }
    .timer{
        font-size: 24px;
        color: white;
        margin-right: 10px;
    }
  }
  .hud-move {
    position: absolute;
    bottom: 10px;
    left: 50%;
     &.hide {
        visibility: hidden;
    }
  }

  .icons {
    position: absolute;
    right: 0px;
    top: 90px;
    width: 200px;

    .items {
        img{
            width: 40px;
        }
        .selected{
            border: 2px solid orange;
        }
    }
    &.hide{
        visibility: hidden;
    }
  }
`;
