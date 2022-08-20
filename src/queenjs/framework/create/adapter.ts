import { Bus } from '../comm/bus';

export function createAdapter(cb: (bus: Bus) => any) {
  return (ctx: any) => {
    cb(ctx.bus);
  };
}
