import { RectangleShape, TexturesLoader } from '../../core';
import { GAME_MEDIATOR_EVENTS, worldTextures } from '../../../../constants';
import { Damper, Ground, Wall, Roof } from './components';

class GameMap extends RectangleShape {
    constructor() {
        super();
        this.style.fillColor = 'transparent';
        this.style.strokeColor = 'transparent';
        this.gameMediator = null;
        this.texturesLoader = null;
    }

    init = () => {
        this.texturesLoader = new TexturesLoader(worldTextures, this.setup);
    };

    setup = () => {
        if (!this.gameMediator) return;

        this.setupRoof();
        this.setupDamper();
        this.setupLeftWall();
        this.setupRightWall();
        this.setupGround();

        this.setDefaultPosition();

        this.gameMediator.notify(GAME_MEDIATOR_EVENTS.MAP_READY);
    };

    setupDamper = () => {
        this.damper = new Damper(this.texturesLoader.textures);
        this.damper.setMediator(this.gameMediator);
        this.damper.init();

        this.add(this.damper);
    };

    setupGround = () => {
        this.ground = new Ground(this.texturesLoader.textures);
        this.ground.setMediator(this.gameMediator);
        this.ground.init();

        this.add(this.ground);
    };

    setupLeftWall = () => {
        this.leftWall = new Wall(this.texturesLoader.textures, 'left');
        this.leftWall.setMediator(this.gameMediator);
        this.leftWall.init();

        this.add(this.leftWall);
    };

    setupRightWall = () => {
        this.rightWall = new Wall(this.texturesLoader.textures, 'right');
        this.rightWall.setMediator(this.gameMediator);
        this.rightWall.init();

        this.add(this.rightWall);
    };

    setupRoof = () => {
        this.roof = new Roof();
        this.roof.setMediator(this.gameMediator);
        this.roof.init();

        this.add(this.roof);
    };

    setMediator = mediator => {
        this.gameMediator = mediator;
    };

    setDefaultPosition = () => {
        if (!this.gameMediator) return;

        const { dpr } = this.gameMediator;
        const { width, height } = document.body.getBoundingClientRect();
        const mapWidth = width * 2 * dpr;
        const mapHeight = height * 2 * dpr;
        const mapX = width * dpr;
        const mapY = 0;

        this.origin.set(mapX, mapY);
        this.size.set(mapWidth, mapHeight);
    };
}

export default GameMap;
