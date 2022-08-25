import { WebGLRenderer , ShaderMaterial, Vector2, } from "three";

import { FullScreenQuad, } from "three/examples/jsm/postprocessing/Pass";

class Pass {
    _renderer: WebGLRenderer
    _fullScreenQuad: FullScreenQuad;

    constructor(render:WebGLRenderer) {
        this._renderer = render;
        this._fullScreenQuad = new FullScreenQuad();
    }
}

const fragShader = `
precision highp float;
uniform sampler2D u_previousTexture;
uniform float u_aspectRatio;
uniform vec2 u_pointerPosition;
uniform float u_time;
varying vec2 v_uv;
vec4 A(vec4 B){return mod(((B*34.)+1.)*B,289.);}
vec4 C(vec4 D){return 1.79284291400159-0.85373472095314*D;}
float E(vec3 F){
    const vec2 G=vec2(1./6.,1./3.);
    const vec4 H=vec4(0.,0.5,1.,2.);
    vec3 I=floor(F+dot(F,G.yyy));
    vec3 J=F-I+dot(I,G.xxx);
    vec3 K=step(J.yzx,J.xyz);
    vec3 L=1.-K;
    vec3 M=min(K.xyz,L.zxy);
    vec3 N=max(K.xyz,L.zxy);
    vec3 O=J-M+1.*G.xxx;
    vec3 P=J-N+2.*G.xxx;
    vec3 Q=J-1.+3.*G.xxx;
    I=mod(I,289.);
    vec4 R=A(A(A(I.z+vec4(0.,M.z,N.z,1.))+I.y+vec4(0.,M.y,N.y,1.))+I.x+vec4(0.,M.x,N.x,1.));
    float S=1./7.;
    vec3 T=S*H.wyz-H.xzx;
    vec4 U=R-49.*floor(R*T.z*T.z);
    vec4 V=floor(U*T.z);
    vec4 W=floor(U-7.*V);
    vec4 B=V*T.x+T.yyyy;
    vec4 X=W*T.x+T.yyyy;
    vec4 Y=1.-abs(B)-abs(X);
    vec4 Z=vec4(B.xy,X.xy);
    vec4 a=vec4(B.zw,X.zw);
    vec4 b=floor(Z)*2.+1.;
    vec4 c=floor(a)*2.+1.;
    vec4 d=-step(Y,vec4(0.));
    vec4 e=Z.xzyw+b.xzyw*d.xxyy;
    vec4 f=a.xzyw+c.xzyw*d.zzww;
    vec3 g=vec3(e.xy,Y.x);
    vec3 h=vec3(e.zw,Y.y);
    vec3 i=vec3(f.xy,Y.z);
    vec3 j=vec3(f.zw,Y.w);
    vec4 k=C(vec4(dot(g,g),dot(h,h),dot(i,i),dot(j,j)));
    g*=k.x;
    h*=k.y;
    i*=k.z;
    j*=k.w;
    vec4 l=max(0.6-vec4(dot(J,J),dot(O,O),dot(P,P),dot(Q,Q)),0.);
    l=l*l;
    return 42.*dot(l*l,vec4(dot(g,J),dot(h,O),dot(i,P),dot(j,Q)));
}
    
    float m(in vec2 n,in float o,in float p) {
        return 1.-smoothstep(o-(o*p),o+(o*p),dot(n,n)*4.);
    }
    void main() {
        vec2 n=v_uv;
        n-=0.5;
        n.x*=u_aspectRatio;
        vec2 q=u_pointerPosition*-0.5;
        q.x*=u_aspectRatio;
        vec2 r=n+q;
        float s=m(r,0.01,60.);
        float t=E(vec3(n.x*4.+u_time,n.y*4.-u_time,u_time))+0.6;
        float u=texture2D(u_previousTexture,v_uv).r;
        u*=0.95;
        u+=s*t;
        gl_FragColor=vec4(u,0.,0.,1.);
    }
`
    

class MaskPass extends Pass {
    _toggle = false;
    _material: ShaderMaterial;
    
    constructor(render:WebGLRenderer, width:number, height:number) {
        super(render);

        this._material = new ShaderMaterial({
            vertexShader: "uniform mat4 projectionMatrix;uniform mat4 modelViewMatrix;attribute vec3 position;attribute vec2 uv;varying vec2 v_uv;void main(){v_uv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}",
            fragmentShader: fragShader,
            uniforms: {
                u_previousTexture: {
                    value: null
                },
                u_aspectRatio: {
                    value: width / height
                },
                u_time: {
                    value: 0
                },
                u_pointerPosition: {
                    value: new Vector2(),
                }
            }
        });
        
        // const a = {
        //     minFilter: k,
        //     magFilter: k,
        //     generateMipmaps: false,
        //     depthBuffer: false,
        //     format: 1028
        // };
        // _renderTarget0 = new $t(i,r,a)
        // _renderTarget1 = new $t(i,r,a)
    }


}