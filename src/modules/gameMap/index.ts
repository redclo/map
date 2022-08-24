import { ModuleRoot } from "@/queenjs/framework";
import game from "./actions/game";
import mouse from "./actions/mouse";
import resize from "./actions/resize";
import select from "./actions/select";
import State from "./state";


export default class GameMapModule extends ModuleRoot {
    actions = this.createAction([game, mouse, resize, select])
    state = new State().reactive();
}