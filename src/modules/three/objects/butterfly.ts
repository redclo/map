import { InstancedBufferAttribute, BufferGeometry, Color, InstancedMesh, MathUtils, Matrix4, Vector3 } from "three";
import { SimplexNoise } from "three/examples/jsm/math/SimplexNoise";
import ButterflyMaterial from "./butterflyMaterial";

const tmpMatrix = new Matrix4();
const tmpV3 = new Vector3();
const tmpColor = new Color();

export class MeshButterflys extends InstancedMesh {
    _speeds: number[];
    _scales: number[];
    _noise = new SimplexNoise();
    _time: number;
    _origin: Vector3;
    _up: Vector3;

    constructor(geom1: BufferGeometry, geom2: BufferGeometry) {
        super(geom1, new ButterflyMaterial(), 30);

        geom1.setAttribute("a_position2", geom2.attributes.position);
        geom1.setAttribute("a_normal2", geom2.attributes.normal);

        this._time = 0;
        this._origin = new Vector3();
        this._up = new Vector3(0, 1, 0);
        this._speeds = [];
        this._scales = [];

        const count = this.count;
        this._speeds = new Array(count);
        this._scales = new Array(count);

        const buffer = new Float32Array(count);
        for (let i = 0; i < count; ++i) {
            buffer[i] = i;

            tmpMatrix.makeTranslation(MathUtils.randFloat(-2, 2), MathUtils.randFloat(-2, 2), MathUtils.randFloat(-2, 2))
                .scale(tmpV3.setScalar(.01));

            this.setMatrixAt(i, tmpMatrix);

            tmpColor.set("#000000".replace(/0/g, function () {
                return (~~(16 * Math.random())).toString(16)
            }));

            this.setColorAt(i, tmpColor);

            this._speeds[i] = MathUtils.randFloat(.5, 1);
            this._scales[i] = MathUtils.randFloat(.05, .15);

            this.geometry.setAttribute("a_instanceId", new InstancedBufferAttribute(buffer, 1));
        }
    }

    update(t: number) {
        this._time += t;

        //@ts-ignore;
        this.material.uniforms.u_time.value += t;

        for (let e = 0; e < this.count; ++e) {
            this.getMatrixAt(e, tmpMatrix);
            tmpV3.setFromMatrixPosition(tmpMatrix);

            const i = this._noise.noise(e, .1 * this._time * this._speeds[e]);
            const r = this._noise.noise(e + 1, .2 * this._time * this._speeds[e]);
            const s = this._noise.noise(e + 2, .1 * this._time * this._speeds[e]);

            const a = MathUtils.mapLinear(i, -1, 1, -1, 1);
            const o = MathUtils.mapLinear(r, -1, 1, 0, 1)
            const l = MathUtils.mapLinear(s, -1, 1, -1, 1)

            let c = a - tmpV3.x
            let u = o - tmpV3.y
            let h = l - tmpV3.z
            const d = Math.sqrt(c * c + u * u + h * h);
            c /= d;
            u /= d;
            h /= d;
            tmpV3.x = a;
            tmpV3.y = o;
            tmpV3.z = l;
            tmpMatrix.setPosition(tmpV3);
            tmpMatrix.lookAt(this._origin, tmpV3.set(c, u, h), this._up);
            tmpMatrix.scale(tmpV3.setScalar(this._scales[e]));
            this.setMatrixAt(e, tmpMatrix);
        }
        this.instanceMatrix.needsUpdate = true;
    }
}
