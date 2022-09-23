import ChapterXModule from "..";

import {
    MeshPhongMaterial, Mesh, Matrix4, Euler
} from "three"
import { MeshButterflys } from "@/modules/three/objects/butterfly";

export default (chapterX: ChapterXModule) => {
    return {
        async loadCity() {
            const actions = chapterX.ctx.threeM.actions;
            const glft = await actions.loadGltf("book/city.glb") as any;
            const butterfly = glft.scene.getObjectByName("Butterfly").geometry;
            const butterfly001 = glft.scene.getObjectByName("Butterfly001").geometry;
            const _butterflies = new MeshButterflys(butterfly, butterfly001);

            return _butterflies;
        }
    }
}

