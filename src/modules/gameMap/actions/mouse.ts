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
            canvas.addEventListener("touchstart", game.actions.onTouchDown);

            if (game.state.isEditor) {
                canvas.addEventListener("mousemove", game.actions.onMouseMove);
            } else {
                canvas.addEventListener("mousemove", game.actions.onMouseMoveDrag);
                canvas.addEventListener("touchmove", game.actions.onTouchMoveDrag);
            }
            canvas.addEventListener("mouseup", game.actions.onMouseUp);
            canvas.addEventListener("touchend", game.actions.onTouchUp);
        },
        onTouchDown(e: TouchEvent) {
            _isDown = true;
            _downTamp = Date.now();
            _downX = e.touches[0].clientX * game.state.pxScale;
            _downY = e.touches[0].clientY * game.state.pxScale;
            game.actions.downEvent(_downX, _downY);
        },

        onMouseDown(e: MouseEvent) {
            _isDown = true;
            _downTamp = Date.now();
            _downX = e.clientX * game.state.pxScale;
            _downY = e.clientY * game.state.pxScale;

            game.actions.downEvent(_downX, _downY);
        },
        onTouchUp(e: TouchEvent) {
            _isDown = false;
            const offset = Date.now() - _downTamp;
            const currX = e.touches[0].clientX * game.state.pxScale
            const currY = e.touches[0].clientY * game.state.pxScale

            const x = currX - _downX;
            const y = currY - _downY;
            const isClick = Math.abs(x) < 4 && Math.abs(y) < 4 && offset < 200;
            if (isClick) {
                game.actions.clickEvent(currX, currY);
            }
            game.actions.upEvent(currX, currY);
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
        },
        onTouchMoveDrag(e: TouchEvent) {
            if (!_isDown) return;
            game.actions.moveDragEvent(e.touches[0].clientX * game.state.pxScale,
                e.touches[0].clientY * game.state.pxScale);
        },
        onMouseMoveDrag(e: MouseEvent) { 
            if (!_isDown) {
                console.log("moving");
                game.actions.drawHoverGrid(e.clientX * game.state.pxScale, e.clientY * game.state.pxScale)
                return;
            }
            game.actions.clearDrawHoverGrid()
            game.actions.moveDragEvent(e.clientX * game.state.pxScale, e.clientY * game.state.pxScale);
        }
    }
}