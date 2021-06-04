import Object2D from '../scene/Object2D';
import Line from '../geometry/Line';

export default class LineShape extends Object2D {
    constructor(sx, sy, ex, ey) {
        super();

        this.line = new Line(sx, sy, ex, ey);
    }

    get start() {
        return this.line.start;
    }

    set start(v) {
        this.line.start = v;
    }

    get end() {
        return this.line.end;
    }

    set end(v) {
        this.line.end = v;
    }

    drawSelf(g) {
        g.drawLine(this.line.start, this.line.end, this.style.strokeWidth, this.style.strokeColor);
    }

    updateBoundingBox() {
        this.bbox.updateFromTwoPoints(this.line.start, this.line.end);
    }
}
