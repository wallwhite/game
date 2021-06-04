import { Vec2 as Vector2 } from '@jingwood/graphics-math';
import { Renderer, Scene } from './core';
import GameMediator from './entities/GameMediator';
import Background from './entities/Background';
import GameMap from './entities/GameMap';
import Character from './entities/Character';
import Sling from './entities/Sling';
import { initialRubberBackPos, GAME_MEDIATOR_EVENTS } from '../../constants';

export default class Game {
    now;

    fpsInterval;

    startTime;

    now;

    then;

    elapsed;

    loopId;

    constructor(canvas, onReady, onGameOver, onChangeScore) {
        this.canvas = canvas;
        this.speed = 10;

        this.renderer = new Renderer({
            canvasInstance: canvas,
            autoResize: true,
        });

        this.map = new GameMap();
        this.bg = new Background();
        this.scene = new Scene();
        this.character = new Character();
        this.sling = new Sling();

        this.mediator = new GameMediator(
            this.canvas,
            this.scene,
            this.map,
            this.bg,
            this.character,
            this.sling,
            onReady,
            onGameOver,
            onChangeScore,
        );

        this.setup();
    }

    setup = () => {
        this.renderer.show(this.scene);

        this.startLoop();

        this.mediator.notify(GAME_MEDIATOR_EVENTS.SCENE_READY);
    };

    start = () => {
        if (!this.sling || !this.character) return;

        const [ex, ey] = initialRubberBackPos.slice(2);

        const endVectorCorrection = new Vector2(
            this.sling.end.x + ex,
            this.sling.end.y - ey === 0 ? this.sling.end.y - ey + this.sling.start.y - ey : this.sling.end.y - ey,
        );

        this.character.tossUp(this.sling.start, endVectorCorrection);
        this.sling.rubberToDefault();
    };

    pause = () => {
        if (!this.character) return;

        this.character.pause();
    };

    resume = () => {
        if (!this.character) return;

        this.character.resume();
    };

    retry = () => {
        this.map.setDefaultPosition();
        this.bg.setBgDefaultPosition();
        this.sling.setDefaultPosition();
        this.character.setDefaultProperties();
    };

    startLoop() {
        this.fpsInterval = 1000 / this.speed;
        this.then = Date.now();
        this.startTime = this.then;
        this.animate();
    }

    animate = () => {
        this.fpsInterval = 1000 / this.speed;
        if (this.loopId) window.cancelAnimationFrame(this.loopId);

        this.now = Date.now();
        this.elapsed = this.now - this.then;

        this.loopId = window.requestAnimationFrame(this.animate);

        if (this.elapsed > this.fpsInterval) {
            if (!this.character || !this.sling) return;

            this.then = this.now - (this.elapsed % this.fpsInterval);

            this.sling.updateSling();
            this.character.updateCharacterPosition();
        }
    };
}
