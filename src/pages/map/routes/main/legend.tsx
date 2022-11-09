import { css } from "@linaria/core";
import { defineComponent, ref } from "vue";
import Dialog from "./components/dialog";
import { useCtx } from "../../context"
export default defineComponent({
    emits: ["close"],
    setup(props, { emit }) {
        const { gameMap } = useCtx();
        const rootRef = ref();

        return () => (
            <div class={legendStyle} ref={rootRef} onClick={(e) => {
                if (e.target == rootRef.value) {
                    emit("close")
                }
            }}>
                <div class={rootStyle}>
                    {/* <div class={"stick-close"}>
                        <img onClick={() => {
                            emit("close")
                        }} src={require("@/assets/close.png")} alt="close" class={"close"} />
                    </div> */}

                    <div class="legends">
                        <div class="title">
                            LEGEND
                        </div>
                        <div class="scroll icons-root">
                            {
                                gameMap.actions.getItemNames().map((name, index) => <div class={"legend-row " + (index == 0 ? "first" : "")} key={name}>
                                    <img src={`svgscolor/${index + 1}.svg`} />
                                    <span >{name}</span>
                                </div>)
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    },
});
const legendStyle = css`
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
    font-family:'Abel';
    justify-content: center;
`

const rootStyle = css`
    background: #ED81B7;
    width: 6.38rem;
    border-radius: 6px;
    padding-top: .27rem;
    height: calc(100vh - 2.45rem);
    @media screen and (max-width: 720px) {
        height: calc(100vh - 5.35rem);
    }

    .stick-close {
        position: sticky;
        text-align: right;
        top: 24px;
        .close {
            position: relative;
            right: 24px;
            cursor: pointer;
            width: .6rem;
            
        }
    }

    .legends {
        display:flex;
        flex-direction: column;
        position: relative;
        top: -0.3rem;
        height: 100%;
    }

    .title {
        margin: 0 0.8rem;
        font-size:.51rem;
        border-bottom: .01rem solid #FFD4EB;
        padding-bottom: .26rem;
        text-align: center;
        margin-top: .29rem;
        height: .89rem;
    }

    .icons-root {
        height: calc(100% - 0.51rem);
        padding: 0 0.8rem;

       &::-webkit-scrollbar {
            width: 8px;
            height: 8px;
        }
        &::-webkit-scrollbar-thumb {
            background: rgba(255,255,255, 0.3);
            border-radius: 8px;
        }
        &::-webkit-scrollbar-thumb:hover {
            background: #ed81b74a;
        }
        overflow: auto;
    }

    .legend-row {
        width: 100%;
        display:flex;
        align-items: center;
        margin-bottom: 0.3rem;

        &.first {
            margin-top: 0.69rem;
        }
        img {
            width: 0.8rem;
        }
        span{
            margin-left: .82rem;
            font-size: .24rem;

            @media screen and (max-width: 756px) {
                font-size: 14px;
            }

            @media screen and (max-width: 360px) {
                font-size: 12px;
            }
        }
    }
    
`;
