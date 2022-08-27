
// , Mu = n.p + "static/media/book.486d1064.glb"
// , Su = n.p + "static/media/book.diffuse.0fdcd354.ktx2"
// , Tu = n.p + "static/media/book.ao.66672042.ktx2"
// , Au = n.p + "static/media/pages.ao.ecb4710e.ktx2";
import ChapterXModule from "..";

import {
    MeshPhongMaterial, Mesh, Matrix4,Euler
} from "three"


import { Book } from "../objects/book";
import { BookMaterial } from "../objects/bookMaterial";

const _boneNames  =  ["Front", "Back", "Page", "Page001", "Page002", "Page003", "Page004", "Page005", "Page006", "Page007", "Page008", "Page009"];

export default (chapterX: ChapterXModule) => {

    return {
        async loadBook() {

            const actions = chapterX.ctx.threeM.actions;
            const bookdiffuse = await actions.loadKTX2("book/book.diffuse.ktx2");
            const bookao = await actions.loadKTX2("book/book.ao.ktx2");
            const pageAo = await actions.loadKTX2("book/pages.ao.ktx2");

            const _bookMaterial = new MeshPhongMaterial({
                aoMapIntensity: .5,
                map: bookdiffuse,
                aoMap: bookao,
                side: 2
            })
            _bookMaterial.needsUpdate = true;
            const _pagesMaterial = new MeshPhongMaterial({
                aoMapIntensity: .7,
                aoMap: pageAo
            })
            _pagesMaterial.needsUpdate = true;
            
            const scope = new Book();

            const gltf = await actions.loadGltf('book/book.glb') as any;

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

            return scope;
        }
    }
}

