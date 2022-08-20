import { ModuleHttp } from '@/queenjs/framework';
import { createRequestHandlers } from '@/queenjs/framework/utils';

export default class extends ModuleHttp {
  requestConfig = {
    baseURL: 'http://192.168.110.185:7902/dadong',
    handlers: createRequestHandlers([{
      request: (req) => {
        console.log(req);
      },
      response: (res) => {
        console.log(res);
      },
    }]),
  };
  getUserInfo() {
    return this.request('/category/list', { method: 'GET', data: { xx: 11 } });
  }
}
