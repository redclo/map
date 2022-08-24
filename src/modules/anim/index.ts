import { ModuleRoot } from "@/queenjs/framework";
import anim2 from "./actions/anim2";
import anim5 from "./actions/anim5";
import State from "./state";

export default class AnimModule extends ModuleRoot {
    actions = this.createAction([anim5, anim2])
    state = new State().reactive();
}
