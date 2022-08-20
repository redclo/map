/**
 * 公共hook代码
 */
import { WebglModule } from "../";


export default function (webgl: WebglModule) {

    const ctx = webgl.ctx;

    return {
        useWebglCanvas(canvas: HTMLCanvasElement, options: { bgAlpha?: boolean }) {

           
            let gl = canvas.getContext("webgl", { alpha: false, antialias: true });
            if (gl) {
                webgl._gl = gl;
            }
        }
    }
}