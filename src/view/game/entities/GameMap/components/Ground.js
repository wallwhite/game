import { RectangleShape, SpriteItemShape } from '../../../core';

class Ground extends RectangleShape {
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

        const { ground: groundTexture } = this.textures;
        const { dpr, tileSize } = this.gameMediator;

        const { width, height } = document.body.getBoundingClientRect();

        const groundOverflow = 500;
        const juttingShift = 0.2;

        const groundJutting = height * dpr * juttingShift;
        const groundWidth = (width * 2 + groundOverflow) * dpr;
        const groundHeight = 1000 * dpr;
        const groundX = 0;
        const groundY = (height + groundJutting) * dpr;

        this.origin.set(groundX, groundY);
        this.size.set(groundWidth, groundHeight);
        this.style.fillColor = '#000';

        const countBlocks = Math.round(groundWidth / tileSize);

        for (let i = 0; i < countBlocks; i += 1) {
            const block = new SpriteItemShape(groundTexture);

            let xIndex = 1;

            if (i === 0) xIndex = 2;
            if (i === countBlocks - 1) xIndex = 0;
            const x = groundWidth / 2 - i * tileSize - tileSize;
            const y = -groundHeight / 2 + 10 * dpr;

            block.origin.set(x, y);
            block.size.set(tileSize, tileSize);
            block.spriteSize = 149;
            block.xIndex = xIndex;
            block.yIndex = 0;

            this.add(block);
        }
    };
}

export default Ground;
