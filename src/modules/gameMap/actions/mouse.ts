import GameMap from "..";
import FileSaver from 'file-saver';

export default (game: GameMap) => {

    let _isDown = false;
    let _downTamp = 0;
    let _downX = 0;
    let _downY = 0;

    document.addEventListener("mouseup", () => {
        _isDown = false;
    })

    return {

        initMouseEvent(canvas: HTMLCanvasElement) {
            canvas.addEventListener("mousedown", game.actions.onMouseDown);
            canvas.addEventListener("mousemove", game.actions.onMouseMove);
            canvas.addEventListener("mouseup", game.actions.onMouseUp);
        },

        onMouseDown(e: MouseEvent) {
            _isDown = true;
            _downTamp = Date.now();
            _downX = e.clientX;
            _downY = e.clientY;

            game.actions.downEvent(e.clientX, e.clientY);
        },
        onMouseUp(e: MouseEvent) {
            _isDown = false;
            const offset = Date.now() - _downTamp;
            const x = e.clientX - _downX;
            const y = e.clientY - _downY;
            const isClick = Math.abs(x) < 4 && Math.abs(y) < 4 && offset < 200;
            if (isClick) {
                game.actions.clickEvent(e.clientX, e.clientY);
            }

            game.actions.upEvent(e.clientX, e.clientY);
        },

        onMouseMove(e: MouseEvent) {
            if (!_isDown) return;
            game.actions.moveEvent(e.clientX, e.clientY);
        }
    }
}