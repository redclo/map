import { css } from "@linaria/core";
import { defineComponent } from "vue";
import Dialog from "./components/dialog";

export default defineComponent({
    emits: ["close"],
    setup(props, { emit }) {
        return () => (
            <Dialog showClose={true} onClose={() => { emit("close") }} centered={true}>
                <div class={rootStyle}>
                    <div class="title">
                        HOW TO ADD TO THE MAP
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
        
        p {
          margin-bottom: 0;
          line-height: 200%;
        }
    }
    @media screen and (max-width: 756px) {
        font-size: 14px;
        padding-bottom: 1.14rem;
    }

    @media screen and (max-width: 475px) {
        font-size: 12px;
        padding-bottom: 1.14rem;
    }
`;
