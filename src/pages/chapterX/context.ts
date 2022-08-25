import { anim, } from "@/modules";
import { createCtxCreator } from "@/queenjs/framework";
import { vue_adapter } from "@/queenjs/framework/adapter/vue";

const modules = {
    anim,
};
export const websiteCtx = createCtxCreator(modules, {
    adapter: { vue_adapter },
});

export const useCtx = websiteCtx.use;
