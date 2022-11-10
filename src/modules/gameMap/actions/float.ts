import GameMap from "..";


export default (game: GameMap) => {

    let _startPosX = -1;
    let _startPosY = -1;

    let _speedX = 0.5;
    let _speedY = 0.5;

    let _totalW = 0;
    let _totalH = 0;

    return {
        startFloat() {

            let boxSize = 210;
            let _minX = -60;
            let _minY = -60;
            if (window.innerWidth <= 475) {
                boxSize = 100;
                _minX = -30;
                _minY = -30;
            }

            _totalW = window.innerWidth - boxSize;
            _totalH = window.innerHeight - boxSize;

            if (_startPosX == -1) {
                _startPosX = Math.floor(_totalW * Math.random());
                _startPosY = Math.floor(_totalH * Math.random());
            }

            function loop() {
                _startPosX += _speedX;
                _startPosY += _speedY;

                if (_startPosX < _minX) {//到左边了
                    _speedX = 0.5 + 1 * Math.random();
                    _startPosX = _minX;
                }

                if (_startPosX > _totalW) {//右边
                    _speedX = -1 * (0.5 + 1 * Math.random());
                    _startPosX = _totalW
                }

                if (_startPosY < _minY) {
                    _speedY = 0.5 + 1.0 * Math.random();
                    _startPosY = _minY;
                }
                if (_startPosY > _totalH) {
                    _speedY = -(0.5 + 1.0 * Math.random());
                    _startPosY = _totalH
                }

                game.state.floatX = _startPosX
                game.state.floatY = _startPosY

                requestAnimationFrame(loop);
            }
            requestAnimationFrame(loop)
        }
    }
}