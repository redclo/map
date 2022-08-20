import { createModuleEffect } from "queenjs/framework";

export default createModuleEffect((ctx, effect) => {
  const { state } = ctx.user;
  const projEff = effect(() => state.userInfo)
    .item(
      (item) => item.avatar,
      (item) => {

      }
    )
    .item(
      (item) => [item.avatar, item.projects],
      (item) => {
          
      }
    )
    .run();
});
