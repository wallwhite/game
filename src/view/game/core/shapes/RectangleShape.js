import Object2D from '../scene/Object2D';
import Rectangle from '../geometry/Rectangle';

class RectangleShape extends Object2D {
    constructor() {
        super();
        this.rect = new Rectangle();
    }

    update() {
        super.update();

        const { width, height } = this.size.mul(0.5);

        this.rect.set({ x: -width, y: -height, width: this.size.width, height: this.size.height });
    }

    drawSelf(g) {
        g.drawRect(
            this.rect,
            this.style.strokeWidth,
            this.style.strokeColor,
            this.style.fillColor,
            this.style.strokeStyle,
        );
    }
}

export default RectangleShape;
