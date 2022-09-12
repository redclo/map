import { css } from "@linaria/core";
import { defineComponent } from "vue";
import Dialog from "./components/dialog";

export default defineComponent({
    emits:["close"],
    setup(props, {emit}) {
        return () => (
            <Dialog onClose={()=>{emit("close")}}>
                <div class={rootStyle}>
                    <div class="title">
                        HOW TO ADD TO THE MAP
                    </div>
                    <div class="texts">
                        <p class="row1">
                            1. Choose the location of your love
                        </p>
                        <p class="row2">
                            2. Connect to your crypto wallet
                        </p>
                        <p class="row3">
                            3. Mint your new relationship record
                        </p>
                        <p class="row4">
                            4. Time of registration will be tied to the location
                        </p>
                    </div>
                </div>
            </Dialog>
        );
    },
});

const rootStyle = css`
    padding: 0.09rem 1.81rem;
    position: relative;
    background: #ED81B7;
    border-radius: 6px;
    padding-bottom: 1.14rem;

    .title {
        font-size:.48rem;
        border-bottom: .01rem solid #FFD4EB;
        padding-bottom: .26rem;
        text-align: center;
        margin-bottom: .89rem;
    }

    .texts{
        p {
          margin-bottom: 0;
          line-height: 200%;
        }
    }
    @media screen and (max-width: 756px) {
        font-size: 14px;
    }
    @media screen and (max-width: 360px) {
        font-size: 12px;
    }
`;
