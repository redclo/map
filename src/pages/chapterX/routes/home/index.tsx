import { css } from "@linaria/core";
import { defineComponent, ref, onMounted } from "vue";
import { useCtx } from "../../context";
import { Button } from "ant-design-vue";
export default defineComponent({
    setup() {
        const { anim } = useCtx();
        onMounted(() => {
           
        })

        return () => (
            <div class={rootStyle}>
               chpterx
            </div>
        );
    },
});

const rootStyle = css`
  background-color: black;
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
`;
