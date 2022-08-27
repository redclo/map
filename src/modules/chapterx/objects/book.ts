import { Object3D, Euler, Vector2, Vector3, Quaternion, MeshPhongMaterial, Mesh, Matrix4, LoadingManager, MathUtils} from "three";
import { BookMaterial } from "./bookMaterial";

const TempV3 = new Vector3();
const TempQuat = new Quaternion();
const TempQuat2 = new Quaternion();

export class Book extends Object3D {
    book:Object3D;
    _bones:any = {};
    leftPage: Object3D;
    rightPage: Object3D;
    _open = 0
    _openMix = 0
    _previousRotation = new Vector2()
    _targetRotation = new Vector2()
    _rotation = new Vector2()
    _rotationVelocity = 0

    constructor() {
        super();

        this.book = new Object3D()
        this.add(this.book) 
        const scope = this;

        const leftPage = new Object3D()
        leftPage.position.y = 2
        leftPage.rotation.z = -Math.PI / 2
        this.leftPage = leftPage;

        const rightPage = new Object3D()
        rightPage.position.y = 2
        rightPage.rotation.z = Math.PI / 2
        this.rightPage = rightPage;
    }

    rotationSpeed = {
        value: 0
    }
    rotationScale = {
        value: 5e3
    }

    forcedOriginRotation = {
        value: 0
    }
    forceOpen = {
        value: 0
    }
    forceOpenScale = {
        value: 0
    }
    forceClose = {
        value: 0
    }
    forceCloseScale = {
        value: .1
    }
    _bookMaterial:BookMaterial = new BookMaterial({});
    _pagesMaterial = new BookMaterial({});

