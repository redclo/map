import { ModuleRoot } from "./module";

export class ModuleObject<T extends ModuleRoot> {
  $module: T;
  constructor(moduleRoot: T) {
    this.$module = moduleRoot;
  }
  get ctx(): T["ctx"] {
    return this.$module.ctx;
  }
  get ui(): T["ctx"]["ui"] {
    return this.$module.ctx.ui;
  }
  get state(): T["state"] {
    return this.$module.state;
  }
  get http(): T["http"] {
    return this.$module.http;
  }
}
