import { ModuleRoot } from "@/queenjs/framework";
import book from "./actions/book";
import loader from "./actions/loader";
import State from "./state";
export default class ThreeModule extends ModuleRoot {
    actions = this.createAction([book, loader])
    state = new State().reactive();
    onInit() {
        super.onInit();
    }
}