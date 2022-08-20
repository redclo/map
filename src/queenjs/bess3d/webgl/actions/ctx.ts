import { WebglModule } from "../";
import { WebglCtx } from "../objects/webglCtx";

export default function (webgl: WebglModule) {

    const ctx = webgl.ctx;

    return {
        createWebglCtx(canvas: HTMLCanvasElement, options?: any) {
            const gl = canvas.getContext("webgl", { alpha: false, antialias: true });
            if (gl) {
                return new WebglCtx(gl, canvas, options);
            }
        },

        createShader(gl: WebGLRenderingContext, type: number, source: string) {
            const shader = gl.createShader(type);
            if (!shader) return;

            gl.shaderSource(shader, source);
            gl.compileShader(shader);
            const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
            if (success) {
                return shader;
            }
            console.error(gl.getShaderInfoLog(shader));
            gl.deleteShader(shader);
        },

        createProgram(gl: WebGLRenderingContext, vertexShader: string, fragmentShader: string) {
            const program = gl.createProgram();
            if (!program) return;
            const actions = webgl.actions;

            const vertShaderId = actions.createShader(gl, gl.VERTEX_SHADER, vertexShader);
            if (!vertShaderId) return;

            const fragShaderId = actions.createShader(gl, gl.FRAGMENT_SHADER, fragmentShader);
            if (!fragShaderId) {
                gl.deleteShader(vertShaderId);
                return;
            }

            gl.attachShader(program, vertShaderId);
            gl.attachShader(program, fragShaderId);
            gl.linkProgram(program);
            const success = gl.getProgramParameter(program, gl.LINK_STATUS);
            if (success) {
                return program;
            }
            console.error(gl.getProgramInfoLog(program));
            gl.deleteProgram(program);
        }
    }
}