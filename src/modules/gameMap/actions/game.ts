import GameMap from "..";
import FileSaver from 'file-saver';
import { IconItem } from "../objects/Icon";

export default (game: GameMap) => {

    let _canvas: HTMLCanvasElement;
    const _icons: IconItem[] = [];
    let _ctx2d: CanvasRenderingContext2D;


    return {
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