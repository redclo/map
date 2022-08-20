import { assets, user, websiteUI } from "@/modules";
import { createCtxCreator } from "@/queenjs/framework";
import { vue_adapter } from "@/queenjs/framework/adapter/vue";
import {UIRoot} from "@/queenjs/framework/extends/ui";

const modules = {
    assets,
    user,
    websiteUI,
    UIRoot,
};
export const websiteCtx = createCtxCreator(modules, {
  adapter: { vue_adapter },
});

export const useCtx = websiteCtx.use;
