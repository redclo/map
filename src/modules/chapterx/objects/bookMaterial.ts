import {MeshPhongMaterial, Vector2} from "three"

export class BookMaterial extends MeshPhongMaterial {
    _useUv:boolean;
    uniforms = {
        u_maskTexture: {
            value: null
        },
        u_resolution: {
            value: new Vector2(),
        },
        u_open: {
            value: 0
        },
        u_openMix: {
            value: 0
        }
    }
    constructor(options:any,  useUv:boolean = false) {
        super(options)
        this.transparent = true;
        this._useUv = useUv;
    }

    onBeforeCompile(shader:any) {
            Object.assign(shader.uniforms, this.uniforms);
            if (this._useUv) {
                shader.defines = shader.defines || {};
                shader.defines.USE_UV = true;
            }
            shader.fragmentShader = shader.fragmentShader
            .replace("#include <common>", "#include <common>\nuniform sampler2D u_maskTexture;uniform vec2 u_resolution;uniform float u_open;uniform float u_openMix;")
            .replace("#include <aomap_fragment>", "#ifdef USE_AOMAP\nvec3 m_ao=texture2D(aoMap,vUv).rgb;float m_finalAo=(mix(mix(m_ao.r,m_ao.g,u_open),m_ao.b,u_open*u_openMix)-1.)*aoMapIntensity+1.;vec3 m_maskedColor=vec3(m_finalAo);\n#else\nvec3 m_maskedColor=vec3(1.,0.,0.);\n#endif\n")
            .replace("#include <output_fragment>", "#include <output_fragment>\ngl_FragColor.rgb*=m_finalAo;vec2 m_uv=gl_FragCoord.xy/u_resolution;float m_mask=texture2D(u_maskTexture,m_uv).r;gl_FragColor=mix(vec4(m_maskedColor,gl_FragColor.a),gl_FragColor,m_mask);gl_FragColor.rgb+=rand(m_uv)*0.02;")
    }
}



