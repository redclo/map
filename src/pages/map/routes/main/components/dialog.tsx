import { css } from "@linaria/core";
import { defineComponent, ref, onMounted, reactive, nextTick } from "vue";
import { Button, Slider } from "ant-design-vue";

export default defineComponent({
    emits:["close"],

    setup(props, { slots , emit}) {

        const state = reactive({
            showDialog: false,
        })

        
        onMounted(()=>{
            setTimeout(()=>{
                state.showDialog = true;
            }, 0)
        })

        return () => (
            <div class={dialogStyle + (state.showDialog ? " active" : "")}>

                <div class={rootStyle + (state.showDialog ? " show" : " hide")}>
                    <div class={"stick-close"}>
                        <img onClick={()=>{
                           state.showDialog = false;
                           setTimeout(() => {
                               emit("close")
                           }, 300);
                        }} src={require("@/assets/close.png")} alt="close"  class={"close"}/>
                    </div>

                    {
                        slots.default?.()
                    }
                  
                </div>
            </div>
        );
    },
});
const dialogStyle = css`
    position: absolute;
    left:0;
    width: 100vw;
    height: 100vh;
    top: 0;
    display:flex;
    flex-direction: column;
    align-items: center;
    color: #FFFFFF;
    overflow-x:hidden;
    overflow-y: auto;

    .stick-close {
        position: sticky;
        text-align: right;
        top: 24px;
        margin-top: 0.24rem;

        .close {
            position: relative;
            right: 24px;
            cursor: pointer;
            width: .6rem;
        }
    }

    .show {
        transform: scale(1);
        opacity: 1;
    }
    .hide {
        transform: scale(0);
        opacity: 0;
    }
`
const rootStyle = css`
    width: 10rem;
    position relative;
    transition: all .2s;
    background: #ED81B7;
    border-radius: 6px;
    transition: all .2s;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 23px;
    line-height: 40px;
    color: #FFFFFF;
    margin-top: 1.5rem;

    @media screen and (max-width: 360px) {
        width: 100%;
    }
`;
