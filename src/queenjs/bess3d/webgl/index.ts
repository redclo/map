import { ModuleRoot } from "@/queenjs/framework";
import actions from "./actions";
import hooks from "./hooks";

export class WebglModule extends ModuleRoot {
    actions = this.createAction(actions);
    hooks = this.createAction(hooks);

    _canvas?: HTMLCanvasElement;
    _gl?: WebGLRenderingContext;

    get canvas() {
        return this._canvas as HTMLCanvasElement;
    }
    get gl() {
        return this._gl as WebGLRenderingContext;
    }

    initCanvas(canvas: HTMLCanvasElement) {
        this._canvas = canvas;
        this.actions.initGLCtx(canvas)
    }
}
