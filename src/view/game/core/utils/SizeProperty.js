class SizeProperty {
    constructor(rect) {
        if (!rect) throw Error('Must specify an instance of rect type');
    }

    set(width, height) {
        this.rect.width = width;
        this.rect.height = height;
    }

    get width() {
        return this.rect.width;
    }

    set width(v) {
        this.rect.width = v;
    }

    get height() {
        return this.rect.height;
    }

    set height(v) {
        this.rect.height = v;
    }
}

export default SizeProperty;
