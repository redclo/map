import { css } from "@linaria/core";
import { defineComponent, ref, onMounted, reactive, nextTick } from "vue";
import { Button, Slider } from "ant-design-vue";
import Dialog from "./components/dialog";

export default defineComponent({

    emits: ["close"],

    setup(props, { emit }) {

        return () => (
            <Dialog sticker={false} onClose={() => { emit("close") }}>
                <div class={rootStyle}>
                    <div class="wap-title">
                        <div class="title">
                            HOW TO ADD TO THE MAP
                        </div>
                    </div>
                    <div class="texts">
                        <img src={require("@/assets/rtip1.png")} />
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
            </Dialog>
        );
    },
});

const rootStyle = css`
    padding-left: 1.80rem;
    padding-right: 1.80rem;
    position: relative;
    background: #ED81B7;
    border-radius: 6px;
    font-family:'Abel';
    font-size: .23rem;
    padding-bottom: 0.88rem;
    padding-top: 0.6rem;
    top: 0rem;

    @media screen and (max-width: 756px) {
        padding-top: 0.3rem;
        font-size: 0.23rem;
        line-height: 150%;
    }

    .title {
        font-family: 'Abel';
        font-style: normal;
        font-weight: 400;
        font-size:.48rem;
        border-bottom: .01rem solid #FFD4EB;
        padding-bottom: .26rem;
        text-align: center;
        margin-bottom: .73rem;
    }

    .texts{
       font-family: 'Abel';
        font-style: normal;
        font-weight: 400;
        font-size:.23rem;
        p {
          margin-bottom: 0;
          line-height: 150%;
          text-align: center;
        }
        .row1, .row2 , .row3 {
            margin: .3rem 0;
        }
        
        img{
            width: 100%;
        }
    }
    
    @media screen and (max-width: 640px) {
        padding-left: 0.55rem;
        padding-right: 0.55rem;
        top: 20px;
        .wap-title{
            width: 100%;
        }
        .title {
            text-align: left;
            line-height: 150%;
            padding-bottom: 0;
            margin-bottom: .74rem;
            display: inline-block;
        }
        padding-bottom: 0.5rem;
    }
`;
