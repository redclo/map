import { ICtx } from "queenjs/framework";

export function createModuleEvent(useEvent: (ctx: ICtx) => void): Function {
  return (ctx: any) => {
    useEvent(ctx);
  };
}
