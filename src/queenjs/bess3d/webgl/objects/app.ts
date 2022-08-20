import { WebglCtx } from "./webglCtx";

export class WebGlApp {
    _glctx?: WebglCtx;

    get webglCtx() {
        return this._glctx as WebglCtx;
    }
    setWebglCtx(ctx: WebglCtx) {
        this._glctx = ctx;
    }
    Destory() {
    }
}