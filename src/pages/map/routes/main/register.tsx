import { css } from "@linaria/core";
import { defineComponent } from "vue";
import Dialog from "./components/dialog";

export default defineComponent({
    emits: ["close"],
    setup(props, { emit }) {
        return () => (
            <Dialog showClose={true} onClose={() => { emit("close") }} centered={true}>
                <div class={rootStyle}>
                    <div class="wap-title">
                        <div class="title">
                            HOW TO ADD TO THE MAP
                        </div>
                    </div>
                    <div class="texts">
                        <p class="row1">
                            1. Choose a preferred location you want to mint with partner(s)
                        </p>
                        <p class="row2">
                            2. Connect to your Metamask and confirm the transcation.
                        </p>
                        <p class="row3">
                            3. Minted success! The proof of your love will be recorded permenently.
                        </p>
                    </div>
                </div>
            </Dialog>
        );
    },
});

const rootStyle = css`
    padding: 0.09rem 0rem;
    position: relative;
    background: #ED81B7;
    border-radius: 6px;
    padding-bottom: 1.14rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .title {
        font-family: 'Abel';
        font-style: normal;
        font-weight: 400;
        font-size:.48rem;
        border-bottom: .01rem solid #FFD4EB;
        padding-bottom: .26rem;
        text-align: center;
        margin-bottom: .89rem;
    }

    .texts{
       font-family: 'Abel';
        font-style: normal;
        font-weight: 400;
        font-size:.24rem;
        p {
          margin-bottom: 0;
          line-height: 150%;
        }
        .row2, .row3{
            margin-top: 2em;
        }
    }
    
    @media screen and (max-width: 640px) {
        padding-left: 0.5rem;
        .wap-title{
            width: 100%;
        }
        .title {
            font-size:.4rem;
            text-align: left;
            line-height: 150%;
            padding-bottom: 0;
            margin-bottom: .74rem;
            display: inline-block;
        }
        padding-bottom: 3rem;
        .texts{
            padding-right: 0.5rem;
        }
    }
`;
