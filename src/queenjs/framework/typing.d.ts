declare module "queenjs/framework" {
  export * from "node_modules/queenjs/framework";

  import * as modules from "@/modules";
  import { Bus, UIRoot } from "node_modules/queenjs/framework";
  import { Router } from "vue-router";
  import { AxiosRequestConfig } from "axios";

  export type RequestConfig = AxiosRequestConfig & {
    originBody?: boolean;
    prefix?: string;
    handlers?: ReturnType<typeof createRequestHandlers>;
  };

  export type MCtx<M> = {
    bus: Bus;
    ui: UIRoot;
    router: Router;
  } & {
    [name in keyof M]: InstanceType<M[name]>;
  };

  export type ICtx = MCtx<typeof modules>;
}
