import { Bus } from './bus';

export class CtxRoot extends Bus {
  ctx: any;
  constructor(ctx: any) {
    super();
    this.ctx = ctx;
  }
}
