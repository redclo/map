import ChapterXModule from "..";
import {Vector2, Vector3, WebGLRenderer, sRGBEncoding, Scene, PerspectiveCamera, Clock} from "three"

import { KTX2Loader } from "three/examples/jsm/loaders/KTX2Loader";

export default (chapterX: ChapterXModule) => {

    let _viewport: HTMLElement;
    let _viewportSize = new Vector2();
    let _canvasSize = new Vector2();

    let _previousPointerPosition = new Vector2(-1,-1);
    let _pointerPosition = (new Vector2).copy(_previousPointerPosition);
    let _isPointerDown = false;

    const _renderer = new WebGLRenderer({
        antialias: true
    });

    _renderer.setPixelRatio(Math.min(2, window.devicePixelRatio));
    _renderer.autoClear = false;
    _renderer.setClearColor(16777215, 0);
    _renderer.domElement.style.opacity = "0",
    _renderer.outputEncoding = sRGBEncoding

    const _loader = new KTX2Loader()
    .setTranscoderPath( '/libs/basis/' )

    const _scene = new Scene();
    let _camera :PerspectiveCamera;
    const _clock = new Clock();

    return {
        initViewport( vp : HTMLElement) {
            _viewport = vp;
            _viewportSize = new Vector2(vp.offsetWidth, vp.offsetHeight);

            _renderer.setSize(_viewportSize.width, _viewportSize.height);
            _viewport.appendChild(_renderer.domElement);
            _renderer.getDrawingBufferSize(_canvasSize);

            _loader.detectSupport( _renderer );
            _camera = new PerspectiveCamera(45,  _viewportSize.width / _viewportSize.height, 0.1, 100);
            _camera.position.z = 3;


            // let _maskPass = new vl(this._renderer,this._viewportSize.width / 4,this._viewportSize.height / 4),
            //     this._renderPass = new Sl(this._renderer,this._scene,this._camera),
            //     this._directionalLight = new Oo(16578536,1),
            //     this._directionalLight.position.set(0, 1, 1),
            //     this._scene.add(this._directionalLight);
            //     var o = new Oo(16578536,1);
            //     o.position.set(-1, -1, -1),
            //     this._scene.add(o),
            //     this._ambientLight = new No(16777215,.1),
            //     this._scene.add(this._ambientLight),
            //     this._cameraShake = new dd(this._camera),
            //     this._background = new Ul,
            //     this._scene.add(this._background),
            //     this._background.renderOrder = -1,
            //     this._background.material.uniforms.u_resolution.value.copy(this._canvasSize),

        }
    }
}