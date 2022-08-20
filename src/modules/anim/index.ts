import { ModuleRoot } from "@/queenjs/framework";

export default class AnimModule extends ModuleRoot {

    initCanvas(canvas: HTMLCanvasElement) {
        const ctx2d: CanvasRenderingContext2D = canvas.getContext("2d") as any;

        const width = window.innerWidth;
        const height = window.innerHeight;

        canvas.width = width;
        canvas.height = height;

        ctx2d.fillStyle = "black";
        ctx2d.clearRect(0, 0, width, height);
        ctx2d.fillRect(0, 0, width, height);

        ctx2d.fillStyle = "white";
        function drawPoint(x: number, y: number) {
            console.log(x, y);
            ctx2d.fillRect(x - 2, y - 2, 4, 4);
        }
        for (let i = 2; i < width; i = i + 8) {
            for (let k = 2; k < height; k = k + 8) {
                drawPoint(i, k);
            }
        }
    }


}
