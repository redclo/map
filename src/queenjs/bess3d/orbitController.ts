//@ts-ignore
import { Observable, merge, fromEvent } from 'rxjs';

import { map, filter, startWith, pluck, takeUntil, mergeMap, pairwise } from 'rxjs/operators';

//@ts-ignore
import normalizeWheel from 'normalize-wheel';
import { vec2 } from 'gl-matrix';



export class OrbitController {
    
    constructor() {

    }

    //@ts-ignore
    events?: ReturnType<typeof this.initEvent>;

    init(inputDomElement:any) {
        this.events = this.initEvent(inputDomElement);
    }

    initEvent(inputDomElement:any) {
        const move = fromEvent(document, 'mousemove');
        const mousedown = fromEvent(inputDomElement, 'mousedown');
        const cancelMouse = merge(fromEvent(document, 'mouseup'), fromEvent(document, 'mouseleave'));

        const mouseOrbit = mousedown.pipe(
            filter( (event:any) => event.button === 0 && event.shiftKey === false),
            mergeMap(() => move.pipe(takeUntil(cancelMouse))),
            map( (mouse:any) => ({deltaPhi: mouse.movementX, deltaTheta: mouse.movementY }))
        );

        const mousePan = mousedown.pipe(
            filter( (event:any) => event.button === 1 || event.shiftKey === true),
            mergeMap(() => move.pipe(takeUntil(cancelMouse))),
            map( (mouse:any) => ({deltaX: mouse.movementX, deltaY: mouse.movementY }))
        );

        const smbZoom = mousedown.pipe(
            filter( (event:any) => event.button === 2),
            mergeMap(() => move.pipe(takeUntil(cancelMouse))),
            map( (mouse:any) => ({deltaZoom: mouse.movementY }))
        );
        const wheelZoom = fromEvent(inputDomElement, 'wheel').pipe(
            map((wheelEvent:any) => normalizeWheel(wheelEvent)),
            map((normalizedZoom:any) => ({deltaZoom: normalizedZoom.spinY }))
        );

        inputDomElement.addEventListener('onscroll', (event:any) => event.preventDefault(), false);
        const mouseZoom = merge(smbZoom, wheelZoom);

        const touchmove = fromEvent(document, 'touchmove');
        const touchstart = fromEvent(inputDomElement, 'touchstart');
        const touchend = merge(fromEvent(inputDomElement, 'touchend'), fromEvent(inputDomElement, 'touchcancel'));
        
        const touchOrbit = touchstart.pipe(
            filter( (event:any) => event.touches.length === 1),
            mergeMap(() => touchmove.pipe(takeUntil(touchend))),
            map( (event:any) => event.touches[0]),
            pairwise(),
            //@ts-ignore
            map( ([oldTouch, newTouch]) => {
                return { 
                    deltaPhi: newTouch.pageX - oldTouch.pageX, 
                    deltaTheta: newTouch.pageY - oldTouch.pageY 
                };
            })
        );

        const touchZoom = touchstart.pipe(
            filter( (event:any) => event.touches.length === 2),
            mergeMap(() => touchmove.pipe(takeUntil(touchend))),
            map( (event:any) => {
                const pos1 = vec2.fromValues(event.touches[0].pageX, event.touches[0].pageY);
                const pos2 = vec2.fromValues(event.touches[1].pageX, event.touches[1].pageY);
                return vec2.dist(pos1, pos2);
            }),
            pairwise(),
             //@ts-ignore
            map( ([oldDist, newDist]) => ({ deltaZoom: newDist - oldDist }))
        );

        inputDomElement.addEventListener('ontouchmove', (event:any) => event.preventDefault(), false);

        const orbit = merge(mouseOrbit, touchOrbit);
        const pan = mousePan;
        const zoom = merge(mouseZoom, touchZoom);

        // disable context menu
        inputDomElement.oncontextmenu = () => false;


        return {orbit, pan, zoom};
    }


}

