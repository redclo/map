import { css } from "@linaria/core";
import { defineComponent } from "vue";
import Dialog from "./components/dialog";

export default defineComponent({
    emits: ["close"],
    setup(props, { emit }) {
        const names = [
            "Promise Bank", "‘He is the One’ Casino", "Hospital of Insecurity", "Crush Highway ", "University of Radical Generosity"
            , "Deep Feeling Test Center ", "Prison of Silence", "Confession Stage", "Uncertainty Playground ", "Pillow Talk Radio Station ",
            "Eloping Canyon", "Marriage Monument", "Kissing Stage ", "‘Loves Me Loves Me Not’ Garden", "Untitled Relationship Hotel ",
            "Reunion Notary Office", "First-Love Kindergarten", "Ex Cemetery", "Lost Souls Transport Station", "Academy of Loyal Relationships",
            "Dokidoki Lane ", "Museum of Jealousy", "‘We Will’ Sea", "‘Don’t text him’ Rehab", "Unrequited Love Intelligence Agency ",
            "Passing Fancy Square"
        ]

        return () => (
            <Dialog onClose={() => { emit("close") }}>
                <div class={rootStyle}>
                    {
                        new Array(26).map(item => <div class="legend-row" key={item}>
                            <img src={`svgscolor/${item + 1}.svg`} />
                            <span >{names[item]}</span>
                        </div>)
                    }
                </div>
            </Dialog>
        );
    },
});

const rootStyle = css`
    padding: 11rem 3.2rem;
    position: relative;
    .legend-row {
        img {
            width: 100px;
        }
        span{
            margin-right: 120px;
        }
    }
`;
