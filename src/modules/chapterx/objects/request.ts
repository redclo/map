import { LoadingManager } from "three"

const gMgr = new LoadingManager();

export class Request {
    manager: LoadingManager;
    crossOrigin = "anonymous";
    withCredentials = false;
    path = "";
    resourcePath = "";
    requestHeader = {}
    constructor(mgr:LoadingManager) {
        this.manager = mgr ? mgr : gMgr;
    }

    load() {}
    loadAsync(path:string, e:any) {
        return new Promise((resolve, reject)=> {
            //@ts-ignore
            this.load(path, resolve, e, reject)
        })
    }
    parse() {}
    setCrossOrigin(t:string) {
         this.crossOrigin = t;
         return this
    }
    setWithCredentials(t:boolean) {
         this.withCredentials = t;
         return this
    }
    setPath(t:string) {
        this.path = t;
       return this
    }
    setResourcePath(t:string) {
        this.resourcePath = t;
        return this;
    }
    setRequestHeader(header:any) {
        this.requestHeader = header;
        return this;
    }
}



 class Res extends Request {

    dracoLoader = null;
    ktx2Loader = null;
    meshoptDecoder = null;
    pluginCallbacks :any[] = [];

    constructor(mgr:LoadingManager) {
        super(mgr);

        this.dracoLoader = null;
        this.ktx2Loader = null;
        this.meshoptDecoder = null;
        this.pluginCallbacks = [];

        this.register(function(t) {
            return new Jl(t)
        })

        this.register(function(t) {
            return new rc(t)
        })

        this.register(function(t) {
            return new sc(t)
        })

        this.register(function(t) {
            return new $l(t)
        })

        this.register(function(t) {
            return new tc(t)
        })

        this.register(function(t) {
            return new ec(t)
        })

        this.register(function(t) {
            return new nc(t)
        })

        this.register(function(t) {
            return new Zl(t)
        })

        this.register(function(t) {
            return new ic(t)
        })

        this.register(function(t) {
            return new Ql(t)
        })

        this.register(function(t) {
            return new Yl(t)
        })

        this.register(function(t) {
            return new ac(t)
        })
    }

    load(t, e, n, i) {
        const r = this;
        let s;
        s = "" !== this.resourcePath ? this.resourcePath : "" !== this.path ? this.path : zo.extractUrlBase(t),
        this.manager.itemStart(t);
        const a = function(e) {
            i ? i(e) : console.error(e),
            r.manager.itemError(t),
            r.manager.itemEnd(t)
        }
          , o = new vo(this.manager);
        o.setPath(this.path),
        o.setResponseType("arraybuffer"),
        o.setRequestHeader(this.requestHeader),
        o.setWithCredentials(this.withCredentials),
        o.load(t, (function(n) {
            try {
                r.parse(n, s, (function(n) {
                    e(n),
                    r.manager.itemEnd(t)
                }
                ), a)
            } catch (i) {
                a(i)
            }
        }
        ), n, a)
    }

    setDRACOLoader(dracoLoader:any) {
        this.dracoLoader = dracoLoader;
        return this
    }

    setDDSLoader() {
        throw new Error('THREE.GLTFLoader: "MSFT_texture_dds" no longer supported. Please update to "KHR_texture_basisu".')
    }

    setKTX2Loader(ktx2Loader:any) {
         this.ktx2Loader = ktx2Loader
         return this;
    }

    setMeshoptDecoder(meshoptDecoder:any) {
         this.meshoptDecoder = meshoptDecoder;
         return this
    }

    register(plugin:any) {
        return -1 === this.pluginCallbacks.indexOf(plugin) && this.pluginCallbacks.push(plugin),
        this
    }

    unregister(t) {
        return -1 !== this.pluginCallbacks.indexOf(t) && this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(t), 1),
        this
    }

    parse(t, e, n, reject) {
        let r;
        const s = {}
          , a = {};
        if ("string" === typeof t)
            r = t;
        else {
            if (zo.decodeText(new Uint8Array(t,0,4)) === oc) {
                try {
                    s[Xl.KHR_BINARY_GLTF] = new uc(t)
                } catch (c) {
                    return reject && reject(c)
                }
                r = s[Xl.KHR_BINARY_GLTF].content
            } else
                r = zo.decodeText(new Uint8Array(t))
        }

        const o = JSON.parse(r);
        if ( !o.asset || o.asset.version[0] < 2){
            return reject && reject(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));
        }

        const l = new Vc(o,{
            path: e || this.resourcePath || "",
            crossOrigin: this.crossOrigin,
            requestHeader: this.requestHeader,
            manager: this.manager,
            ktx2Loader: this.ktx2Loader,
            meshoptDecoder: this.meshoptDecoder
        });
        l.fileLoader.setRequestHeader(this.requestHeader);
        for (let u = 0; u < this.pluginCallbacks.length; u++) {
            const t = this.pluginCallbacks[u](l);
            a[t.name] = t,
            s[t.name] = !0
        }
        if (o.extensionsUsed)
            for (let u = 0; u < o.extensionsUsed.length; ++u) {
                const t = o.extensionsUsed[u]
                  , e = o.extensionsRequired || [];
                switch (t) {
                case Xl.KHR_MATERIALS_UNLIT:
                    s[t] = new Kl;
                    break;
                case Xl.KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS:
                    s[t] = new fc;
                    break;
                case Xl.KHR_DRACO_MESH_COMPRESSION:
                    s[t] = new hc(o,this.dracoLoader);
                    break;
                case Xl.KHR_TEXTURE_TRANSFORM:
                    s[t] = new dc;
                    break;
                case Xl.KHR_MESH_QUANTIZATION:
                    s[t] = new mc;
                    break;
                default:
                    e.indexOf(t) >= 0 && void 0 === a[t] && console.warn('THREE.GLTFLoader: Unknown extension "' + t + '".')
                }
            }
        l.setExtensions(s),
        l.setPlugins(a),
        l.parse(n, i)
    }
    
    parseAsync(text:string, path:string) {
        const scope = this;
        return new Promise((function(resolve, reject) {
            scope.parse(text, path, resolve, reject)
        }))
    }
}