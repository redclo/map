import GameMap from "..";

export default (game: GameMap) => {

    let _selected: number[] = [];//选中的序号
    let _rectSelecting = false;
    let _rectStartX = 0, _rectStartY = 0;
    let _rectCurrX = 0, _rectCurrY = 0;
    let _initMoveX = 0, _initMoveY = 0;

    return {
        downEvent(x: number, y: number) {
            console.log("down Event", x, y);
            _rectStartX = x;
            _rectStartY = y;

            _initMoveX = game.state.offsetX;
            _initMoveY = game.state.offsetY;

        },
        cleanSelect() {
            _selected = [];
            game.actions.redraw();
        },

        getSelected() {
            return _selected;
        },

        clickEvent(x: number, y: number) {
            console.log("click Event", x, y);

            //点选
            const xOff = x - game.state.offsetX;
            const yOff = y - game.state.offsetY;
            if (xOff < 0 || yOff < 0 || xOff > game.state.TotalWidth || yOff > game.state.TotalHeight) {
                // _selected = [];
                return;
            }

            const xindex = Math.floor(xOff / game.state.itemSize);
            const yindex = Math.floor(yOff / game.state.itemSize);
            console.log(xindex + yindex * game.state.ColGridCount);

            const currIndex = xindex + yindex * game.state.ColGridCount;
            const i = _selected.indexOf(currIndex)
            if (i > -1) {
                _selected.splice(i, 1);
            } else {
                _selected.push(currIndex);
            }
            game.actions.redraw();
        },

        moveEvent(x: number, y: number, buttons: number) {
            console.log("move Event", x, y, buttons);
            const isMoving = buttons == 4;
            if (isMoving) {
                game.state.offsetX = _initMoveX + (x - _rectStartX);
                game.state.offsetY = _initMoveY + (y - _rectStartY);

                game.actions.redraw();
                return;
            }

            const idUnselect = buttons == 2;


            _rectSelecting = true;
            _rectCurrX = x;
            _rectCurrY = y;

            //计算框选区域
            const state = game.state;

            const x1 = _rectStartX - game.state.offsetX;
            const x2 = _rectCurrX - game.state.offsetX;
            const y1 = _rectStartY - game.state.offsetY;
            const y2 = _rectCurrY - game.state.offsetY;

            const rc = game.state.RowGridCount;
            const cc = game.state.ColGridCount;
            let changed = false;
            for (let r = 0; r < rc; r++) {
                const y = (r + 0.5) * state.itemSize;
                if (y < y1 || y > y2) continue;

                console.log("y==>", y, y1, y2, r);

                for (let c = 0; c < cc; c++) {
                    const x = (c + 0.5) * state.itemSize;
                    if (x < x1 || x > x2) continue;

                    const index = r * cc + c;

                    if (idUnselect) {
                        const i = _selected.indexOf(index);
                        if (i > -1) _selected.splice(i, 1);
                    } else {
                        if (_selected.indexOf(index) == -1) _selected.push(index);
                    }

                    changed = true;
                }
            }

            game.actions.redraw();
        },

        upEvent(x: number, y: number) {
            console.log("up Event", x, y);
            _rectSelecting = false;

            game.actions.redraw();
        },

        drawSelectedGrid(ctx: CanvasRenderingContext2D) {
            let n = _selected.length;
            let index = -1;
            let r = -1;
            let c = -1;
            let x1 = 0, x2 = 0, y1 = 0, y2 = 0;

            const state = game.state;

            ctx.strokeStyle = 'orange' //'#ED81B7';
            ctx.lineWidth = 2;

            while (n--) {
                index = _selected[n];
                r = Math.floor(index / state.ColGridCount);
                c = index % state.ColGridCount;

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
            ctx.lineWidth = 1;
        },

        drawRectSelecting(ctx: CanvasRenderingContext2D) {
            if (!_rectSelecting) return;

            ctx.strokeStyle = '#ED81B7';
            const y1 = _rectStartY;
            const y2 = _rectCurrY;
            const x1 = _rectStartX;
            const x2 = _rectCurrX;
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