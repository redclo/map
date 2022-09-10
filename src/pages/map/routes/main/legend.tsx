import { css } from "@linaria/core";
import { defineComponent } from "vue";
import Dialog from "./components/dialog";

export default defineComponent({
    emits: ["close"],
    setup(props, { emit }) {
        const names = [
            "Promise Bank", "'He is the One' Casino", "Hospital of Insecurity", "Crush Highway ", "University of Radical Generosity"
            , "Deep Feeling Test Center ", "Prison of Silence", "Confession Stage", "Uncertainty Playground ", "Pillow Talk Radio Station ",
            "Eloping Canyon", "Marriage Monument", "Kissing Stage ", "'Loves Me Loves Me Not' Garden", "Untitled Relationship Hotel ",
            "Reunion Notary Office", "First-Love Kindergarten", "Ex Cemetery", "Lost Souls Transport Station", "Academy of Loyal Relationships",
            "Dokidoki Lane ", "Museum of Jealousy", "‘We Will’ Sea", "'Don\'t text him' Rehab", "Unrequited Love Intelligence Agency ",
            "Passing Fancy Square"
        ]

        return () => (
            <div class={legendStyle}>
                <div class={rootStyle}>
                    <div class={"stick-close"}>
                        <img onClick={()=>{
                            emit("close")
                        }} src={require("@/assets/close.png")} alt="close"  class={"close"}/>
                    </div>

                    <div class="legends">
                        <div class="title">
                            LEGEND
                        </div>
                        {
                            names.map((name,index) => <div class="legend-row" key={name}>
                                <img src={`svgscolor/${index + 1}.svg`} />
                                <span >{name}</span>
                            </div>)
                        }
                    </div>
                </div>
            </div>
        );
    },
});
const legendStyle = css`
    position: absolute;
    left:0;
    width: 100vw;
    height: 100vh;
    top: 0;
    display:flex;
    flex-direction: column;
    align-items: center;
    color: #FFFFFF;
    overflow-x:hidden;
    overflow-y: auto;
`

const rootStyle = css`
    background: #ED81B7;
    width: 10rem;
    border-radius: 6px;
    margin-top: 2rem;
    padding-top: .27rem;

    .stick-close {
        position: sticky;
        text-align: right;
        top: 24px;

        .close {
            position: relative;
            right: 24px;
            cursor: pointer;
            width: .6rem;
            
        }
    }

    .legends {
        padding: 0 2.15rem;
        display:flex;
        flex-direction: column;
        position: relative;
        top: -0.3rem;
        pointer-events: none;
    }

    .title {
        font-size:.64rem;
        border-bottom: .01rem solid #FFD4EB;
        padding-bottom: .26rem;
        text-align: center;
        margin-bottom: .89rem;
    }

    .legend-row {
        width: 100%;
        display:flex;
        align-items: center;
        margin-bottom: .4rem;

        img {
            width: 1rem;
        }
        span{
            margin-left: 1.2rem;
            font-size: .29rem;
        }
    }
    
`;
