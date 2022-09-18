import { DoubleSide, MeshPhongMaterial, Vector2 } from "three";

export default class ButterflyMaterial extends MeshPhongMaterial {
    uniforms = {
        u_resolution: {
            value: new Vector2()
        },
        u_maskTexture: {
            value: null
        },
        u_time: {
            value: 0
        }
    };

    constructor() {
        super();

        this.side = DoubleSide;
        this.transparent = true;

    }
    onBeforeCompile(shader: any) {
        Object.assign(shader.uniforms, this.uniforms);
        shader.vertexShader = shader.vertexShader
            .replace("#include <common>", "\n      attribute float a_instanceId;\n      attribute vec3 a_position2;\n      attribute vec3 a_normal2;\n\n      uniform float u_time;\n      ")
            .replace("#include <beginnormal_vertex>", "\n      float m_progress =  0.5 * (1.0 + sin((u_time + a_instanceId) * 15.0));\n\n      vec3 objectNormal = vec3(mix(normal, a_normal2, m_progress));\n\n      #ifdef USE_TANGENT\n\t      vec3 objectTangent = vec3(tangent.xyz);\n      #endif\n      ")
            .replace("#include <begin_vertex>", "\n      vec3 transformed = vec3(mix(position, a_position2, m_progress));\n      ");

        // shader.fragmentShader = shader.fragmentShader
        // .replace("#include <common>", "\n      #include <common>\n\n      uniform vec2 u_resolution;\n      uniform sampler2D u_maskTexture;\n      ")
        // .replace("#include <output_fragment>", "\n      #include <output_fragment>\n\n      vec2 m_uv = gl_FragCoord.xy / u_resolution;\n\n      float m_mask = texture2D(u_maskTexture, m_uv).r;\n\n      gl_FragColor = mix(vec4(vec3(0.6), gl_FragColor.a), gl_FragColor, m_mask);\n\n      gl_FragColor.rgb += rand(m_uv) * 0.02;\n      \n\n      // gl_FragColor = vec4(m_uv, 1.0, 1.0);\n      ")
    }
}