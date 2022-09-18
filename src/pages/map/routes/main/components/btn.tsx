import { css } from "@linaria/core";
import { defineComponent } from "vue";
import { string } from "vue-types";

export default defineComponent({
    props: {
       text: string()
    },
    emits: ["click"],

    setup(props, { emit }) {
        return () => (
            <span onClick={() => emit("click")} class={rootStyle}>{props.text}</span>
        );
    },
});

const rootStyle = css`
  pointer-events: auto;
  cursor: pointer;
  width: 1.8rem;
  height: .6rem;

  text-align: center;
  font-size: .32rem;
  line-heigt: .6rem;

  color: white;
  margin-right: .2rem;
  background: #ED81B7;
  border-radius: 4px;
  display: inline-block;

  &:active{
    transform: scale(0.9);
  }
`;
