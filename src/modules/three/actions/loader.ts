import ChapterXModule from "..";
import {
    Vector2, DirectionalLight,
    AmbientLight,
    Vector3, WebGLRenderer, sRGBEncoding, Scene, PerspectiveCamera, Clock, CompressedTexture, LoadingManager
} from "three"

import { KTX2Loader } from "three/examples/jsm/loaders/KTX2Loader";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export default (chapterX: ChapterXModule) => {

  

    const _mgr  = new LoadingManager();
    const _ktxloader = new KTX2Loader(_mgr).setTranscoderPath('./libs/basis/');
    const _gltfLoader= new GLTFLoader( _mgr );

    return {
        getLoadMgr() {
            return _mgr;
        },
        
        loadGltf( file:string) {
            return new Promise((resolve, reject)=>{
                _gltfLoader.load(file, function(gltf:any) {
                    resolve(gltf);
                });
            });
        },

        async loadKTX2(file:string) {
            const t = await _ktxloader.loadAsync(file)
            if (t) {
                t.encoding = sRGBEncoding;
                t.flipY = false;
             }
             return t;
        },
        
        initWidthRender(render: WebGLRenderer) {
            _ktxloader.detectSupport( render );
        },
        loaderDispose() {
            _ktxloader.dispose();
        }
    }
}