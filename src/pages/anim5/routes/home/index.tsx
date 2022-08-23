import { css } from "@linaria/core";
import { defineComponent, ref, onMounted } from "vue";
import { useCtx } from "../../context";
import { Button } from "ant-design-vue";
export default defineComponent({
    setup() {
        const { anim } = useCtx();
        const canvasRef = ref();
        const img1Ref = ref();
        const vidoeRef = ref();
        const tiker = ref(0);
        const tikerRef = ref();

        onMounted(() => {
            const imgs = [{
                image: img1Ref.value,
                x: 100,
                y: 200
            }, {
                image: img1Ref.value,
                x: 500,
                y: 100
            }]
            anim.actions.initAnim5(canvasRef.value, imgs, vidoeRef.value);
        })

        return () => (
            <div class={rootStyle}>
                <canvas ref={canvasRef} />
                <div class="res">
                    <img src={require("@/assets/yun1.png")} ref={img1Ref} />
                </div>
                <div class="hud">
                    {
                        anim.state.recording ? <span class="timer">{tiker.value}</span> : null
                    }
                    {
                        !anim.state.recording ?
                            <Button onClick={() => {
                                anim.actions.startRecord5()
                                tiker.value = 0;
                                tikerRef.value = setInterval(() => {
                                    tiker.value += 1;
                                }, 1000)

                            }}>录制</Button> :
                            <Button onClick={() => {
                                anim.actions.stopRecord5();
                                if (tikerRef.value) {
                                    clearInterval(tikerRef.value);
                                    tikerRef.value = null;
                                }
                            }}>点击暂停</Button>
                    }
                </div>
            </div>
        );
    },
});

const rootStyle = css`
  background-color: black;
  width: 100vw;
  height: 100vh;
  position: relative;

  .res {
    visibility: hidden;
    position: absolute;
    left: 100%;
    top: 0;
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
