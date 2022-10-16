import { ModuleRoot } from "@/queenjs/framework";
import lovecounter from "./actions/lovecounter";
import State from "./state";

export default class GameMapModule extends ModuleRoot {
    actions = this.createAction([lovecounter])
    state = new State().reactive();
    onInit() {
        super.onInit();

        this.actions.getOccupiedLocations();
    }
}