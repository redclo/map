import { Object3D, Euler, Vector2, MeshPhongMaterial, Mesh, Matrix4, LoadingManager} from "three";


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
}