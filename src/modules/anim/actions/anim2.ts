import AnimModule from "..";
import FileSaver from 'file-saver';


export default (module: AnimModule) => {

    let _canvas: HTMLCanvasElement;
    let _recorder: any = null;
    let _frames: any = [];

    const target = "http://www.web1.reality"
    const roadLen = target.length + 3;

    let jumpers: {chars:string, head: number, delay: number, startTick: number, fill:-1}[] = [
        {chars:".", head: roadLen, delay: 0, startTick: 0, fill: -1}
    ];

    let currTick = 0;
    let filled = -1;

    return {
        anim2UpdateJumper( arr: any[]) {
            let currOffset = 0;
            arr.forEach((item,index)=>{
                item.startTick = currOffset + item.delay;

                currOffset += (item.delay + item.chars.length);
            })
            
            arr.forEach(item=>{
                item.head = roadLen;
            });
            jumpers = arr;
            currTick = 0;
            filled = -1
        },

        initAnim2(canvas: HTMLCanvasElement) {
            const ctx2d: CanvasRenderingContext2D = canvas.getContext("2d") as any;

            const width = 1920;
            const height = 1080;
            canvas.width = width;
            canvas.height = height;
            canvas.style.width = "100vw";
            canvas.style.height = "56.25vw";
            _canvas = canvas;

            // ..()___.•+*& 
            //计算tick

            const roadFlag = [];
            for(let i=0; i<roadLen; i++) roadFlag[i]=0;

            function draw() {
                //绘制道路
            }
          
            let i = 0;
           
          
            let roadChars = [];
            ctx2d.fillStyle="#FFFFFF";
            ctx2d.font = 'bold 20px Arial';
            

            setInterval(() => {
                currTick +=1;

                const jumperSize = jumpers.length;
                const jumperLen = jumpers.length;
                const lastJumper = jumpers[jumpers.length-1];

                roadChars = [];
                roadChars.length = roadLen;
                for(i=0; i<jumperSize; i++ ) {
                    const jump = jumpers[i];
                    if (jump.startTick <= currTick) {//
                        jump.head = jump.head - 1;
                        for(let k=0; k<jump.chars.length; k++) {
                            const off = k + jump.head;
                            if ( off >=0 && off< roadLen) {
                                roadChars[off]=jump.chars[k]
                                if (jump.fill == k && off == (filled+1) ) { //
                                    filled +=1;
                                }
                            }                            
                        }
                    }
                }

                if (lastJumper.head < -lastJumper.chars.length) { //重置所有jumper
                    currTick = 0;
                    for(i=0; i<jumperLen; i++ ) {
                        jumpers[i].head = roadLen-1;
                    }
                }
                if (filled >= target.length) {
                    filled = target.length-1;
                }

                ctx2d.clearRect(0, 0, width, height)
                for(i=0; i<roadLen; i++) {
                    if (i<=filled) {
                        ctx2d.fillText(target[i], 100 + i*15, 100);
                        continue;
                    }
                    if (roadChars[i] != undefined) {
                        ctx2d.fillText(roadChars[i], 100 + i*15, 100);
                        continue;
                    } 
                    ctx2d.fillText(",", 100 + i*15, 100);
                }

                if (filled == target.length-1) {
                    filled = -1
                }
                // draw();
            }, 1000 / 21);

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
