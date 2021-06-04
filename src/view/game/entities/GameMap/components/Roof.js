import { RectangleShape } from '../../../core';

class Roof extends RectangleShape {
    constructor(textures) {
        super();
        this.textures = textures;
        this.gameMediator = null;
    }

    setMediator = mediator => {
        this.gameMediator = mediator;
    };

    init = () => {
        if (!this.gameMediator) return;

        const { dpr } = this.gameMediator;

        const { width } = document.body.getBoundingClientRect();

        const roofXShift = 500;
        const roofHeight = 1000 * dpr;
        const roofWidth = (width * 2 + roofXShift) * dpr;
        const roofY = roofHeight / 2;

        this.origin.set(0, -roofY);
        this.size.set(roofWidth, roofHeight);
    };
}

export default Roof;
