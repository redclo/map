import { MCtx, RequestConfig } from "queenjs/framework";
import { provide } from "vue";
import { useRouter } from "vue-router";
import { Bus } from "../comm/bus";
import { UIRoot } from "../extends/ui";
// import { uploader } from "../utils";

export function createCtxCreator<M extends { [name: string]: any }>(
  modules: M,
  ctxOption: {
    adapter: any;
    onCtxInit?: (ctx: MCtx<M>) => Promise<boolean>;
    onCtxReady?: (ctx: MCtx<M>) => Promise<any>;
  }
) {
  const ctx: any = {
    bus: new Bus(),
    options: {
      moduleConfig: {},
    },
  };

  return {
    setConfig(config: {
      [name in keyof M]?: Partial<InstanceType<M[name]>["options"]>;
    }) {
      ctx.options.moduleConfig = config;
    },
    setHttpConfig(config: RequestConfig) {
      ctx.options.httpConfig = config;
      // uploader.requestConfig = config;
    },

    async create() {
      provide("QueenContext", ctx);

      // 注册适配器
      for (const name in ctxOption?.adapter) {
        ctxOption?.adapter[name](ctx);
      }

      // 实例化默认模块
      ctx.router = useRouter();
      ctx.ui = new UIRoot(ctx);

      // 实例化自定义能模块
      for (const moduleName in modules) {
        ctx[moduleName] = new modules[moduleName](
          ctx,
          Object.assign({httpConfig: ctx.options.httpConfig}, ctx.options.moduleConfig[moduleName])
        );
      }

      //初始化上下文
      if (ctxOption?.onCtxInit) {
        const ok = await ctxOption.onCtxInit(ctx);
        if (!ok) {
          return null;
        }
      }

      // 初始化各模块
      for (const name in ctx) {
        const item = ctx[name];
        if (["bus", "options", "router"].indexOf(name) === -1) {
          item.emit(
            "init",
            Object.assign(item.options || {}, ctx.options.moduleConfig[name])
          );
        }
      }

      ctx.options.moduleConfig = null;

      //上下文准备就绪
      if (ctxOption?.onCtxReady) {
        return ctxOption.onCtxReady(ctx);
      }
      return ctx as MCtx<M>;
    },
    use() {
      return ctx as MCtx<M>;
    },
  };
}
