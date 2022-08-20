import axios, { AxiosRequestConfig } from "axios";
import { RequestConfig } from "queenjs/framework";

const baseReqConfig = {
  timeout: 10000,
  headers: { "Content-Type": "application/json; charset=utf-8" },
};

export function createRequestController(defReqConfig: () => RequestConfig) {
  return async function (url: string, config: RequestConfig) {
    const { originBody, handlers, prefix, ...thisConfig } = Object.assign(
      {},
      baseReqConfig,
      defReqConfig(),
      config,
      { url }
    );

    if (prefix) {
      thisConfig.url = prefix + thisConfig.url;
    }

    if (handlers?.request) {
      thisConfig.transformRequest = handlers.request;
    }

    let response: any;
    try {
      response = (await axios(thisConfig)).data;
      if (originBody) {
        response = {
          errorNo: 200,
          errorDesc: "",
          result: response,
        };
      }
    } catch (error: any) {
      response = {
        errorNo: 400,
        errorDesc: error.toString(),
      };
    }

    if (handlers?.response) {
      return handlers?.response(response);
    }

    return response;
  };
}

export function createRequestHandlers(
  handlers: {
    request?: (req: AxiosRequestConfig) => void;
    response?: (res: any) => any;
  }[]
) {
  return {
    request: handlers.map(({ request }) => {
      return function () {
        //@ts-ignore
        const req = this;
        //@ts-ignore
        request?.(req);
        return JSON.stringify(req.data);
      };
    }),
    response: (res: any) => {
      handlers.forEach(({ response }) => {
        res = response?.(res) || res;
      });
      return res;
    },
  };
}
