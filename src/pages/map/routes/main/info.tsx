import { css } from "@linaria/core";
import { defineComponent, ref, onMounted, reactive, nextTick } from "vue";
import { Button, Slider } from "ant-design-vue";
import Dialog from "./components/dialog";

export default defineComponent({
    setup() {
        return () => (
            <Dialog>
                <div class={rootStyle}>
                    <p>
                        The Emotional Autonomous Region is a community-generated mapping platform for digitally archiving private relationship experiences on the blockchain.
                    </p>
                    <p>
                        Instead of leaving a readable message, you and your partner will mint a location on the map and register a specific time at which you believe love exists between yourselves; this timestamp will be your permanent evidence of love.
                    </p>
                    <p>
                        Free to mint, create your own memories.
                    </p>
                </div>
            </Dialog>
        );
    },
});

const rootStyle = css`

`;
