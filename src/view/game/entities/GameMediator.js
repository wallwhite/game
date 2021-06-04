import { getPixelRatio } from '../../../utils';
import { GAME_MEDIATOR_EVENTS, blocksY } from '../../../constants';

class GameMediator {
    constructor(canvas, scene, map, bg, character, sling, onGameReady, onGameOver, onChangeScore) {
        this.canvas = canvas;

        this.scene = scene;

        this.map = map;
        this.map.setMediator(this);
        this.bg = bg;
        this.bg.setMediator(this);
        this.sling = sling;
        this.sling.setMediator(this);
        this.character = character;
        this.character.setMediator(this);

        this.isThrown = false;

        this.onGameReady = onGameReady;
        this.onGameOver = onGameOver;
        this.onChangeScore = onChangeScore;
    }

    get dpr() {
        const ctx = this.canvas.getContext('2d');

        return getPixelRatio(ctx);
    }

    get tileSize() {
        const { height } = document.body.getBoundingClientRect();
        const baseSize = Math.floor(height / blocksY);

        return baseSize * this.dpr;
    }

    setIsThrown = thrown => {
        this.isThrown = thrown;
    };

    notify = (event, eventArgs = {}) => {
        switch (event) {
            case GAME_MEDIATOR_EVENTS.SCENE_READY:
                this.scene.add(this.bg);
                this.bg.init();
                break;
            case GAME_MEDIATOR_EVENTS.BG_READY:
                this.scene.add(this.map);
                this.map.init();
                break;
            case GAME_MEDIATOR_EVENTS.MAP_READY:
                this.scene.add(this.sling);
                this.sling.init();
                break;
            case GAME_MEDIATOR_EVENTS.SLING_READY:
                this.scene.add(this.character);
                this.character.init();
                break;
            case GAME_MEDIATOR_EVENTS.CHARACTER_READY:
                this.onGameReady();
                break;
            case GAME_MEDIATOR_EVENTS.GAME_OVER:
                this.onGameOver();
                break;
            case GAME_MEDIATOR_EVENTS.CHANGE_SCORE:
                this.onChangeScore(eventArgs);
                break;
            case GAME_MEDIATOR_EVENTS.GAME_READY:
            default:
                break;
        }
    };
}

export default GameMediator;
