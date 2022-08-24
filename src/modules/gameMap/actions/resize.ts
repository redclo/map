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
            game.state.ContainerHeight = window.innerHeight;
            game.state.ContainerWidth = window.innerWidth;

            const canvas = game.actions.getCanvas();
            canvas.width = game.state.ContainerWidth;
            canvas.height = game.state.ContainerHeight;

            game.actions.redraw();
        }
    }
}