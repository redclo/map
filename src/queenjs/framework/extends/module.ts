import { ICtx, RequestConfig } from "queenjs/framework";
import { Bus } from "../comm/bus";
import { ModuleHttp } from "./http";
import { StateRoot } from "./state";

type ToUnionOfFunction<T> = T extends any ? (x: T) => any : never;
type UnionToIntersection<T> = ToUnionOfFunction<T> extends (x: infer P) => any
  ? P
  : never;

export class ModuleRoot extends Bus {
  ctx: ICtx;
  http?: ModuleHttp;
  state?: ReturnType<StateRoot['reactive']>;
  options: any;
  events: any[] = [];
  effects: any[] = [];

  constructor(ctx: any, options?: any) {
    super();
    this.ctx = ctx;
    this.once("init", (options: any) => {
      this.onInit();
      this.events.forEach((event) => {
        event(ctx);
      });
      this.effects.forEach((effect) => {
        effect(ctx);
      });
    });
    this.options = options;
    this.onCreated();
  }

  protected createOptions<T>(opts: T): T & { httpConfig?: RequestConfig } {
    return Object.assign({}, opts, this.options);
  }

  protected createAction<T extends (module: this) => { [name: string]: any }>(
    acts: T[]
  ): UnionToIntersection<ReturnType<T>> {
    const actions: any = {};
    acts.forEach((act) => {
      const methods = act(this);
      Object.assign(actions, methods);
    });
    return actions;
  }

  onCreated() {}
  onInit() {}
}
