import { ICtx, RequestConfig } from "queenjs/framework";
import { createRequestController } from "../utils/controllers/RequestController";

export class HttpRoot {
  ctx: ICtx;
  request: ReturnType<typeof createRequestController>;
  requestConfig: RequestConfig = {};
  constructor(ctx: any, config?: { prefix?: string }) {
    this.ctx = ctx;
    this.requestConfig = { ...ctx.options.httpConfig }; //clone 一份
    config?.prefix && (this.requestConfig.prefix = config.prefix);
    this.request = createRequestController(() => this.requestConfig);
  }
  setConfig(config: RequestConfig) {
    Object.assign(this.requestConfig, config);
  }
  crud(
    prefix: string,
    type: "list" | "create" | "update" | "delete" | "detail",
    data?: any
  ) {
    const config: any = { method: "POST" };
    if (type == "list") {
      config.method = "GET";
      config.params = data;
    } else if (type == "detail") {
      config.method = "GET";
    } else {
      config.data = data;
    }
    let uri = `${prefix}/${type}`;
    if (type == "delete" || type == "detail") uri += `/${data}`;

    return this.request(uri, config);
  }
}

export class ModuleHttp {
  protected request: ReturnType<typeof createRequestController>;
  protected requestConfig: RequestConfig = {};
  ctx: ICtx;
  constructor(module: any, config?: RequestConfig) {
    this.ctx = module.ctx;
    this.requestConfig = { ...module.options?.httpConfig }; //clone 一份
    if (config) {
      Object.assign(this.requestConfig, config);
    }
    this.request = createRequestController(() => this.requestConfig);
  }
  setConfig(config: RequestConfig) {
    Object.assign(this.requestConfig, config);
  }
  crud(
    prefix: string,
    type: "list" | "create" | "update" | "delete" | "detail",
    data?: any
  ) {
    const config: any = { method: "POST" };
    if (type == "list") {
      config.method = "GET";
      config.params = data;
    } else if (type == "detail") {
      config.method = "GET";
    } else {
      config.data = data;
    }
    let uri = `${prefix}/${type}`;
    if (type == "delete" || type == "detail") uri += `/${data}`;

    return this.request(uri, config);
  }
}
