import { GltfState, GltfView, ResourceLoader } from "../gltfViewer"
// import ctxContainer from "../ui/ctx-container";
import { OrbitController } from "./orbitController";
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export class Bess3dApp {
    _running = false;
    _canvas: any;
    _redraw = false;
    _viewState?:GltfState;
    _view?:GltfView;
    _loopId = 0;
    _resLoader?: ResourceLoader;

    _InitCbs:any[] = [];
    _inited = false;

    afterInit(cb: () => void) {
        if( this._inited ) {
           cb();
           return;
        }
        this._InitCbs.push(cb);
    }

    destory() {
        this.stopRun();
    }
    
    redraw() {
        this._redraw = true;
    }

    async initCanvas(canvas:any) {
        this._canvas = canvas;
        const context = canvas.getContext("webgl2", { alpha: false, antialias: true });
        const view = new GltfView(context);
        const resLoader = view.createResourceLoader();
        const state = view.createState();
        state.renderingParameters.useDirectionalLightsWithDisabledIBL = true;


        const ctrl = new OrbitController();
        ctrl.init(canvas);
        const scope = this;

        ctrl.events?.orbit.subscribe( (orbit:any) => {
            if (state.cameraIndex === undefined){
                state.userCamera.orbit(orbit.deltaPhi, orbit.deltaTheta);
            }
            scope.redraw();
        });
      
        ctrl.events?.pan.subscribe( (pan:any) => {
            if (state.cameraIndex === undefined)
            {
                state.userCamera.pan(pan.deltaX, -pan.deltaY);
            }
            scope.redraw();
        });
    
        ctrl.events?.zoom.subscribe( (zoom:any) => {
            if (state.cameraIndex === undefined)
            {
                state.userCamera.zoomBy(zoom.deltaZoom);
            }
            scope.redraw();
        });


        this._viewState = state;
        this._view = view;
        this._resLoader = resLoader;

        this.run();

        await this.loadEnv("//sku3d-test.obs.cn-east-3.myhuaweicloud.com/bess/env/Cannon_Exterior.hdr");
        
        this.redraw();

        let n = this._InitCbs.length;
        while(n--) {
            this._InitCbs[n]();
        }
        this._InitCbs = [];

        this._inited = true;
    }

    async loadGltf(glb:string) {
        if ( !this._resLoader || !this._viewState  ) return;

        const loader = this._resLoader;
        loader.initKtxLib();

        const state = this._viewState;
   
        const gltf =  await loader.loadGltf(glb, undefined);
        state.gltf = gltf;

        const defaultScene = state.gltf.scene;
        state.sceneIndex = defaultScene === undefined ? 0 : defaultScene;
        state.cameraIndex = undefined;
        if (state.gltf.scenes.length != 0)
        {
            if(state.sceneIndex > state.gltf.scenes.length - 1)
            {
                state.sceneIndex = 0;
            }
            const scene = state.gltf.scenes[state.sceneIndex];
            scene.applyTransformHierarchy(state.gltf);
            state.userCamera.aspectRatio = this._canvas.width / this._canvas.height;
            state.userCamera.fitViewToScene(state.gltf, state.sceneIndex);

            // Try to start as many animations as possible without generating conficts.
            state.animationIndices = [];
            for (let i = 0; i < gltf.animations.length; i++)
            {
                if (!gltf.nonDisjointAnimations(state.animationIndices).includes(i))
                {
                    state.animationIndices.push(i);
                }
            }
            state.animationTimer.start();
        }
        this.redraw();

    }

    async loadEnv(url:string) {
        if ( !this._viewState ) return;

        const environment = await this._resLoader?.loadEnvironment(url);
        if (environment ) {
            this._viewState.environment = environment;

            this._redraw = true;
        }
    }
    stopRun() {
        window.cancelAnimationFrame(this._loopId);
    }

    run() {
        if (this._running || !this._viewState || !this._view) return;
        
        const canvas = this._canvas;
        const scope = this;

        const past = {width:0, height:0};

        const update = ()=>{
            const devicePixelRatio = window.devicePixelRatio || 1;
            // set the size of the drawingBuffer based on the size it's displayed.
            canvas.width = Math.floor(canvas.clientWidth * devicePixelRatio);
            canvas.height = Math.floor(canvas.clientHeight * devicePixelRatio);

            let redraw = scope._redraw;
            const state = scope._viewState;
            const view = scope._view;

            //@ts-ignore
            redraw = redraw || (!state.animationTimer.paused && state.animationIndices.length > 0);
            redraw = redraw || (past.width != canvas.width || past.height != canvas.height);
            
            past.width = canvas.width;
            past.height = canvas.height;
        
            if (redraw) {
                //@ts-ignore
                view.renderFrame(state, canvas.width, canvas.height);
                scope._redraw = false;
            }
            this._loopId = window.requestAnimationFrame(update);
        };

        // After this start executing animation loop.
        this._loopId = window.requestAnimationFrame(update);
    }
}   