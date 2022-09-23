import game from "@/modules/gameMap/actions/game";
import { gsap, Back } from "gsap"

function getTimeline() {
    const t = new gsap.core.Timeline({
        paused: true,
        defaults: {
            duration: 1,
            ease: Back.easeInOut
        }
    });
    Array.from(Array(13)).forEach((function (e, n) {
        return t.addLabel("".concat(n), 1 * n)
    }
    ));
    t.set({}, {}, 13);

    if (document.documentElement.scrollTop || document.body.scrollTop) / window.innerHeight <= .12) {
    const e = this;
    this._isPlayingInTimeline = !0;
    const n = new gsap.core.Timeline({
        defaults: {
            duration: 2,
            ease: Back.easeOut
        },
        onComplete: function () {
            e._isPlayingInTimeline = !1,
                t.invalidate()
        }
    });
    n.set(this._book.forceOpenScale, {
        value: 0
    }),
        n.set(this._book.position, {
            x: 0,
            y: 2,
            z: .7
        }),
        n.set(this._book.book.rotation, {
            x: 2,
            z: -1
        }),
        n.set(this._book.rotationSpeed, {
            value: 0
        }),
        n.set(this._book.rotationScale, {
            value: 500
        }),
        n.set(this._book.forcedOriginRotation, {
            value: 1
        }),
        n.to(this._book.position, {
            x: 0,
            y: -.25,
            z: .7
        }),
        n.to(this._book.book.rotation, {
            x: -1.5,
            y: 2 * Math.PI,
            z: 0
        }, "<"),
        n.to(this._book, {
            open: 1
        }, "<"),
        n.to(this._book, {
            openMix: .9
        }, "<"),
        n.to(this._city, {
            appear: 1,
            duration: 1,
            ease: il.bJ.easeNone
        }, "<")
} else
t.set(this._book.forceOpenScale, {
    value: 0
}),
    t.set(this._book.book.rotation, {
        x: -1.5,
        y: 2 * Math.PI,
        z: 0
    }, "0"),
    t.set(this._book.position, {
        x: 0,
        y: -.25,
        z: .7
    }, "0"),
    t.set(this._book.rotationSpeed, {
        value: 0
    }, "0"),
    t.set(this._book.rotationScale, {
        value: 500
    }, "0"),
    t.set(this._book.forcedOriginRotation, {
        value: 1
    }, "0"),
    t.set(this._book, {
        open: 1
    }, "0"),
    t.set(this._book, {
        openMix: .9
    }, "0"),
    t.set(this._city, {
        appear: 1
    }, "0");
t.to(this._book.forceOpenScale, {
    value: .5
}, "0"),
    t.to(this._book.book.rotation, {
        x: -.2,
        y: 1,
        z: 0
    }, "0"),
    t.to(this._book.position, {
        x: 0,
        y: 0,
        z: 0
    }, "0"),
    t.to(this._book, {
        open: 0
    }, "0"),
    t.to(this._book, {
        openMix: 0
    }, "0"),
    t.to(this._city, {
        appear: 0,
        duration: .7
    }, "0"),
    t.to(this._book.rotationSpeed, {
        value: .01
    }, "0"),
    t.to(this._book.rotationScale, {
        value: 5e3
    }, "0"),
    t.to(this._book.forcedOriginRotation, {
        value: 0
    }, "0"),
    t.to(this._book, {
        open: 1
    }, "1"),
    t.to(this._book.book.rotation, {
        x: -1.3,
        y: 2 * Math.PI,
        z: .5
    }, "1"),
    t.to(this._book.position, {
        z: .7
    }, "1");
