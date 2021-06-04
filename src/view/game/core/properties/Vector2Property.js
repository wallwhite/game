import { Vec2 as Vector2 } from '@jingwood/graphics-math';

class Vector2Property extends Vector2 {
    changeCallback = () => {};

    constructor(obj, x = 0, y = 0, changeCallback) {
        super();
        this.obj = obj;

        this._x = x;
        this._y = y;
        if (changeCallback) this.changeCallback = changeCallback;
    }

    get x() {
        return this._x;
    }

    set x(v) {
        if (this._x !== v) {
            this._x = v;
            this.notify();
        }
    }

    get y() {
        return this._y;
    }

    set y(v) {
        if (this._y !== v) {
            this._y = v;
            this.notify();
        }
    }

    notify() {
        if (this.obj) {
            this.obj._transformDirty = true;
            this.obj.update();
            this.changeCallback();
        }
    }

    set(...args) {
        switch (args.length) {
            case 1: {
                const [pos] = args;

                if (pos) {
                    this._x = pos.x;
                    this._y = pos.y;
                }
                break;
            }
            case 2: {
                const [x, y] = args;

                this._x = x;
                this._y = y;
                break;
            }
            default:
                break;
        }
        this.notify();
    }
}

export default Vector2Property;
