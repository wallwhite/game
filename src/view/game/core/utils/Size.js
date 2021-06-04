import { Vec2 as Vector2 } from '@jingwood/graphics-math';

class Size {
    constructor(...args) {
        this.set(...args);
    }

    get v() {
        return this.toVector(this);
    }

    static add = s2 => new Size(this.width + s2.width, this.height + s2.height);

    static sub = (s1, s2) => new Size(s1.width - s2.width, s1.height - s2.height);

    static mul = (size, scalar) => {
        if (typeof scalar === 'object') return new Size(size.width * scalar.width, size.height * scalar.height);

        if (!Number.isNaN(scalar)) return new Size(size.width * scalar, size.height * scalar);

        return null;
    };

    static div = (size, scalar) => {
        if (typeof scalar === 'object') return new Size(size.width / scalar.width, size.height / scalar.height);

        if (!Number.isNaN(scalar)) return new Size(size.width / scalar, size.height / scalar);

        return null;
    };

    static toVector = size => new Vector2(size.width, size.height);

    set(...args) {
        switch (args.length) {
            default:
            case 0:
                this.width = 0;
                this.height = 0;
                break;

            case 1: {
                const [props] = args;

                if (typeof props === 'object') {
                    const { width, height } = props;

                    this.width = width;
                    this.height = height;
                }
                break;
            }
            case 2:
                {
                    const [width, height] = args;

                    this.width = width;
                    this.height = height;
                }
                break;
        }
    }

    clone() {
        return new Size(this.width, this.height);
    }

    add(s2) {
        return Size.add(this, s2);
    }

    sub(s2) {
        return Size.sub(this, s2);
    }

    mul(scalar) {
        return Size.mul(this, scalar);
    }

    div(scalar) {
        return Size.div(this, scalar);
    }

    toArray() {
        return [this.width, this.height];
    }
}

export default Size;
