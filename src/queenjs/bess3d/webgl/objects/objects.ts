export class Point2d {
    x = 0;
    y = 0;
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}
export class Polygon2d {
    Close2dPoints: Point2d[] = []
}