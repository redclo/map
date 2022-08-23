import { css } from "@linaria/core";
import { defineComponent, ref, onMounted } from "vue";
import { useCtx } from "../../context";
import { Button } from "ant-design-vue";
export default defineComponent({
    setup() {
        const { gameMap } = useCtx();
        const canvasRef = ref();

        onMounted(() => {
            document.title = "地图演示";
            gameMap.actions.initWidthCanvas(canvasRef.value);
        })

        return () => (
            <div class={rootStyle}>
                <canvas ref={canvasRef} />
                <div class="hud">
                    <Button>保存</Button>
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
                </div>
            </div>
        );
    },
});

const rootStyle = css`
  background-color: black;
  width: 100vw;
  height: 100vh;
  canvas {
    width: 100%;
    height: 100%;
  }

  .hud{
    position: absolute;
    right: 10px;
    top: 10px;
    .timer{
        font-size: 24px;
        color: white;
        margin-right: 10px;
    }
  }
`;
