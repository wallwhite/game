import { ImageShape, TexturesLoader, RectangleShape } from '../core';
import { GAME_MEDIATOR_EVENTS, backgroundTextures } from '../../../constants';

class Background extends RectangleShape {
    constructor() {
        super();

        this.bgMain = null;
        this.bgForeground = null;
        this.gameMediator = null;
        this.texturesLoader = null;
    }

    init = () => {
        this.texturesLoader = new TexturesLoader(backgroundTextures, this.setup);
    };

    setup = () => {
        if (!this.gameMediator) return;

        const { bg1, bg2 } = this.texturesLoader.textures;

        this.bgMain = new ImageShape(bg1);
        this.bgForeground = new ImageShape(bg2);

        this.setBgDefaultPosition();

        this.add(this.bgMain);
        this.add(this.bgForeground);

        this.gameMediator.notify(GAME_MEDIATOR_EVENTS.BG_READY);
    };

    setPosition = xPosition => {
        this.bgMain.x -= xPosition * 0.8;
        this.bgForeground.x -= xPosition * 1.2;
    };

    setMediator = mediator => {
        this.gameMediator = mediator;
    };

    setBgDefaultPosition = () => {
        if (!this.gameMediator) return;

        const { dpr } = this.gameMediator;

        const { width, height } = document.body.getBoundingClientRect();
        const bgWidth = 2 * width * 1.2 * dpr;
        const bgHeight = height * dpr;

        this.bgForeground.size.set(bgWidth, bgHeight);
        this.bgForeground.origin.set(width, bgHeight / 2);
        this.bgForeground.scale = { x: 1.2, y: 1.2 };
        this.bgMain.size.set(bgWidth, bgHeight);
        this.bgMain.origin.set(width / 2, bgHeight / 2);
        this.bgMain.scale = { x: 1.2, y: 1.2 };
    };
}

export default Background;
