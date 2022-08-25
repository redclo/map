import { StateRoot } from '@/queenjs/framework';

export default class extends StateRoot {
    offsetX = 0;
    offsetY = 0;
    scale = 1.5;
    IconSize = 30;

    ContainerWidth = 0;
    ContainerHeight = 0;

    RowGridCount = 40;
    ColGridCount = 70;

    showIcons = false;
    showText = true;
    itemSize = this.computed(state => {
        return state.scale * state.IconSize;
    });

    TotalWidth = this.computed(state => {
        return state.itemSize * state.ColGridCount;
    })
    TotalHeight = this.computed(state => {
        return state.itemSize * state.RowGridCount;
    })

    TotalCounts =  this.computed(state => {
        return state.ColGridCount * state.RowGridCount;
    })
}