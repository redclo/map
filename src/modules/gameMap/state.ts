import { StateRoot } from '@/queenjs/framework';

export default class extends StateRoot {
    offsetX = 0;
    offsetY = 0;
    scale = 1.5;
    IconSize = 60;
    pxScale = 2;

    ContainerWidth = 0;
    ContainerHeight = 0;

    RowGridCount = 40;
    ColGridCount = 70;

    showIcons = false;
    showText = true;
    showHud = true;

    isEditor = false;
    showItem = false;
    curSelItemNum = -1;

    owned: {num:number, time:number}[] = [];

    selItemX = this.computed(state => {
        if (state.curSelItemNum < 0 ) return -1;
        return Math.floor(state.curSelItemNum / state.ColGridCount);
    });

    selItemY = this.computed(state => {
        return state.curSelItemNum % state.ColGridCount;
    });

    itemSize = this.computed(state => {
        return state.scale * state.IconSize;
    });

    TotalWidth = this.computed(state => {
        return state.itemSize * state.ColGridCount;
    })
    TotalHeight = this.computed(state => {
        return state.itemSize * state.RowGridCount;
    })

    TotalCounts = this.computed(state => {
        return state.ColGridCount * state.RowGridCount;
    })
}