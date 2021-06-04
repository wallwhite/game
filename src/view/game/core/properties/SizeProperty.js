/* eslint-disable no-param-reassign */
import { Size } from '../utils';

class SizeProperty extends Size {
    constructor(obj, width = 0, height = 0) {
        super();
        this.obj = obj;

        this._width = width;
        this._height = height;
    }

    get width() {
        return this._width;
    }

    set width(v) {
        if (this.obj && v < this.obj.minSize.width) v = this.obj.minSize.width;

        if (this._width !== v) {
            this._width = v;
            this.notify();
        }
    }

    get height() {
        return this._height;
    }

    set height(v) {
        if (this.obj) if (v < this.obj.minSize.height) v = this.obj.minSize.height;

        if (this._height !== v) {
            this._height = v;
            this.notify();
        }
    }

    set(...args) {
        super.set(...args);
        this.notify();
    }

    notify() {
        if (!this.obj) return;

        this.obj._transformDirty = true;
        this.obj.update();
        if (this.obj.onsizeChanged) this.obj.onsizeChanged();
    }
}

export default SizeProperty;
