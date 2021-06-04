import RectangleShape from './RectangleShape';

class SpriteAnimationShape extends RectangleShape {
    constructor(img) {
        super();

        this._spriteSizeX = 0;
        this._spriteSizeY = 0;
        this._frames = 0;
        this._xIndex = 0;

        this._image = null;

        if (img) this._image = img;
    }

    set spriteSizeX(v) {
        if (!v) return;

        this._spriteSizeX = v;
    }

    set spriteSizeY(v) {
        if (!v) return;

        this._spriteSizeY = v;
    }

    set xIndex(v) {
        if (!v) return;

        this._xIndex = v;
    }

    set frames(f) {
        if (!f) return;

        this._frames = f;
    }

    get image() {
        return this._image;
    }

    set image(img) {
        this._image = img;
        this.size.set(img.width, img.height);
    }

    startLoop = () => {
        setInterval(() => {
            const newFrameIndex = this._xIndex + 1;

            if (newFrameIndex < this._frames) {
                this._xIndex = newFrameIndex;
            } else {
                this._xIndex = 0;
            }
        }, 200);
    };

    drawSelf(g) {
        if (this._image) {
            const sx = this._xIndex * this._spriteSizeX;

            g.drawImage(
                this._image,
                sx,
                0,
                this._spriteSizeX,
                this._spriteSizeY,
                this.rect.x,
                this.rect.y,
                this.rect.width,
                this.rect.height,
            );
        }
    }
}

export default SpriteAnimationShape;
