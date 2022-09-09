import { ModuleRoot } from "@/queenjs/framework";
import anim2 from "./actions/anim2";
import anim3 from "./actions/anim3";
import anim5 from "./actions/anim5";
import State from "./state";

export default class AnimModule extends ModuleRoot {
    actions = this.createAction([anim5, anim2, anim3])
    state = new State().reactive();
}
