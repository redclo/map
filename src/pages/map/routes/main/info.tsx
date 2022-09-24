import { css } from "@linaria/core";
import { defineComponent, ref, onMounted, reactive, nextTick } from "vue";
import { Button, Slider } from "ant-design-vue";
import Dialog from "./components/dialog";

export default defineComponent({

    emits: ["close"],

    setup(props, { emit }) {

        return () => (
            <Dialog onClose={() => { emit("close") }}>
                <div class={rootStyle}>
                    <p class="row1">
                        The Emotional Autonomous Region is a community-generated mapping platform for digitally archiving private relationship experiences on the blockchain.
                    </p>
                    <p class="row2">
                        Instead of leaving a readable message, you and your partner will mint a location on the map and register a specific time at which you believe love exists between yourselves; this timestamp will be your permanent evidence of love.
                    </p>
                    <p class="row3">
                        Free to mint, create your own memories.
                    </p>

                    <img src={require("@/assets/love.png")} alt="love" class={"loverinfo"} />
                </div>
            </Dialog>
        );
    },
});

const rootStyle = css`
    padding: 0.58rem .65rem;
    position: relative;
    background: #ED81B7;
    border-radius: 6px;
    font-family:'Inter';
    padding-bottom: 3.07rem;
    font-size: .23rem;
    
    .row2 {
        margin-top: 2em;
    }
    .row2 {
        margin-top: 2em;
    }
    
    @media screen and (max-width: 756px) {
        font-size: 18px;
    }
    @media screen and (max-width: 360px) {
        font-size: 12px;
        
    }

    .loverinfo {
        position: absolute;
        left: 50%;
        bottom: .4rem;
        width: 1.38rem;
        transform: translate(-50%, 0px);

        @media screen and (max-width: 756px) {
            display:none;
        }
    }
`;
