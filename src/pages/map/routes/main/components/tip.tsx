import { css } from "@linaria/core";
import { defineComponent, ref, onMounted, reactive, nextTick } from "vue";
import { useCtx } from "../../../context";

export default defineComponent({

    emits: ["close"],
    setup(props, { slots, emit }) {
        const { gameMap } = useCtx();
        const state = reactive({
            showDialog: false,
        })
        onMounted(() => {
            setTimeout(() => {
                state.showDialog = true;
            }, 0)
        })
        function close(e?:any) {
            if ( (e && e.target == rootRef.value) || !e ) {
                state.showDialog = false;
                setTimeout(() => {
                    gameMap.state.showTip= false;
                }, 200);
            }
        }
        const rootRef = ref();
        return () => (
            <div ref={rootRef} class={dialogStyle + (state.showDialog ? " active" : "")} onClick={(e) => {
                close(e)
            }}>
                <div class={rootStyle + (state.showDialog ? " show" : " hide")}>
                    <img src={require("@/assets/tip.png")} class="tip-image" />
                    <img src={require("@/assets/tip2.png")} class="tip2-image" />
                    <div class="btn-mask" onClick={()=>{
                        close();
                    }}></div>
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
    align-items: center;
    color: #FFFFFF;
    overflow:hidden;
    justify-content: center;
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
    width: 569px;
    position relative;
    transition: all .2s;
    display: flex;
    align-items: center;
    flex-direction: column;
    .tip-image, .tip2-image {
        width: 100%;
    }
    .tip2-image{
        display:none;
    }
    .btn-mask{
        position: absolute;
        bottom: 6%;
        height: 7%;
        width: 65%;
        cursor: pointer;
    }

    @media screen and (max-width: 640px) {
        width: 5.8rem;
        .tip2-image {
            display:block;
        }
        .tip-image {
            display:none;
        }
        .btn-mask {
            bottom: 14%;
            height: 10%;
            width: 65%;
        }
    }
`;
