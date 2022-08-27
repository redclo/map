
// , Mu = n.p + "static/media/book.486d1064.glb"
// , Su = n.p + "static/media/book.diffuse.0fdcd354.ktx2"
// , Tu = n.p + "static/media/book.ao.66672042.ktx2"
// , Au = n.p + "static/media/pages.ao.ecb4710e.ktx2";
import ChapterXModule from "..";

import {
    MeshPhongMaterial, Mesh, Matrix4,Euler
} from "three"

import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Book } from "../objects/book";

const _boneNames  =  ["Front", "Back", "Page", "Page001", "Page002", "Page003", "Page004", "Page005", "Page006", "Page007", "Page008", "Page009"];

export default (chapterX: ChapterXModule) => {

    return {
        loadBook() {
            const _bookMaterial = new MeshPhongMaterial({
                aoMapIntensity: .5,
                map: chapterX.actions.loadTexure("static/media/book.diffuse.0fdcd354.ktx2"),
                aoMap: chapterX.actions.loadTexure("static/media/book.ao.66672042.ktx2"),
                side: 2
            })
            const _pagesMaterial = new MeshPhongMaterial({
                aoMapIntensity: .7,
                aoMap: chapterX.actions.loadTexure("static/media/pages.ao.ecb4710e.ktx2")
            })


            const loader= new GLTFLoader(chapterX.actions.getLoadMgr());
            const scope = new Book();
            loader.load('static/media/book.486d1064.glb', function(gltf) {
                const armatureObj = gltf.scene.getObjectByName("Armature");
                if ( !armatureObj ) return;
                armatureObj.applyMatrix4((new Matrix4()).makeRotationFromEuler(new Euler().set(0, Math.PI / 2, Math.PI / 2)).setPosition(0, .045, -.465)),
                scope.book.add(armatureObj);
                
                const root = armatureObj.getObjectByName("Root");
             
                scope._bones = _boneNames.reduce(function(ret:any, name:string) {
                     ret[name] = root?.getObjectByName(name)
                     return ret;
                }, {});
                const bookObj  = armatureObj.getObjectByName("Book") as Mesh;
                bookObj.rotation.y = Math.PI / 2;
                bookObj.frustumCulled = false;
                bookObj.material = _bookMaterial;
                
                const PagesObj = armatureObj.getObjectByName("Pages") as Mesh
                PagesObj.frustumCulled = false;
                PagesObj.material = _pagesMaterial;
                scope._bones.Page004.add(scope.leftPage);
                scope._bones.Page005.add(scope.rightPage);
            });

        }
    }
}

