import { css } from "@linaria/core";
import { defineComponent, ref, onMounted, reactive, nextTick } from "vue";
import { Button, Slider } from "ant-design-vue";
import { string } from "vue-types";

export default defineComponent({
    props: {
        width: string(),
        src: string(),
    },
    emits: ["click"],

    setup(props, { emit }) {
        return () => (
            <img onClick={() => emit("click")} class={rootStyle} src={props.src} alt="button" style={{ width: props.width }} />
        );
    },
});

const rootStyle = css`
  pointer-events: auto;
  cursor: pointer;
  min-width: 80px;
  max-width: 160px;
  
  &:active{
    transform: scale(0.9);
  }
`;
