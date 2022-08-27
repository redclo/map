import { css } from "@linaria/core";
import { defineComponent, ref, onMounted, reactive, nextTick } from "vue";
import { Button, Slider } from "ant-design-vue";

export default defineComponent({
    emits:["close"],

    setup(props, { slots , emit}) {
        return () => (
            <div class={rootStyle}>
                {
                    slots.default?.()
                }

                <img onClick={()=>emit("close")} src={require("@/assets/close.jpg")} alt="close"  class={"close"}/>
            </div>
        );
    },
});

const rootStyle = css`
    max-width: 1000px;
    width: 100%;
    pointer-events: visible;
    position relative;

    background: #ED81B7;
    border-radius: 6px;
    transition: all .2s;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 23px;
    line-height: 40px;
    color: #FFFFFF;

    .close {
        position: absolute;
        top: 24px;
        right: 24px;
        cursor: pointer;
        width: 60px;
    }
`;
