import ChapterXModule from "..";
import {
    Vector2, DirectionalLight,
    AmbientLight,
    Vector3, WebGLRenderer, sRGBEncoding, Scene, PerspectiveCamera, Clock, CompressedTexture, LoadingManager
} from "three"

import { KTX2Loader } from "three/examples/jsm/loaders/KTX2Loader";
import { ShakeCamera } from "../objects/shakeCamera";

export default (chapterX: ChapterXModule) => {

    let _viewport: HTMLElement;
    let _viewportSize = new Vector2();
    const _canvasSize = new Vector2();

    const _previousPointerPosition = new Vector2(-1, -1);
    const _pointerPosition = (new Vector2).copy(_previousPointerPosition);
    const _isPointerDown = false;

    const _renderer = new WebGLRenderer({
        antialias: true
    });

    _renderer.setPixelRatio(Math.min(2, window.devicePixelRatio));
    _renderer.autoClear = false;
    _renderer.setClearColor(16777215, 0);
    _renderer.domElement.style.opacity = "0",
    _renderer.outputEncoding = sRGBEncoding;


    const _scene = new Scene();
    let _camera: PerspectiveCamera;
    const _clock = new Clock();

    const _mgr  = new LoadingManager();
    const _Textureloader = new KTX2Loader(_mgr).setTranscoderPath('./libs/basis/');

    return {
        getLoadMgr() {
            return _mgr;
        },
        loadTexure(file:string) {
            return _Textureloader.load(file, function(t:CompressedTexture) {
                        t.encoding = sRGBEncoding;
                        t.flipY = false;
                }
            )
        },

        initViewport(vp: HTMLElement) {
            _viewport = vp;
            _viewportSize = new Vector2(vp.offsetWidth, vp.offsetHeight);

            _renderer.setSize(_viewportSize.width, _viewportSize.height);
            _viewport.appendChild(_renderer.domElement);
            _renderer.getDrawingBufferSize(_canvasSize);

            _Textureloader.detectSupport(_renderer);
            _camera = new PerspectiveCamera(45, _viewportSize.width / _viewportSize.height, 0.1, 100);
            _camera.position.z = 3;

            // let _maskPass = new vl(this._renderer,this._viewportSize.width / 4,this._viewportSize.height / 4),
            //     this._renderPass = new Sl(this._renderer,this._scene,this._camera),
            const _directionalLight = new DirectionalLight(16578536, 1);
            _directionalLight.position.set(0, 1, 1);
            _scene.add(_directionalLight);

            const o = new DirectionalLight(16578536, 1);
            o.position.set(-1, -1, -1);
            _scene.add(o);

            const _ambientLight = new AmbientLight(16777215, .1);
            _scene.add(_ambientLight);

            const _cameraShake = new ShakeCamera(_camera);

            //     this._background = new Ul,
            //     this._scene.add(this._background),
            //     this._background.renderOrder = -1,
            //     this._background.material.uniforms.u_resolution.value.copy(this._canvasSize),

        }
    }
}