import RectangleShape from './RectangleShape';

class ImageShape extends RectangleShape {
    constructor(img) {
        super();

        this._image = null;

        if (img) this._image = img;
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
            g.drawImage(this._image, this.rect.x, this.rect.y, this.rect.width, this.rect.height);
        }
    }
}

export default ImageShape;
