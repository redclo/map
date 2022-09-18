export class ScrollInputController {
    _windowHeight = window.innerHeight;
    _scrollHeight = 0;
    _scroll = 0;
    _previousScroll = 0;
    _targetScroll = 0;
    _ease = 0.05;

    constructor(ease:number = 0.05) {
        this._windowHeight = window.innerHeight;
        this._scrollHeight = this._getScrollHeight();
        this._scroll = this._getScroll();
        this._previousScroll = this._scroll;
        this._targetScroll = Math.min(1, this._scroll);
        this._ease = ease;
    }

    _getScrollHeight () {
        return document.documentElement.scrollHeight || document.body.scrollHeight;
    }
    _getScroll() {
        return (document.documentElement.scrollTop || document.body.scrollTop) / (this._scrollHeight - this._windowHeight) || 0;
    }
    resize () {
        this._windowHeight = window.innerHeight;
        this._scrollHeight = this._getScrollHeight();
    }
    update() {
        this._targetScroll = this._getScroll();
        this._previousScroll = this._scroll;
        this._scroll += (this._targetScroll - this._scroll) * this._ease;
    }

    get progress () {
        return this._scroll;
    }

    get reversed() {
        return this._scroll < this._previousScroll;
    }
}