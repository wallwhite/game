import { Vec2 as Vector2, BoundingBox2D as BBox2D } from '@jingwood/graphics-math';
import { SizeProperty } from '../utils';

class Rectangle {
    constructor(rectangleProps) {
        this._size = new SizeProperty(this);

        this.set(rectangleProps);
    }

    get origin() {
        return new Vector2(this.x + this.width / 2, this.y + this.height / 2);
    }

    set origin(p) {
        this.x = p.x - this.width / 2;
        this.y = p.y - this.height / 2;
    }

    get size() {
        return this._size;
    }

    set size(v) {
        this._size.set(v.width, v.height);
    }

    set(rectangleProps) {
        if (rectangleProps) {
            const { x = 0, y = 0, width = 0, height = 0 } = rectangleProps;

            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
            return;
        }

        this.x = 0;
        this.y = 0;
        this.width = 0;
        this.height = 0;
    }

    clone() {
        return new Rectangle({ x: this.x, y: this.y, width: this.width, height: this.height });
    }

    moveTo(x, y) {
        this.x = x;
        this.y = y;
    }

    offset(x, y) {
        this.x += x;
        this.y += y;
    }

    contains(pos) {
        return this.x <= pos.x && this.y <= pos.y && this.right >= pos.x && this.bottom >= pos.y;
    }

    bbox() {
        return new BBox2D(this.topLeft, this.bottomRight);
    }
}

export default Rectangle;
