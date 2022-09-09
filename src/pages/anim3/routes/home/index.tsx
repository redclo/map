import { css } from "@linaria/core";
import { defineComponent, ref, onMounted, reactive } from "vue";
import { useCtx } from "../../context";
import { Button, Input } from "ant-design-vue";

// 组件注册重新命名
const  InputTextArea = Input.TextArea;

export default defineComponent({
    setup() {
        const { anim } = useCtx();
        const canvasRef = ref();
        const img1Ref = ref();
        const vidoeRef = ref();
        const tiker = ref(0);
        const tikerRef = ref();
        const state = reactive({jumpers:
        `. 0\n& 2 1\n_ 2`})

        onMounted(() => {
            document.title = "动画3录制";
            anim.actions.initAnim3(canvasRef.value);
        })

        return () => (
            <div class={rootStyle}>
                <canvas ref={canvasRef} />
                <div class="res">
                    <img src={require("@/assets/yun1.png")} ref={img1Ref} />
                </div>
                <div class="hud">
                    {
                        anim.state.recording ? <span class="timer">{tiker.value}s</span> : null
                    }
                    {
                        !anim.state.recording ?
                            <Button onClick={() => {
                                anim.actions.startRecord3()
                                tiker.value = 0;
                                tikerRef.value = setInterval(() => {
                                    tiker.value += 1;
                                }, 1000)

                            }}>录制</Button> :
                            <Button onClick={() => {
                                anim.actions.stopRecord3();
                                if (tikerRef.value) {
                                    clearInterval(tikerRef.value);
                                    tikerRef.value = null;
                                }
                            }}>点击完成录制</Button>
                    }
                </div>

                <div class="hud-bottom">
                    <InputTextArea rows={10} value={state.jumpers} onChange={(e:any)=>{
                        state.jumpers = e.target.value || "";
                    }} />
                    <Button onClick={()=>{
                        const  jumpers = state.jumpers.split("\n");
                        const jumps = jumpers.map(item=>{
                            const frags = item.split(" ");
                            if (frags.length == 2) {
                                return {chars: frags[0], delay: parseInt(frags[1]),  head:0, startTick: 0, fill: -1};
                            }
                            if (frags.length == 3) {
                                return {chars: frags[0], delay: parseInt(frags[1]),  head:0, startTick: 0, fill: parseInt(frags[2])-1};
                            }
                            return {chars: item,  delay: 0,  head:0, startTick: 0, fill: -1};
                        })
                        console.log( jumps );
                        anim.actions.anim2UpdateJumper(jumps);
                    }}>更新</Button>
                </div>
            </div>
        );
    },
});

const rootStyle = css`
  background-color: #002FA7;
  width: 100vw;
  height: 100vh;
  position: relative;
  overflow: hidden;

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
  .hud-bottom{
    position: absolute;
    left: 10px;
    bottom: 10px;
  }
`;
