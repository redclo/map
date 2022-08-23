import GameMap from "..";
import FileSaver from 'file-saver';
import { IconItem } from "../objects/Icon";

export default (game: GameMap) => {

    let _canvas: HTMLCanvasElement;
    const _icons: IconItem[] = [];
    let _ctx2d: CanvasRenderingContext2D;
    const RowGridCount = 40;
    const ColGridCount = 70;

    return {
        initWidthCanvas(canvas: HTMLCanvasElement) {
            _canvas = canvas;
            _ctx2d = canvas.getContext("2d") as CanvasRenderingContext2D;
            game.state.ContainerHeight = window.innerHeight;
            game.state.ContainerWidth = window.innerWidth;
            canvas.width = game.state.ContainerWidth;
            canvas.height = game.state.ContainerHeight;

            game.actions.drawGrid();
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
            _ctx2d.clearRect(0, 0, _canvas.width, _canvas.height);
            game.actions.drawGrid();
        },

        drawGrid() {
            const offsetY = game.state.offsetY;
            const offsetX = game.state.offsetX;

            const size = game.state.IconSize;
            const scale = game.state.scale;
            const itemSize = size * scale;
            const x = offsetX;
            const TotalWidth = ColGridCount * itemSize;
            const TotalHeight = RowGridCount * itemSize;

            _ctx2d.strokeStyle = "gray";

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

            //绘制序号
            _ctx2d.font = "12px sans-serif";
            _ctx2d.fillStyle = "gray";

            for (let r = 0; r < RowGridCount; r++) {
                const y = offsetY + r * itemSize;
                for (let c = 0; c < ColGridCount; c++) {
                    const x = offsetX + c * itemSize;
                    const index = r * RowGridCount + c + 1;
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