import RectangleShape from './RectangleShape';

class SpriteItemShape extends RectangleShape {
    constructor(img) {
        super();

        this._spriteSize = 0;
        this._xIndex = 0;
        this._yIndex = 0;

        this._image = null;

        if (img) this._image = img;
    }

    get xIndex() {
        return this._xIndex;
    }

    get yIndex() {
        return this._yIndex;
    }

    get spriteSize() {
        return this._spriteSize;
    }

    set spriteSize(v) {
        if (!v) return;

        this._spriteSize = v;
    }

    set xIndex(v) {
        if (!v) return;

        this._xIndex = v;
    }

    set yIndex(v) {
        if (!v) return;

        this._yIndex = v;
    }

    get image() {
        return this._image;
    }

    set image(img) {
        this._image = img;
        this.size.set(img.width, img.height);
    }

    drawSelf(g) {
        if (this._image) {
            const sx = this._xIndex * this.spriteSize;
            const sy = this._yIndex * this.spriteSize;

            g.drawImage(
                this._image,
                sx,
                sy,
                this.spriteSize,
                this.spriteSize,
                this.rect.x,
                this.rect.y,
                this.rect.width,
                this.rect.height,
            );
        }
    }
}

export default SpriteItemShape;
