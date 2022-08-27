import { css } from "@linaria/core";
import { defineComponent, ref, onMounted, reactive, nextTick } from "vue";
import { Button, Slider } from "ant-design-vue";

export default defineComponent({
    setup(props, { slots }) {
        return () => (
            <div class={rootStyle}>
                {
                    slots.default?.()
                }
            </div>
        );
    },
});

const rootStyle = css`
    max-width: 1009px;
    width: 57%;
    background: #ED81B7;
    border-radius: 50px;
`;
