import { css } from "@linaria/core";
import { defineComponent, ref, onMounted, reactive, nextTick } from "vue";


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
                    <p class="title">Lost Souls Transport Station</p>

                    <img src={`svgscolor/1.svg`} class="item-image"/>
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
    width: 388px;
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
    padding-top: 39px;
    display: flex;
    align-items: center;
    flex-direction: column;

    .item-image{
        width: 100px;
        height: 100px;
    }

    .title{
        font-size: 25px;
        margin: 0;
    }
`;
