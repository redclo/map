import { ModuleRoot } from "@/queenjs/framework";
import infoAction from "./actions/infoAction";
import { logoutEvent } from "./events/logout";
import http from "./http";
import state from "./state";

export default class UserModule extends ModuleRoot {
  state = new state().reactive();
  http = new http(this);
  actions = this.createAction([infoAction]);
  events = [logoutEvent];
  effects = [];
}
