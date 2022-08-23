/**
 * 裁剪空间三角形定义
 */
import { WebglModule } from "../";
import { ref, onMounted, onBeforeUnmount } from "vue";
import { AppClipSpaceDemo } from "../objects/appClipSpaceDemo";

export default function (webgl: WebglModule) {

    const ctx = webgl.ctx;

    return {
        useClipSpaceDemo(options?: any) {
            const canvasRef = ref();
            const demo = new AppClipSpaceDemo();

            onMounted(() => {
                const wctx = webgl.actions.createWebglCtx(canvasRef.value);
                if (!wctx) return;
                demo.setWebglCtx(wctx);
            });

            onBeforeUnmount(() => {
                demo.Destory();
            });
        }
    }
}