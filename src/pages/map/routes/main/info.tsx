import { css } from "@linaria/core";
import { defineComponent, ref, onMounted, reactive, nextTick } from "vue";
import { Button, Slider } from "ant-design-vue";
import Dialog from "./components/dialog";

export default defineComponent({

    emits: ["close"],

    setup(props, { emit }) {

        return () => (
            <Dialog centered={true} onClose={() => { emit("close") }}>
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
                    <div class="loveroot">
                        <img src={require("@/assets/love.png")} alt="love" class={"loverinfo"} />
                        <img src={require("@/assets/lovecounter.png")} alt="lovecounter" class={"loverinfo"} />
                    </div>
                </div>
            </Dialog>
        );
    },
});

const rootStyle = css`
    padding-left: .57rem;
    padding-right: .61rem;
    position: relative;
    background: #ED81B7;
    border-radius: 6px;
    font-family:'Abel';
    font-size: .23rem;
    padding-bottom: 0.88rem;
    padding-top: 1.42rem;

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
    .loveroot {
        @media screen and (max-width: 756px) {
            display:none;
        }
        display:flex;
        flex-direction:column;
        align-items: center;
    }
    
    .loverinfo {
        width: 1.38rem;
    }
    .lovecounter {

    }
`;
