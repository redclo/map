import GameMap from "..";


export default (game: GameMap) => {

    let _startPosX = -1;
    let _startPosY = -1;

    let _speedX = 10;
    let _speedY = 10;

    let _totalW = 0;
    let _totalH = 0;

    return {
        startFloat() {
            if (_startPosX == -1) {
                _startPosX = Math.floor( window.innerWidth * Math.random() );
                _startPosY = Math.floor( window.innerHeight * Math.random() );
            }

            _totalW = window.innerWidth - 130;
            _totalH = window.innerHeight - 135;

            function loop() {
                _startPosX += _speedX;
                _startPosY += _speedY;

                if (_startPosX < 0 ) {//到左边了
                    _speedX = 0.5 + 1* Math.random();
                    _startPosX = 0;
                }

                if (_startPosX > _totalW ) {//右边
                    _speedX = -1 * (0.5 + 1*Math.random());
                    _startPosX = _totalW
                }
                
                if (_startPosY < 0 ) {
                    _speedY = 0.5 + 1.0 * Math.random();
                    _startPosY = 0;
                }
                if (_startPosY > _totalH ) {
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