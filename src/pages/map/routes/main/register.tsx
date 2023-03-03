import { css } from "@linaria/core";
import { defineComponent, ref } from "vue";
import Dialog from "./components/dialog";
import { useCtx } from "../../context"
export default defineComponent({
    emits: ["close"],
    setup(props, { emit }) {
        const { gameMap } = useCtx();
        const rootRef = ref();

        const indexed = gameMap.actions.getLegendIndexed();

        return () => (
            <div class={legendStyle} ref={rootRef} onClick={(e) => {
                if (e.target == rootRef.value) {
                    emit("close")
                }
            }}>
                <div class={rootStyle}>
                    <div class={"stick-close"}>
                        <img onClick={() => {
                            emit("close")
                        }} src={require("@/assets/close.png")} alt="close" class={"close"} />
                    </div>

                    <div class="legends">
                        <div class="title">
                            HOW TO ADD TO THE MAP
                        </div>
                        <div class="scroll icons-root">
                            <img class="firt-tip" src={require("@/assets/rtip1.png")} />
                            <p class="row1">
                                Choose a preferred location you want to mint with or without partner(s)
                            </p>
                            <img src={require("@/assets/rtip2.png")} />
                            <p class="row2">
                                Connect to your Metamask and confirm the transaction.
                            </p>
                            <img src={require("@/assets/rtip3.png")} />
                            <p class="row3">
                                Minted success! The proof of your love will be recorded permanently.
                            </p>
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
    width: 10rem;
    border-radius: 6px;
    padding-top: .3rem;
    height: calc(100vh - 2.45rem);

    @media screen and (max-width: 720px) {
        height: calc(100vh - 5.35rem);
    }
    @media screen and (max-width: 640px) {
        width:  5.8rem;
        height: calc(100vh - 5.35rem);
    }

    .stick-close {
        position: sticky;
        text-align: right;
        top: 24px;
        .close {
            position: relative;
            right: .3rem;
            cursor: pointer;
            width: .5rem;
            
        }
    }

    .legends {
        display:flex;
        flex-direction: column;
        position: relative;
        height: 100%;

        @media screen and (max-width: 640px) {
            top: 0;
        }
    }

    .title {
        margin: 0 0.8rem;
        font-size:.51rem;
        border-bottom: 1px solid #FFD4EB;
        padding-bottom: .26rem;
        text-align: center;
        height: .89rem;
        
        @media screen and (max-width: 640px) {
            margin: 0 0.5rem;
            font-size: .4rem;
            text-align: left;
            margin-right: 1.41rem;
            line-height: 150%;
            padding-bottom: 0;
            height: unset;
            margin-bottom: 0.1rem;
        }
    }

    .icons-root {
        height: calc(100% - 1.41rem);
        padding: 0 0.8rem;
        .firt-tip {
            margin-top: 0.73rem;
        }
        img {
            width: 100%;
        }

        .row1, .row2 , .row3 {
            margin: .3rem 0;
            text-align: center;
        }

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
        @media screen and (max-width: 640px) {
            padding: 0 0.5rem;
            height: calc(100% - 1.31rem);
        }
    }

    .legend-row {
        width: 100%;
        display:flex;
        align-items: center;
        margin-bottom: 0.3rem;

        &.first {
            margin-top: 0.28rem;
        }
        img {
            width: 0.8rem;
            @media screen and (max-width: 640px) {
                width: 0.9rem;
            }
        }
        span{
            margin-left: .82rem;
            font-size: .24rem;
            @media screen and (max-width: 640px) {
                margin-left: .5rem;
            }
        }
    }
    
`;
