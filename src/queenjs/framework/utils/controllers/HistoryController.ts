import _, { cloneDeep } from "lodash";
import { StateRoot } from "../../extends/state";

class State extends StateRoot {
  lenth: number = 0; //操作栈的长度
  total: number = 50; //操作栈总长度
  cap: number = 100; //操作栈的容量

  opIndex: number = -1; //操作栈的指针
  saveIndex: number = -1; //保存的指针
  enable: boolean = true;

  canSave = this.computed((state) => {
    return state.opIndex != state.saveIndex;
  });
  canUndo = this.computed((state) => {
    return state.enable && state.opIndex >= 0;
  });
  canRedo = this.computed((state) => {
    return state.enable && state.opIndex + 1 < state.lenth;
  });
}

export class HistoryController {
  combine: Boolean = false;
  _group: Boolean = false;
  state = new State().reactive();
  queue: Action[] = [];
  groupQueue: Action[] = [];

  constructor(cap: number = 100) {
    this.state.cap = 2 * cap;

    //最大缓存行为个数
    this.state.total = cap;
  }

  saved() {
    this.state.saveIndex = this.state.opIndex;
  }

  record(action: Action) {
    if (!action) return;
    if (this.group) {
      this.groupQueue.push(action);
      return;
    }
    const state = this.state;
    if (!state.enable) return;
    const lastAction = this.queue[state.opIndex];

    // 同时满足[可合并状态|操作指针指向栈顶|同对象的同种操作]
    if (
      this.combine &&
      this.queue.length === state.opIndex + 1 &&
      lastAction &&
      action.name === lastAction.name &&
      action.root === lastAction.root
    ) {
      lastAction.value = action.value;
      return;
    }

    let index = state.opIndex + 1;
    if (index >= state.cap) {
      //大于容量了
      this.queue = this.queue.slice(state.total);
      index = this.state.total;
    }

    this.state.opIndex = index;
    this.queue[index] = action;
    this.state.lenth = index + 1;

    if (this.queue.length > index + 1) {
      //丢掉回退的部分操作
      this.queue.splice(index + 1, this.queue.length - index - 1);
    }
  }

  undo() {
    const state = this.state;
    if (!state.enable) return;

    if (state.opIndex < 0) return; //已经退到第一步了

    const action = this.queue[state.opIndex];
    action.undo();

    state.opIndex = state.opIndex - 1;
  }

  redo() {
    const state = this.state;
    if (!state.enable) return;

    if (state.opIndex >= this.queue.length - 1) return; //已经是最后一步操作了

    const action = this.queue[state.opIndex + 1];
    action.redo();

    state.opIndex = state.opIndex + 1;
  }

  get group() {
    return this._group;
  }
  set group(state) {
    this._group = state;
    if (!state) {
      this.record(new GroupAction(this.groupQueue) as any);
    } else {
      this.groupQueue = [];
    }
  }

  removeHead() {
    const state = this.state;
    if (state.opIndex > 0) {
      state.opIndex = state.opIndex - 1;
      this.queue.splice(this.queue.length - 1, 1);
    }
  }

  //清除操作
  clear() {
    const len = this.state.opIndex - this.state.saveIndex;
    if (len !== 0) {
      Array.from({ length: Math.abs(len) }).forEach(() => {
        len > 0 ? this.undo() : this.redo();
      });
    }
    this.queue = [];
    this.state.opIndex = -1;
    this.state.lenth = 0;
    this.state.saveIndex = -1;
  }
}

class Action {
  name: string;
  root: any;
  value: any;
  valueOld: any;

  constructor(root: any, name: string, value?: any) {
    const [, path] = name.split(":");
    this.name = name;
    this.root = root;
    this.valueOld = _.get(root, path.split("."));
    this.value = value;
  }

  async redo() {
    this._action("redo", this.value);
  }

  async undo() {
    this._action("undo", this.valueOld);
  }

  _action(actionType: "redo" | "undo", value: any) {
    const [, type, , , parentPath = "", attrName = ""] = this.name.match(
      /^(.+):(((.+)\.)?(.+))?$/
    );
    let paths: string | string[] = parentPath.split(".");
    if (type == "add" && attrName) {
      if (parentPath) {
        paths.push(attrName);
      } else {
        paths = attrName;
      }
    }
    const parent = _.get(this.root, paths) || this.root;
    switch (type) {
      case "add":
        if (actionType === "redo") {
          parent.push(value);
        } else {
          parent.pop();
        }
        break;
      case "set":
        parent[attrName] = value;
        break;
      case "remove":
        if (parent instanceof Array) {
          if (actionType === "redo") {
            parent.splice(+attrName, 1);
          } else {
            parent.splice(+attrName, 0, value);
          }
        } else {
          if (actionType === "redo") {
            delete parent[attrName];
          } else {
            parent[attrName] = value;
          }
        }
        break;
    }
  }
}

class GroupAction {
  group: Action[];
  constructor(group: Action[]) {
    this.group = group;
  }
  undo() {
    this.group.reverse().forEach((d) => d.undo());
  }
  redo() {
    this.group.forEach((d) => d.redo());
  }
}

export class OperationController {
  op: (type: "add" | "set" | "remove", path: string, value?: any) => void;
  constructor(root: () => any, history: () => HistoryController) {
    this.op = (type, path, value) => {
      const action = new Action(root(), `${type}:${path}`, cloneDeep(value));
      history().record(action);
      action.redo();
    };
  }
  add(path: string, value: any) {
    this.op("add", path, value);
  }
  set(path: string, value: any) {
    this.op("set", path, value);
  }
  remove(path: string) {
    this.op("remove", path);
  }
}

type Fn = () => any;
export class HistoryAction<T extends { [name: string]: any }> {
  op: (p: keyof T | Object | Fn) => OperationController;
  history = new HistoryController(50);

  constructor(state: T) {
    this.op = (path) => {
      let getPath;
      if (path instanceof Function) {
        getPath = path;
      } else if (path instanceof Object) {
        getPath = () => path;
      } else {
        getPath = () => state[path];
      }
      return new OperationController(getPath, () => this.history);
    };
  }
}