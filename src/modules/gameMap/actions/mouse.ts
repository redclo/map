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
            _downX = e.clientX * game.state.pxScale;
            _downY = e.clientY * game.state.pxScale;

            game.actions.downEvent(_downX, _downY);
        },
        onMouseUp(e: MouseEvent) {
            _isDown = false;
            const offset = Date.now() - _downTamp;
            const currX = e.clientX * game.state.pxScale
            const currY = e.clientY * game.state.pxScale

            const x = currX - _downX;
            const y = currY - _downY;
            const isClick = Math.abs(x) < 4 && Math.abs(y) < 4 && offset < 200;
            if (isClick) {
                game.actions.clickEvent(currX, currY);
            }

            game.actions.upEvent(currX, currY);
        },

        onMouseMove(e: MouseEvent) {
            if (!_isDown) return;
            game.actions.moveEvent(e.clientX * game.state.pxScale, e.clientY * game.state.pxScale, e.buttons);
        }
    }
}