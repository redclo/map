import { ModuleRoot } from "@/queenjs/framework";

import State from "./state";


export default class ChapterXModule extends ModuleRoot {
    actions = this.createAction([])
    state = new State().reactive();
    onInit() {
        super.onInit();
    }
}