import { css } from "@linaria/core";
import { defineComponent, ref, onMounted, reactive, nextTick } from "vue";
import { Button, Slider } from "ant-design-vue";
import Dialog from "./components/dialog";

export default defineComponent({

    emits:["close"],

    setup(props, {emit}) {

        return () => (
            <Dialog onClose={()=>{emit("close")}}>
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
    padding: 11rem 3.2rem;
    position: relative;
    .row2 {
        margin-top: 2em;
    }
    .row2 {
        margin-top: 2em;
    }
    
    .loverinfo {
        position: absolute;
        left: 50%;
        bottom: 6rem;
        width: 138px;
        transform: translate(-50%, 0px);

        @media screen and (max-width: 756px) {
            display:none;
        }
    }
`;
