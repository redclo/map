
export const IconState = {
    Normal: 0,
    Selected: 1,
    Owned: 2,
}
export class IconItem {
    state = IconState.Normal;
    IconIndex = -1;
    constructor(iconIndex: number) {
        this.IconIndex = iconIndex;
    }
    Index = -1;
}