const i = this
    , r = function (e) {
        const n = i
            , r = {
                value: 0
            }
            , s = "2+=".concat(.2 * e);
        t.set(i._pages[e], {
            visible: !0
        }, s),
            t.to(i._pages[e].material.uniforms.u_twist, {
                value: jl(-2, 2),
                duration: 4
            }, s),
            t.to(i._pages[e].rotation, {
                x: jl(-3, 3),
                y: jl(-3, 3),
                duration: 4
            }, s),
            t.to(r, {
                value: 1,
                duration: jl(3, 4),
                onUpdate: function () {
                    n._curves[e].getPoint(r.value, n._pages[e].position),
                        n._curves[e].getTangent(r.value, iu),
                        n._pages[e].rotation.z = iu.x
                }
            }, s),
            t.set(i._pages[e], {
                visible: !1
            }, ">")
    };
t.to(this._book.position, {
    z: -1,
    duration: 2
}, "2"),
    t.to(this._book.position, {
        z: .5,
        duration: 2
    }, ">"),
    t.to(this._book, {
        open: 0,
        duration: 4
    }, "2"),
    t.to(this._book.book.rotation, {
        x: 0,
        y: 6 * Math.PI + 1,
        z: -.5,
        duration: 4
    }, "2");
for (let s = 0; s < this._curves.length; ++s)
    r(s);
const a = this
    , o = function (e) {
        const n = a
            , i = {
                value: 0
            }
            , r = "6+=".concat(.5 + .1 * e);
        t.set(a._imagePages[e], {
            visible: !0
        }, r),
            t.to(i, {
                value: 1,
                duration: 3.4,
                onUpdate: function () {
                    n._imageCurves[e].getPoint(i.value, n._imagePages[e].position),
                        n._imageCurves[e].getTangent(i.value, iu),
                        n._imagePages[e].rotation.z = iu.x,
                        n._pages[e].rotation.x = -iu.z
                }
            }, r),
            t.set(a._imagePages[e], {
                visible: !1
            }, ">")
    };
t.to(this._book.book.rotation, {
    x: -.6,
    y: 7 * Math.PI + 4.5,
    z: .6,
    duration: 2.5
}, "6");
for (let l = 0; l < this._imageCurves.length; ++l)
    o(l);
const c = this
    , h = function (e) {
        const n = c
            , i = {
                value: 0
            }
            , r = "8+=".concat(.2 * e);
        t.set(c._pages[e], {
            visible: !0
        }, r),
            t.to(c._pages[e].material.uniforms.u_twist, {
                value: jl(-2, 2),
                duration: 4
            }, r),
            t.to(c._pages[e].rotation, {
                x: jl(-3, 3),
                y: jl(-3, 3),
                duration: 4
            }, r),
            t.to(i, {
                value: 1,
                duration: jl(3, 4),
                onUpdate: function () {
                    n._curves[e].getPoint(i.value, n._pages[e].position),
                        n._curves[e].getTangent(i.value, iu),
                        n._pages[e].rotation.z = iu.x
                }
            }, r),
            t.set(c._pages[e], {
                visible: !1
            }, ">")
    };
t.to(this._book.forceOpenScale, {
    value: 0
}, "9+=0.5"),
    t.to(this._book.position, {
        z: -1,
        duration: 2
    }, "8+=0.5"),
    t.to(this._book.position, {
        z: .6,
        duration: 2
    }, ">"),
    t.to(this._book.book.rotation, {
        x: 0,
        y: 10 * Math.PI,
        z: 0,
        duration: 3.5
    }, "8+=0.5"),
    t.to(this._book, {
        open: 1,
        openMix: 1,
        duration: 3.5
    }, "8+=0.5"),
    t.to(this._book.rotationSpeed, {
        value: 0
    }, "11"),
    t.to(this._book.rotationScale, {
        value: 500
    }, "11"),
    t.to(this._book.forcedOriginRotation, {
        value: 1
    }, "11"),
    t.set(this._finalLeftPage, {
        visible: !0
    }, "11"),
    t.to(this._finalLeftPage.material.uniforms.u_opacity, {
        value: 1
    }, "11"),
    t.set(this._finalRightPage, {
        visible: !0
    }, "11"),
    t.to(this._finalRightPage.material.uniforms.u_opacity, {
        value: 1
    }, "11");
for (let d = Math.floor(this._curves.length / 2); d < this._curves.length; ++d)
    h(d);
return t
}