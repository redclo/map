import { css } from "@linaria/core";
import { defineComponent, ref, onMounted, reactive, nextTick } from "vue";
import { useCtx } from "../../../context";

export default defineComponent({

    emits: ["close"],
    setup(props, { slots, emit }) {

        const { gameMap, ethers } = useCtx();

        const state = reactive({
            showDialog: false,
        })
        onMounted(() => {
            setTimeout(() => {
                state.showDialog = true;
            }, 0)

            ethers.actions.getMessage()
        })
        const rootRef = ref();
        return () => (
            <div ref={rootRef} class={dialogStyle + (state.showDialog ? " active" : "")} onClick={(e) => {
                if (e.target == rootRef.value) {
                    state.showDialog = false;
                    setTimeout(() => {
                        gameMap.state.showItem = false;
                    }, 200);
                }
            }}>
                <div class={rootStyle + (state.showDialog ? " show" : " hide")}>
                    <p class="title">{gameMap.actions.getCurSelTileName()}</p>

                    <img src={gameMap.actions.getCurSelTileImageUrl()} class="item-image" />

                    <div class="location">
                        <img src="icons/svg/location.svg" class="loc-icon" />
                        <span>({gameMap.state.selItemY + 1}, {gameMap.state.selItemX + 1})</span>
                    </div>

                    {!gameMap.state.isCurSelOwned ? <div class="btn-conn" onClick={(e: MouseEvent) => {
                        e.stopPropagation && e.stopPropagation();
                        gameMap.actions.connWallet();
                    }}>
                        Connect Wallet
                    </div> :

                        <div class="registed">
                            <span>Registered on {ethers.state.currMomentDay ? ethers.state.currMomentDay : "..."}</span>
                            <span>{ethers.state.currMomentHour}</span>
                        </div>
                    }
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
    font-style: normal;
    font-weight: 400;
    font-size: 23px;
    line-height: 40px;
    color: #FFFFFF;
    padding-top: 39px;
    display: flex;
    align-items: center;
    flex-direction: column;
    font-family: 'Abel';

    .item-image{
        width: 100px;
        height: 100px;
    }

    .title{
        font-size: 25px;
        margin: 0;
    }

    .location{
        font-size: 16px;
        font-family: monospace;
        width: 130px;
        justify-content: center;
        display: flex;
        align-items: center;
        border-bottom: 1px solid #FFD4EB;
        line-height: 0;
        padding-bottom: 6px;
        margin-top:12px;

        .loc-icon {
            width: 16px;
            height: 16px;
        }
        font-size: 16px;
    }
    .btn-conn {
        width: 257px;
        height: 40px;
        background: #F453AB;
        border-radius: 8px;
        text-align: center;
        margin-top: 21px;
        margin-bottom: 43px;
        font-size: 16px;
        cursor: pointer;

        &:active{
            background: #FFF6FB;
            color: #F453AB;
        }
    }

    .registed {
        margin-top: 18px;
        font-size: 16px;
        text-align: center;
        line-height: 20px;
        display:flex;
        flex-direction: column;
        margin-bottom: 46px;
    }

    @media screen and (max-width: 390px) {
        width: 320px;
        padding-top: 20px;
        .title {
            font-size: 18px;
        }
    }
`;
