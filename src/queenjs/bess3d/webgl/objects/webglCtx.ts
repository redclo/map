export class WebglCtx {
    canvas: HTMLCanvasElement;
    gl: WebGLRenderingContext;
    options: any;

    constructor(gl: WebGLRenderingContext, canvas: HTMLCanvasElement, options: any) {
        this.gl = gl;
        this.canvas = canvas;
        this.options = options;
    }
}