import { PerspectiveCamera, Euler } from "three"
import { SimplexNoise } from "three/examples/jsm/math/SimplexNoise";

export class ShakeCamera {
    _object: PerspectiveCamera;
    _initialRotation: Euler;

    constructor(camera: PerspectiveCamera) {
        this._object = camera;
        this._initialRotation = camera.rotation.clone();
    }

    _yawNoise = new SimplexNoise();
    _pitchNoise = new SimplexNoise();
    _rollNoise = new SimplexNoise();

    intensity = .5;
    decay = false;
    decayRate = .65;
    maxYaw = .1;
    maxPitch = .1;
    maxRoll = .1;
    yawFrequency = .1;
    pitchFrequency = .1;
    rollFrequency = .1;

    update(t: number, e: number) {
        const n = Math.pow(this.intensity, 2);
        const i = this.maxYaw * n * this._yawNoise.noise(t * this.yawFrequency, 1);
        const r = this.maxPitch * n * this._pitchNoise.noise(t * this.pitchFrequency, 1);
        const s = this.maxRoll * n * this._rollNoise.noise(t * this.rollFrequency, 1);
        this._object.rotation.set(this._initialRotation.x + r, this._initialRotation.y + i, this._initialRotation.z + s);

        this.decay && this.intensity > 0 &&
            (this.intensity -= this.decayRate * e, (this.intensity < 0 || this.intensity > 1) &&
                (this.intensity = this.intensity < 0 ? 0 : 1))
    }
}