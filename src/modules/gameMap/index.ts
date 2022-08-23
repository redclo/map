import { ModuleRoot } from "@/queenjs/framework";
import game from "./actions/game";
import State from "./state";


export default class GameMapModule extends ModuleRoot {
    actions = this.createAction([game])
    state = new State().reactive();
}