    _updateBones() {
        const t = this._open + this._rotationVelocity + this.forceOpen.value * this.forceOpenScale.value - this.forceClose.value * this.forceCloseScale.value
          , e = this._openMix - this.forceClose.value * this.forceCloseScale.value;

        this._bookMaterial.uniforms.u_open.value = t,
        this._pagesMaterial.uniforms.u_open.value = t,
        this._bookMaterial.uniforms.u_openMix.value = e,
        this._pagesMaterial.uniforms.u_openMix.value = e;

        if (!this._bones) return;

        this._bones.Front.rotation.z = MathUtils.mapLinear(t, 0, 1, MathUtils.degToRad(-90), MathUtils.mapLinear(e, 0, 1, MathUtils.degToRad(-30), MathUtils.degToRad(0))),
        this._bones.Back.rotation.z = MathUtils.mapLinear(t, 0, 1, MathUtils.degToRad(-90), MathUtils.mapLinear(e, 0, 1, MathUtils.degToRad(-150), MathUtils.degToRad(-180))),
        this._bones.Page.rotation.z = MathUtils.mapLinear(t, 0, 1, 0, MathUtils.mapLinear(e, 0, 1, MathUtils.degToRad(44.8), MathUtils.degToRad(90))),
        this._bones.Page.position.y = MathUtils.mapLinear(t * e, 0, 1, .2, .3),
        this._bones.Page001.rotation.z = MathUtils.mapLinear(t, 0, 1, 0, MathUtils.mapLinear(e, 0, 1, MathUtils.degToRad(33), MathUtils.degToRad(90))),
        this._bones.Page001.position.y = MathUtils.mapLinear(t * e, 0, 1, .2, .35),
        this._bones.Page002.rotation.z = MathUtils.mapLinear(t, 0, 1, 0, MathUtils.mapLinear(e, 0, 1, MathUtils.degToRad(20.8), MathUtils.degToRad(90))),
        this._bones.Page002.position.y = MathUtils.mapLinear(t * e, 0, 1, .2, .4),
        this._bones.Page003.rotation.z = MathUtils.mapLinear(t, 0, 1, 0, MathUtils.mapLinear(e, 0, 1, MathUtils.degToRad(11.2), MathUtils.degToRad(90))),
        this._bones.Page003.position.y = MathUtils.mapLinear(t * e, 0, 1, .2, .45),
        this._bones.Page004.rotation.z = MathUtils.mapLinear(t, 0, 1, 0, MathUtils.mapLinear(e, 0, 1, MathUtils.degToRad(0), MathUtils.degToRad(90))),
        this._bones.Page004.position.x = MathUtils.mapLinear(t * e, 0, 1, -.106, -.045),
        this._bones.Page004.position.y = MathUtils.mapLinear(t * e, 0, 1, .2, .5),
        this._bones.Page005.rotation.z = MathUtils.mapLinear(t, 0, 1, 0, MathUtils.mapLinear(e, 0, 1, MathUtils.degToRad(-10.4), MathUtils.degToRad(-90))),
        this._bones.Page005.position.x = MathUtils.mapLinear(t * e, 0, 1, 0, -.055),
        this._bones.Page005.position.y = MathUtils.mapLinear(t * e, 0, 1, .2, .525),
        this._bones.Page006.rotation.z = MathUtils.mapLinear(t, 0, 1, 0, MathUtils.mapLinear(e, 0, 1, MathUtils.degToRad(-17.3), MathUtils.degToRad(-90))),
        this._bones.Page006.position.y = MathUtils.mapLinear(t * e, 0, 1, .2, .475),
        this._bones.Page007.rotation.z = MathUtils.mapLinear(t, 0, 1, 0, MathUtils.mapLinear(e, 0, 1, MathUtils.degToRad(-26.7), MathUtils.degToRad(-90))),
        this._bones.Page007.position.y = MathUtils.mapLinear(t * e, 0, 1, .2, .425),
        this._bones.Page008.rotation.z = MathUtils.mapLinear(t, 0, 1, 0, MathUtils.mapLinear(e, 0, 1, MathUtils.degToRad(-37.9), MathUtils.degToRad(-90))),
        this._bones.Page008.position.y = MathUtils.mapLinear(t * e, 0, 1, .2, .375),
        this._bones.Page009.rotation.z = MathUtils.mapLinear(t, 0, 1, 0, MathUtils.mapLinear(e, 0, 1, MathUtils.degToRad(-49.8), MathUtils.degToRad(-90))),
        this._bones.Page009.position.y = MathUtils.mapLinear(t * e, 0, 1, .2, .325)
    }
    
    setResolution(t:any) {
        this._bookMaterial.uniforms.u_resolution.value.copy(t),
        this._pagesMaterial.uniforms.u_resolution.value.copy(t)
    }
    
    setMaskTexture(t:any) {
        this._bookMaterial.uniforms.u_maskTexture.value = t,
        this._pagesMaterial.uniforms.u_maskTexture.value = t
    }

    rotate(t:number, e:number) {
        this._targetRotation.x += t * this.rotationScale.value,
        this._targetRotation.y += e * this.rotationScale.value
    }
    
    update(t:any) {

        if (!this.book) return;
        const e = this._rotation.x - this._previousRotation.x + this.rotationSpeed.value;
        this._previousRotation.copy(this._rotation),
        this._rotation.x += .1 * (this._targetRotation.x - this._rotation.x),

        this.rotateOnWorldAxis(TempV3.set(0, 1, 0), e),
        this.getWorldQuaternion(TempQuat),
        TempQuat.slerp(TempQuat2.setFromAxisAngle(TempV3.set(0, 1, 0), 0), this.forcedOriginRotation.value),
        this.setRotationFromQuaternion(TempQuat),
        this._rotationVelocity = Math.abs(e),
        this._updateBones()
    }
    get open() {
        return this._open;
    }
    set open(v) {
        this._open = v;
        this._updateBones();
    }
    get openMix() {
        return this._openMix
    }
 
    set openMix(t) {
        this._openMix = t,
        this._updateBones()
    }
}