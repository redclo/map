import AnimModule from "..";
import FileSaver from 'file-saver';
import { over } from "lodash";
import ctx from "@/queenjs/bess3d/webgl/actions/ctx";


export default (module: AnimModule) => {

    let _canvas: HTMLCanvasElement;
    let _recorder: any = null;
    let _frames: any = [];

    const target = "http://www.web1.reality"
    const roadLen = target.length;

    let currTick = 0;
    // let filled = -1;
    let start = false;

    return {
        
        initAnim3(canvas: HTMLCanvasElement) {
            const ctx2d: CanvasRenderingContext2D = canvas.getContext("2d") as any;

            const width = 1920;
            const height = 1080;
            canvas.width = width;
            canvas.height = height;
            canvas.style.width = "100vw";
            canvas.style.height = "56.25vw";
            _canvas = canvas;

          
            //计算tick
            ctx2d.fillStyle="#FFFFFF";
            ctx2d.font = 'normal 40px spectrum';
            const chars = "..()___.•+*&";

            let i= 0;
            let over = false;
            const totalChars = chars.length;
            
            const flags:any[] = [];
            
            setInterval(() => {

                if (!start) return;

                currTick +=1;

                
                ctx2d.clearRect(0, 0, width, height)
               
                ctx2d.fillStyle = "#002FA7"
                ctx2d.fillRect(0, 0, width, height);

                for(i=0; i<roadLen; i++) {
                    // if (i<=filled) {
                    //     ctx2d.fillText(target[i], 100 + i*15, 100);
                    //     continue;
                    // }
                    if (flags[i] != undefined) {
                        ctx2d.fillStyle="#FFFFFF";
                        ctx2d.fillText(target[i], 100 + i*30, 100);
                        continue;
                    }

                    ctx2d.fillStyle="#FFFFFF";
                    let k = Math.floor( Math.random() * totalChars );
                    if (k == totalChars) k = totalChars-1;
                    ctx2d.fillText(chars[k], 100 + i*30, 100);
                    if (over) {
                        currTick = 0;
                        over = false;
                        console.log( roadLen );

                        for (let c=0;c<4;c++) {
                            const last = [];
                            for (let m=0; m<roadLen; m++) {
                                if (!flags[m]) last.push(m);
                            }
                            let k = Math.floor( Math.random() * last.length );
                            if (k == (last.length) ) {
                                k = last.length - 1;
                            }
                            flags[ last[k] ] = 1;
                        }
                    }
                }

                if (currTick > 2) {
                    over = true;
                }
            }, 1000 / 20);

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

        startRecord3() {
            module.state.recording = true;
            _recorder.start();

            setTimeout(() => {
                start = true;
            }, 1000);
        },

        stopRecord3() {
            _recorder?.stop();
        },

        resetAnim3() {
            _frames = [];

        }
    }
};
