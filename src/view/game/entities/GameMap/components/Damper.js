import { RectangleShape, ImageShape } from '../../../core';

class Damper extends RectangleShape {
    constructor(textures) {
        super();
        this.textures = textures;
        this.shift = 20;
        this.xPos = 0;
        this.damperBlocksX = 5;
        this.damperBlocksY = 12;
        this.gameMediator = null;
    }

    setXPos = x => {
        this.xPos = x;
    };

    setMediator = mediator => {
        this.gameMediator = mediator;
    };

    init = () => {
        if (!this.gameMediator) return;

        const { height } = document.body.getBoundingClientRect();
        const { damper: damperTexture } = this.textures;

        const { dpr } = this.gameMediator;
        const { tileSize } = this.gameMediator;

        const damperWidth = this.damperBlocksX * tileSize;
        const damperHeight = this.damperBlocksY * tileSize;

        const yOffset = 120 * dpr;

        const damperX = this.xPos;
        const damperY = (height / 2) * dpr + yOffset;

        this.origin.set(damperX, damperY);
        this.size.set(damperWidth, damperHeight);
        this.style.fillColor = 'transparent';
        this.style.strokeColor = 'transparent';

        const textureBlock = new ImageShape(damperTexture);
        const textureShift = this.shift * dpr;

        textureBlock.origin.set(0, -textureShift / 2);
        textureBlock.size.set(damperWidth + textureShift, damperHeight + textureShift);

        this.add(textureBlock);
    };
}

export default Damper;
