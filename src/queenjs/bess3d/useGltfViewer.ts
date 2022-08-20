import { ref , onMounted, onBeforeUnmount} from "vue";
import { Bess3dApp } from "./application";


export  function useBessViewer() {
    const canvasRef = ref<HTMLCanvasElement>();
    const app = new Bess3dApp();

    onMounted(() => {
        app.initCanvas(canvasRef.value);
    });
      
    onBeforeUnmount(() => {
        app.destory();
    });

    return {canvasRef, app}
}