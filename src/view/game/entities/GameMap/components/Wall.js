import { RectangleShape, SpriteItemShape } from '../../../core';

class Wall extends RectangleShape {
    constructor(textures, side) {
        super();
        this.side = side;
        this.textures = textures;
        this.gameMediator = null;
    }

    get sideMultiplier() {
        switch (this.side) {
            case 'left':
                return -1;
            case 'right':
                return 1;
            default:
                return 0;
        }
    }

    get textureSpriteXIndex() {
        switch (this.side) {
            case 'left':
                return 2;
            case 'right':
                return 0;
            default:
                return 1;
        }
    }

    setMediator = mediator => {
        this.gameMediator = mediator;
    };

    init = () => {
        if (!this.gameMediator) return;

        const { ground } = this.textures;
        const { dpr, tileSize } = this.gameMediator;

        const { width, height } = document.body.getBoundingClientRect();

        const texturePercentageShift = 25;

        const wallWidth = 1000 * dpr;
        const wallHeight = height * dpr;
        const wallX = this.sideMultiplier * (width * dpr) + (this.sideMultiplier * wallWidth) / 2;
        const wallY = wallHeight / 2;

        this.origin.set(wallX, wallY);
        this.size.set(wallWidth, wallHeight);
        this.style.fillColor = '#000';

        const countBlocks = Math.round(wallHeight / tileSize);

        for (let i = 0; i < countBlocks; i += 1) {
            const block = new SpriteItemShape(ground);
            const x = -this.sideMultiplier * (wallWidth / 2) - (tileSize / 100) * texturePercentageShift * dpr;
            const y = wallY - i * tileSize - tileSize;

            block.style.fillColor = 'transparent';

            block.origin.set(x, y);
            block.size.set(tileSize, tileSize);
            block.spriteSize = 149;
            block.xIndex = this.textureSpriteXIndex;
            block.yIndex = 1;

            this.add(block);
        }
    };
}

export default Wall;
