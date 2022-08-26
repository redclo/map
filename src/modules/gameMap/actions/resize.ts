import GameMap from "..";

export default (game: GameMap) => {

    return {
        initResizeEvents() {
            window.addEventListener("resize", () => {
                console.log("resize");
                game.actions.resizeGame();
            })
        },
        resizeGame() {
            game.state.ContainerHeight = window.innerHeight * game.state.pxScale;
            game.state.ContainerWidth = window.innerWidth * game.state.pxScale;

            const canvas = game.actions.getCanvas();
            canvas.width = game.state.ContainerWidth;
            canvas.height = game.state.ContainerHeight;

            game.actions.redraw();
        },
        updateScale(s: number) {
            game.state.scale = s;
            game.actions.redraw();
        }
    }
}