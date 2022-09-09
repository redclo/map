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
                    <img onClick={()=>{
                        state.showDialog = false;
                        setTimeout(() => {
                            emit("close")
                        }, 300);
                    }} src={require("@/assets/close.png")} alt="close"  class={"close"}/>
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
    top: 50%;
    left: 50%;
    margin: 0 !important;
    transform: translate(-50%, -50%);
    max-height: calc(100% - 30px);

    display: flex;
    overflow: auto;

    ::-webkit-scrollbar {
        width: 8px;
        height: 8px;
    }
    ::-webkit-scrollbar-track {
    background: transparent;
    }
    ::-webkit-scrollbar-thumb {
    background: rgba(150, 150, 150, 0.2);
    border-radius: 8px;
    }
    ::-webkit-scrollbar-thumb:hover {
    background: rgba(150, 150, 150, 0.3);
    }
    .close {
        position: absolute;
        top: 24px;
        right: 24px;
        cursor: pointer;
        width: 60px;
        z-index: 1;
        @media screen and (max-width: 756px) {
            width: 40px;
        }
    }

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
`
const rootStyle = css`
    max-width: 1000px;
    width: 100%;
    pointer-events: visible;
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
    min-width: 500px;
`;
