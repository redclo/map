import GameMap from "..";
import FileSaver from 'file-saver';
import { IconItem } from "../objects/Icon";

export default (game: GameMap) => {

    let _canvas: HTMLCanvasElement;
    const _icons: IconItem[] = [];
    let _ctx2d: CanvasRenderingContext2D;
    let _ctx2dHover: CanvasRenderingContext2D;

    return {
        initHoverCanvas(canvas: HTMLCanvasElement) {
            canvas.width = game.state.ContainerWidth;
            canvas.height = game.state.ContainerHeight;

            _ctx2dHover = canvas.getContext("2d") as CanvasRenderingContext2D;
        },
        
        initWidthCanvas(canvas: HTMLCanvasElement) {
            _canvas = canvas;
            _ctx2d = canvas.getContext("2d") as CanvasRenderingContext2D;
            game.state.ContainerHeight = window.innerHeight * game.state.pxScale;
            game.state.ContainerWidth = window.innerWidth * game.state.pxScale;

            // game.state.ContainerWidth = 10000 * game.state.pxScale;
            // game.state.ContainerHeight = 7200 * game.state.pxScale;

            canvas.width = game.state.ContainerWidth;
            canvas.height = game.state.ContainerHeight;
           
            if (window.innerWidth < 640) {
                game.state.scale = 1.4;
            }

            game.actions.initMouseEvent(canvas);
            game.actions.initResizeEvents();

            const box = game.actions.getContentBox();
            if (box.w < game.state.ContainerWidth) {
                console.log("box==>", box);
                const scale = game.state.ContainerWidth / box.w;
                game.state.scale = game.state.scale * scale;
                // alert(2)
            } else if (box.h < game.state.ContainerHeight) {
                console.log("box==>scale-y=>", box);
                const scale = (game.state.ContainerHeight + game.state.IconSize) / box.h;
                game.state.scale = game.state.scale * scale;
                console.log(game.state.scale);
            }

            game.actions.computeContentBox();
            game.actions.redraw();

            // setTimeout(() => {
            //     const baseUrl = canvas.toDataURL("image/png")
            //     FileSaver.saveAs(baseUrl, "a.png");
            // }, 3000);
        },
        getCanvas() {
            return _canvas;
        },

        moveX(offsetX: number) {
            game.state.offsetX += offsetX;
            game.actions.redraw();
        },

        moveY(offsetY: number) {
            game.state.offsetY += offsetY;
            game.actions.redraw();
        },
        clearDrawHoverGrid(){
            _ctx2dHover.clearRect(0, 0, _canvas.width, _canvas.height);
        },

        drawHoverGrid(x:number, y:number) {

            const state = game.state;
            const xOff = x - state.offsetX;
            const yOff = y - state.offsetY;
            if (xOff < 0 || yOff < 0 || xOff > game.state.TotalWidth || yOff > game.state.TotalHeight) {
                return;
            }
            const c = Math.floor(xOff / state.itemSize);
            const r = Math.floor(yOff / state.itemSize);
         
            _ctx2dHover.clearRect(0, 0, _canvas.width, _canvas.height);
            _ctx2dHover.strokeStyle = '#DC7BAB' //'#ED81B7';
            _ctx2dHover.lineWidth = 3 * state.pxScale;
            const padding = 1.5 * state.pxScale;

                let y1 = state.offsetY + r * state.itemSize
                let y2 = y1 + state.itemSize;
                let x1 = state.offsetX + c * state.itemSize
                let x2 = x1 + state.itemSize;

                x1 += padding;
                y1 += padding;
                x2 -= padding;
                y2 -= padding;

                _ctx2dHover.beginPath();
                _ctx2dHover.moveTo(x1, y1);
                _ctx2dHover.lineTo(x2, y1);
                _ctx2dHover.lineTo(x2, y2);
                _ctx2dHover.lineTo(x1, y2);
                _ctx2dHover.lineTo(x1, y1);
                _ctx2dHover.closePath();
                _ctx2dHover.stroke();
        },

        redraw() {
            if (game.state.loading) return;

            _ctx2d.clearRect(0, 0, _canvas.width, _canvas.height);
            if (game.state.isEditor) {
                game.actions.drawGrid();
            }
            game.actions.drawTiles(_ctx2d);
            game.actions.drawSelectedGrid(_ctx2d);
            if (game.state.isEditor) {
                game.actions.drawRectSelecting(_ctx2d);
            }
        },
        shoeText(show: boolean) {
            game.state.showText = show;
            game.actions.redraw();
        },

        drawGrid() {
            const offsetY = game.state.offsetY;
            const offsetX = game.state.offsetX;

            const itemSize = game.state.itemSize;

            const x = offsetX;

            const TotalWidth = game.state.TotalWidth;
            const TotalHeight = game.state.TotalHeight;

            _ctx2d.strokeStyle = "gray";

            const RowGridCount = game.state.RowGridCount;
            const ColGridCount = game.state.ColGridCount;

            for (let r = 0; r < RowGridCount; r++) {
                const y = offsetY + r * itemSize;
                _ctx2d.beginPath();
                _ctx2d.moveTo(x, y);
                _ctx2d.lineTo(x + TotalWidth, y);
                _ctx2d.closePath();
                _ctx2d.stroke();
            }
            const y = offsetY;
            for (let c = 0; c < ColGridCount; c++) {
                const x = offsetX + c * itemSize;
                _ctx2d.beginPath();
                _ctx2d.moveTo(x, y);
                _ctx2d.lineTo(x, y + TotalHeight);
                _ctx2d.closePath();
                _ctx2d.stroke();
            }

            if (!game.state.showText) return;

            //绘制序号
            _ctx2d.font = "12px sans-serif";
            _ctx2d.fillStyle = "gray";

            for (let r = 0; r < RowGridCount; r++) {
                const y = offsetY + r * itemSize;
                for (let c = 0; c < ColGridCount; c++) {
                    const x = offsetX + c * itemSize;
                    const index = r * ColGridCount + c + 1;
                    const tx = _ctx2d.measureText(index + "");
                    _ctx2d.fillText(index + "",
                        x + (itemSize - tx.width) / 2.0,
                        y + (itemSize) / 2.0
                    );
                }
            }
        }
    }
}