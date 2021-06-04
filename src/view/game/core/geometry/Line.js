import { Vec2 as Vector2, BoundingBox2D } from '@jingwood/graphics-math';

export default class Line {
    constructor(...args) {
        this._start = new Vector2();
        this._end = new Vector2();
        this.bbox = new BoundingBox2D();

        this.set(...args);
    }

    set(...args) {
        if (!args.length) return;

        const [sx, sy, ex, ey] = args;

        this._start.set(sx, sy);
        this._end.set(ex, ey);
        this.updateBoundingBox();
    }

    get x1() {
        return this._start.x;
    }

    set x1(v) {
        this._start.x = v;
        this.updateBoundingBoxX();
    }

    get y1() {
        return this._start.y;
    }

    set y1(v) {
        this._start.y = v;
        this.updateBoundingBoxY();
    }

    get x2() {
        return this._end.x;
    }

    set x2(v) {
        this._end.x = v;
        this.updateBoundingBoxX();
    }

    get y2() {
        return this._end.y;
    }

    set y2(v) {
        this._end.y = v;
        this.updateBoundingBoxY();
    }

    get start() {
        return this._start;
    }

    set start(v) {
        this._start.set(v);
    }

    get end() {
        return this._end;
    }

    set end({ x, y }) {
        this._end.set(x, y);
    }

    get vector() {
        return Vector2.sub(this._end, this._start);
    }

    get length() {
        return this.vector.magnitude;
    }

    get angle() {
        return this.vector.angle;
    }

    updateBoundingBox() {
        this.updateBoundingBoxX();
        this.updateBoundingBoxY();
    }

    updateBoundingBoxX() {
        this.bbox.min.x = Math.min(this._start.x, this._end.x) - 1;
        this.bbox.max.x = Math.max(this._start.x, this._end.x) + 1;
    }

    updateBoundingBoxY() {
        this.bbox.min.y = Math.min(this._start.y, this._end.y) - 1;
        this.bbox.max.y = Math.max(this._start.y, this._end.y) + 1;
    }
}
