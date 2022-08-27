import { ModuleRoot } from "@/queenjs/framework";
import load from "./actions/load";
import loadbook from "./actions/loadbook";
import State from "./state";

export default class ChapterXModule extends ModuleRoot {
    actions = this.createAction([load, loadbook])
    state = new State().reactive();
    onInit() {
        super.onInit();
    }
}