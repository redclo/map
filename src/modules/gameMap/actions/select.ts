import GameMap from "..";

export default (game: GameMap) => {

    let _selected: number[] = [];//选中的序号

    return {
        downEvent(x: number, y: number) {
            console.log("down Event", x, y);
        },

        clickEvent(x: number, y: number) {
            console.log("click Event", x, y);

            //点选
            const xOff = x - game.state.offsetX;
            const yOff = y - game.state.offsetY;
            if (xOff < 0 || yOff < 0 || xOff > game.state.TotalWidth || yOff > game.state.TotalHeight) {
                _selected = [];
                return;
            }

            const xindex = Math.floor(xOff / game.state.itemSize);
            const yindex = Math.floor(yOff / game.state.itemSize);
            console.log(xindex + yindex * game.state.RowGridCount);

            const currIndex = xindex + yindex * game.state.RowGridCount;
            const i = _selected.indexOf(currIndex)
            if (i > -1) {
                _selected.splice(i, 1);
            } else {
                _selected.push(currIndex);
            }
            game.actions.redraw();
        },

        moveEvent(x: number, y: number) {
            console.log("move Event", x, y);
        },

        upEvent(x: number, y: number) {
            console.log("up Event", x, y);
        },

        drawSelectedGrid(ctx: CanvasRenderingContext2D) {
            let n = _selected.length;
            let index = -1;
            let r = -1;
            let c = -1;
            let x1 = 0, x2 = 0, y1 = 0, y2 = 0;

            const state = game.state;

            ctx.strokeStyle = '#ED81B7';
            while (n--) {
                index = _selected[n];
                r = Math.floor(index / state.RowGridCount);
                c = index % state.RowGridCount;

                y1 = state.offsetY + r * state.itemSize;
                y2 = y1 + state.itemSize;
                x1 = state.offsetX + c * state.itemSize;
                x2 = x1 + state.itemSize;

                ctx.beginPath();
                ctx.moveTo(x1, y1);
                ctx.lineTo(x2, y1);
                ctx.lineTo(x2, y2);
                ctx.lineTo(x1, y2);
                ctx.lineTo(x1, y1);
                ctx.closePath();
                ctx.stroke();
            }
        }
    }
}