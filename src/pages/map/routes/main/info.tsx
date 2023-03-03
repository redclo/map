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
                        Emotional Autonomous Region is an online platform where lover(s) can claim land for free to store permanent proof of their love. 
                    </p>
                    <p class="row2">
                        Unlike Web 2.0 social networking services, which rely on centralised platforms that can be shut down, erasing a lover’s digital history, this platform is powered by blockchain technology for the user to create an immutable and traceable timestamp of the moment of love. Users can select a location in the Region that fits their status and register the specific time they believe love exists, creating a concrete love memory that won't disappear with the shutdown of a server.
                    </p>
                    <p class="row3">
                        Free to mint, create your own memories.
                    </p>
                    <div class="loveroot" onClick={() => {
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
    padding-left: .8rem;
    padding-right: .8rem;
    position: relative;
    background: #ED81B7;
    border-radius: 6px;
    font-family:'Abel';
    font-size: .23rem;
    padding-bottom: 0.88rem;
    padding-top: 0.6rem;
    text-align: justify;

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
