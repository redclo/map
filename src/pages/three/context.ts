import {  threeM, chapterx } from "@/modules";
import { createCtxCreator } from "@/queenjs/framework";
import { vue_adapter } from "@/queenjs/framework/adapter/vue";
import {UIRoot} from "@/queenjs/framework/extends/ui";

const modules = {
    threeM,
    UIRoot,
    chapterx
};
export const websiteCtx = createCtxCreator(modules, {
  adapter: { vue_adapter },
});

export const useCtx = websiteCtx.use;
