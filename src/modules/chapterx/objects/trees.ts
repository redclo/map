import {  BufferGeometry, Material, Mesh } from "three";

class Trees extends Mesh {

    isInstancedMesh = true;
    frustumCulled = false;
    count = 0;
    instanceColor = null;

    constructor(geo:BufferGeometry, mat:Material, size:number) {
        super(geo, mat);

        this.instanceMatrix = new fa(new Float32Array(16 * size),16);

        this.instanceColor = null;
        this.count = size;
    }
    copy(t, e) {
        return super.copy(t, e),
        this.instanceMatrix.copy(t.instanceMatrix),
        null !== t.instanceColor && (this.instanceColor = t.instanceColor.clone()),
        this.count = t.count,
        this
    }
    getColorAt(t, e) {
        e.fromArray(this.instanceColor.array, 3 * t)
    }
    getMatrixAt(t, e) {
        e.fromArray(this.instanceMatrix.array, 16 * t)
    }
    raycast(t, e) {
        const n = this.matrixWorld
          , i = this.count;
        if (va.geometry = this.geometry,
        va.material = this.material,
        void 0 !== va.material)
            for (let r = 0; r < i; r++) {
                this.getMatrixAt(r, ma),
                ga.multiplyMatrices(n, ma),
                va.matrixWorld = ga,
                va.raycast(t, _a);
                for (let t = 0, n = _a.length; t < n; t++) {
                    const n = _a[t];
                    n.instanceId = r,
                    n.object = this,
                    e.push(n)
                }
                _a.length = 0
            }
    }
    setColorAt(t, e) {
        null === this.instanceColor && (this.instanceColor = new fa(new Float32Array(3 * this.instanceMatrix.count),3)),
        e.toArray(this.instanceColor.array, 3 * t)
    }
    setMatrixAt(t, e) {
        e.toArray(this.instanceMatrix.array, 16 * t)
    }
    updateMorphTargets() {}
    dispose() {
        this.dispatchEvent({
            type: "dispose"
        })
    }
}