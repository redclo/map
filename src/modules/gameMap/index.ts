import { ModuleRoot } from "@/queenjs/framework";
import float from "./actions/float";
import game from "./actions/game";
import load from "./actions/load";
import mouse from "./actions/mouse";
import resize from "./actions/resize";
import select from "./actions/select";
import tile from "./actions/tile";
import State from "./state";


export default class GameMapModule extends ModuleRoot {
    actions = this.createAction([game, mouse, resize, select, load, tile, float])
    state = new State().reactive();

    onInit() {
        super.onInit();
        document.onkeydown = (e: any) => {
            if (e.keyCode == 32) {
                this.state.showHud = !this.state.showHud;
            }
        }
    }
}