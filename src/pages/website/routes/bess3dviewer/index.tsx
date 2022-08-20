import { useBessViewer } from "@/queenjs/bess3d/useGltfViewer";
import { defineComponent } from "vue";
import { css } from "@linaria/core";
import { useCtx } from "../../context";

export default defineComponent({
    setup(props){   
        const {canvasRef, app} = useBessViewer();

        const {UIRoot} = useCtx();

        app.afterInit(async ()=>{
            UIRoot.showLoading("模型加载中");

            await app.loadGltf("//sku3d-test.obs.cn-east-3.myhuaweicloud.com/bess/glb/DamagedHelmet.glb");
            
            UIRoot.hideLoading();
        })

        return ()=><div class={viewerStyle}>
            <canvas ref={canvasRef} />
        </div>
    }
})

const viewerStyle = css`
    width: 100vw;
    height: 100vh;
    overflow: hidden;

    canvas {
        width: 100vw;
        height: 100vh;
    }
`;
