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
                        Instead of leaving a readable message, you and your partner(s) will mint a location on the map and register a specific time at which you believe love exists between yourselves; this timestamp will be your permanent proof of love.
                    </p>
                    <p class="row3">
                        Free to mint, create your own memories.
                    </p>
                    <div class="loveroot" onClick={()=>{
                        window.open("http://www.lovecounter.help")
                    }}>
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
    padding-top: 0.6rem;

    @media screen and (max-width: 756px) {
        padding-top: 0.3rem;
        font-size: 0.24rem;
        line-height: 150%;
    }

    .row2 {
        margin-top: 2em;
    }
    .row2 {
        margin-top: 2em;
    }
    
    .loveroot {
        display:flex;
        flex-direction:column;
        align-items: center;
        margin-top: 0.45rem;
    }

    .loverinfo {
        width: 1.38rem;
    }
    
`;
