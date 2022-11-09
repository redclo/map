import GameMap from "..";


export default (game: GameMap) => {

    let _startPosX = -1;
    let _startPosY = -1;

    let _speedX = 10;
    let _speedY = 10;
    
    return {
        startFloat() {
            if (_startPosX == -1) {
                _startPosX = Math.floor( window.innerWidth * Math.random() );
                _startPosY = Math.floor( window.innerHeight * Math.random() );
            }

            function loop() {
                _startPosX += _speed;
                _startPosX += _speed;

                requestAnimationFrame(loop);
            }
            requestAnimationFrame(loop)
        }
    }
}