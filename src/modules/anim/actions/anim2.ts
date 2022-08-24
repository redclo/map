import AnimModule from "..";
import FileSaver from 'file-saver';

export default (module: AnimModule) => {

    let _canvas: HTMLCanvasElement;
    let _recorder: any = null;
    let _frames: any = [];

    return {
        initAnim2(canvas: HTMLCanvasElement) {
            const ctx2d: CanvasRenderingContext2D = canvas.getContext("2d") as any;

            const width = 1920;
            const height = 1080;
            canvas.width = width;
            canvas.height = height;
            canvas.style.width = "100vw";
            canvas.style.height = "56.25vw";
            _canvas = canvas;


            function draw() {
                
            }

            setInterval(() => {
              
                draw();
            }, 1000 / 24);

            //@ts-ignore
            const stream = _canvas.captureStream();
            //@ts-ignore
            _recorder = new MediaRecorder(stream, { mimeType: 'video/webm' });

            _frames = [];
            _recorder.ondataavailable = function (event: any) {
                if (event.data && event.data.size) {
                    _frames.push(event.data);
                }
            };
            _recorder.onstop = () => {
                //const url = URL.createObjectURL(new Blob(frames, { type: 'video/webm' }));
                // video.src = url;
                // video.play();
                module.state.recording = false;
                FileSaver.saveAs(new Blob(_frames, { type: 'video/webm' }), "anim5.webm");
            };
        },

        startRecord5() {
            module.state.recording = true;
            _recorder.start();
        },

        stopRecord5() {
            _recorder?.stop();
        },

        resetAnim5() {
            _frames = [];

        }
    }
};
