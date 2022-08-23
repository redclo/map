import AnimModule from "..";
import FileSaver from 'file-saver';

export default (module: AnimModule) => {

    let _canvas: HTMLCanvasElement;
    let _recorder: any = null;
    let _frames: any = [];

    return {
        initAnim5(canvas: HTMLCanvasElement, images: any[], video: any) {
            const ctx2d: CanvasRenderingContext2D = canvas.getContext("2d") as any;

            const width = 1920;
            const height = 1080;
            canvas.width = width;
            canvas.height = height;
            canvas.style.width = "100vw";
            canvas.style.height = "56.25vw";
            _canvas = canvas;
            function drawPoint(x: number, y: number) {
                // ctx2d.fillRect(x - 2, y - 2, 4, 4);
                ctx2d.beginPath();
                ctx2d.moveTo(x, y);
                ctx2d.arc(x, y, 1, 0, Math.PI * 2, true);
                ctx2d.closePath();
                ctx2d.fill();
            }

            function drawBg() {
                ctx2d.fillStyle = "black";
                ctx2d.fillRect(0, 0, width, height);
                ctx2d.fillStyle = "white";
                for (let i = 2; i < width; i = i + 8) {
                    for (let k = 2; k < height; k = k + 8) {
                        drawPoint(i, k);
                    }
                }
            }

            function draw() {
                drawBg();
                images.forEach(img => {
                    ctx2d.drawImage(img.image, img.x, img.y);
                })
            }

            draw();

            setInterval(() => {
                images.forEach(im => {
                    im.x += 1;
                })
                draw();
            }, 1000 / 10);


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
