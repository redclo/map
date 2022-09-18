import ChapterXModule from "..";
import {} from "three"


export default (chapterX: ChapterXModule) => {


    return {
       createTimeLine() {

        const P = il.tQ.easeOut.config(1, .6);
        
        s._timeline = new u.p8.core.Timeline({
            paused: !0,
            defaults: {
                ease: P,
                duration: 1
            }
        }),
        s._timeline.addLabel("0", .01),
        s._timeline.set(s._leftPageTrees, {
            visible: !1
        }, "0"),
        s._timeline.set(s._rightPageTrees, {
            visible: !1
        }, "0"),
        s._timeline.set(s._houses, {
            visible: !1
        }, "0"),
        s._timeline.set(s._gate, {
            visible: !1
        }, "0"),
        s._timeline.set(s._statue, {
            visible: !1
        }, "0"),
        s._timeline.set(s._butterflies, {
            visible: !1
        }, "0"),
        s._timeline.set(s._leftPageTrees, {
            visible: !0
        }, "0");
        for (let R = 0; R < s._leftPageTrees.geometry.attributes.a_appear.array.length; ++R) {
            var L;
            s._timeline.from(s._leftPageTrees.geometry.attributes.a_appear.array, (Fh(L = {}, R, 0),
            Fh(L, "onUpdate", (function() {
                s._leftPageTrees.geometry.attributes.a_appear.needsUpdate = !0
            }
            )),
            L), "<+=0.1")
        }
        s._timeline.set(s._rightPageTrees, {
            visible: !0
        }, "0");
        for (let D = 0; D < s._rightPageTrees.geometry.attributes.a_appear.array.length; ++D) {
            var I;
            s._timeline.from(s._rightPageTrees.geometry.attributes.a_appear.array, (Fh(I = {}, D, 0),
            Fh(I, "onUpdate", (function() {
                s._rightPageTrees.geometry.attributes.a_appear.needsUpdate = !0
            }
            )),
            I), "<+=0.1")
        }
        for (let O = 0; O < s._houses.length; ++O)
            s._timeline.from(s._houses[O].scale, {
                y: 0
            }, "0+=".concat(.5 + .2 * O)),
            s._timeline.from(s._houses[O].material, {
                opacity: 0
            }, "<"),
            s._timeline.set(s._houses[O], {
                visible: !0
            }, "<");
        s._timeline.from(s._gate.scale, {
            y: 0
        }, "<+=0.1"),
        s._timeline.from(s._gate.material, {
            opacity: 0,
            duration: 1.5
        }, "<"),
        s._timeline.set(s._gate, {
            visible: !0
        }, "<"),
        s._timeline.set(s._portal, {
            visible: !0
        }, "<"),
        s._timeline.from(s._statue.scale, {
            y: 0,
            duration: 1.5
        }, "0+=0.5"),
        s._timeline.from(s._statue.material, {
            opacity: 0,
            duration: 1.5
        }, "<"),
        s._timeline.from(s._water.material.uniforms.u_opacity, {
            value: 0,
            duration: 1.5
        }, "<"),
        s._timeline.set(s._statue, {
            visible: !0
        }, "<"),
        s._timeline.set(s._water, {
            visible: !0
        }, "<"),
        s._timeline.from(s._butterflies.material, {
            opacity: 0,
            duration: 2,
            ease: il.Yv.easeOut
        }, "0+=0.1"),
        s._timeline.set(s._butterflies, {
            visible: !0
        }, "<"),
        s._timeline.progress(s._timelineProgress),
        s.dispatchEvent({
            type: "ready"
        })
       }
    }
}

