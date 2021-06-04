import { Vec2 as Vector2 } from '@jingwood/graphics-math';
import {
    RectangleShape,
    ImageShape,
    TexturesLoader,
    LineShape,
    SpriteAnimationShape,
    findPointIntersectCircle,
    findLineIntersectCirclePoint,
} from '../core';
import { intersectsRect } from '../core/utils';
import { roundDigits, subscribeToObject } from '../../../utils';
import { GAME_MEDIATOR_EVENTS, characterTextures, friction, drag, gravity, bounce } from '../../../constants';

export default class Character extends RectangleShape {
    startFlightX;

    startFlightY;

    constructor(...args) {
        super(...args);

        this.gameMediator = null;

        this.size.set(66, 50);
        this.style.fillColor = 'transparent';
        this.style.strokeColor = 'transparent';

        const [state, stateObserver] = subscribeToObject({
            isGameOver: false,
            isPaused: false,
            score: 0,
        });

        stateObserver.subscribe(this.handleChangeState);

        this.state = state;
    }

    get doesNotMove() {
        return !roundDigits(this.vx);
    }

    get dpr() {
        return this.gameMediator?.dpr ?? 1;
    }

    get map() {
        return this.gameMediator?.map ?? {};
    }

    get isThrown() {
        return !!this.gameMediator?.isThrown;
    }

    setMediator = mediator => {
        this.gameMediator = mediator;
    };

    init = () => {
        this.texturesLoader = new TexturesLoader(characterTextures, this.setup);
    };

    setup = () => {
        if (!this.gameMediator) return;

        const { birdIdle, birdFlight } = this.texturesLoader.textures;

        this.texture = new ImageShape(birdIdle);
        this.texture.origin.set(0, 0);
        this.texture.size = this.size;

        this.flightTexture = new SpriteAnimationShape(birdFlight);
        this.flightTexture.origin.set(0, 0);
        this.flightTexture.size = this.size;
        this.flightTexture.frames = 3;
        this.flightTexture.spriteSizeX = 150;
        this.flightTexture.spriteSizeY = 112;
        this.flightTexture.transparency = 0;
        this.flightTexture.startLoop();

        this.movementVector = new LineShape(0, 0, 150, 0);
        this.movementVector.style.strokeWidth = 5;
        this.movementVector.style.strokeColor = '#ff0000';
        this.movementVector.transparency = 0;

        this.add(this.movementVector);
        this.add(this.texture);
        this.add(this.flightTexture);

        this.setDefaultProperties();

        this.gameMediator.notify(GAME_MEDIATOR_EVENTS.CHARACTER_READY);
    };

    setDefaultProperties = () => {
        if (!this.gameMediator) return;

        this.gameMediator?.setIsThrown?.(false);

        this.isColliding = false;
        this.isInFlight = false;

        this.vx = 0;
        this.vy = 0;
        this.angle = 0;

        this.scale = { x: this.dpr, y: this.dpr };

        this.setState({
            isGameOver: false,
            score: 0,
        });
    };

    setPosition = (x, y, angle = 0) => {
        const angleScaleMultiplier = (angle > 90 && angle <= 180) || (angle >= -180 && angle < -90) ? -1 : 1;

        this.scale = { x: this.dpr, y: this.dpr * angleScaleMultiplier };
        this.origin.set(x, y);
        this.startFlightX = x;
        this.startFlightY = y;
        this.angle = angle;
    };

    setState = state => {
        Object.keys(state).forEach(key => {
            this.state[key] = state[key];
        });
    };

    pause = () => {
        if (!this.isThrown) return;

        this.setState({
            isPaused: true,
        });
    };

    resume = () => {
        if (!this.isThrown) return;

        this.setState({
            isPaused: false,
        });
    };

    handleChangeState = ({ name, oldValue }) => {
        if (this.state[name] === oldValue) return;

        switch (name) {
            case 'isGameOver':
                this.handleGameOverStateChange();
                break;
            case 'score':
                this.handleScoreStateChange();
                break;
            case 'isPaused':
                this.handlePausedStateChange();
                break;
            default:
                break;
        }
    };

    handlePausedStateChange = () => {
        const { isPaused } = this.state;

        this.movementVector.transparency = isPaused ? 1 : 0;

        if (isPaused) {
            document.addEventListener('mousedown', this.handleMouseDownInFlight);
            document.addEventListener('mouseup', this.handleMouseUpInFlight);
        } else {
            document.removeEventListener('mousedown', this.handleMouseDownInFlight);
            document.removeEventListener('mouseup', this.handleMouseUpInFlight);
        }
    };

    handleMouseDownInFlight = e => {
        e.preventDefault();
        const x = e.x * this.dpr;
        const y = e.y * this.dpr;

        const vector = new Vector2(x, y);

        const isIntersect = findPointIntersectCircle(this, 150, vector);

        if (!isIntersect) return;
        const angle = Vector2.angleOf(this, vector);

        this.angle = angle;
        document.addEventListener('mousemove', this.handleMouseMoveInFlight);
    };

    handleMouseMoveInFlight = e => {
        e.preventDefault();
        const x = e.x * this.dpr;
        const y = e.y * this.dpr;
        const vector = new Vector2(x, y);
        const vectorThis = new Vector2(this.x, this.y);
        const angle = Vector2.angleOf(this, vector);

        const vecIntersects = findLineIntersectCirclePoint(vectorThis, 20, vector);

        this.angle = angle;

        this.vx = vecIntersects.x - vectorThis.x;
        this.vy = vecIntersects.y - vectorThis.y;
    };

    handleMouseUpInFlight = () => {
        document.removeEventListener('mousemove', this.handleMouseMoveInFlight);
    };

    handleGameOverStateChange = () => {
        const { isGameOver } = this.state;

        if (!this.gameMediator || !isGameOver) return;

        this.gameMediator.notify(GAME_MEDIATOR_EVENTS.GAME_OVER);
    };

    handleScoreStateChange = () => {
        if (!this.gameMediator) return;

        const { score } = this.state;

        this.gameMediator.notify(GAME_MEDIATOR_EVENTS.CHANGE_SCORE, { score });
    };

    tossUp = (v1, v2) => {
        if (this.isThrown) return;

        this.vx = (v1.x - v2.x) / 2;
        this.vy = (v1.y - v2.y) / 2;

        this.isInFlight = true;

        this.gameMediator?.setIsThrown?.(true);
        this.flightTexture.transparency = 1;
        this.texture.transparency = 0;
    };

    collider = (wbbox1, wbbox2) => {
        const x1 = wbbox1.min.x;
        const w1 = wbbox1.width;
        const y1 = wbbox1.min.y;
        const h1 = wbbox1.height;

        const x2 = wbbox2.min.x;
        const w2 = wbbox2.width;
        const y2 = wbbox2.min.y;
        const h2 = wbbox2.height;

        const dx = x1 + w1 / 2 - (x2 + w2 / 2);
        const dy = y1 + h1 / 2 - (y2 + h2 / 2);
        const width = (w1 + w2) / 2;
        const height = (h1 + h2) / 2;
        const crossWidth = width * dy;
        const crossHeight = height * dx;

        let collision = 'none';

        if (Math.abs(dx) <= width && Math.abs(dy) <= height) {
            if (crossWidth > crossHeight) {
                collision = crossWidth > -crossHeight ? 'bottom' : 'left';
            } else {
                collision = crossWidth > -crossHeight ? 'right' : 'top';
            }
        }
        return collision;
    };

    detectCollision = (nextX, nextY) => {
        this.isColliding = false;

        if (!this.map.objects) return;

        const objectsCount = this.map.objects.length;

        if (!objectsCount) return;

        const nextFrameCharacter = new Character();

        nextFrameCharacter.size = this.size;
        nextFrameCharacter.x = nextX;
        nextFrameCharacter.y = nextY;

        for (let i = 0; i < objectsCount; i += 1) {
            const worldObject = this.map.objects[i];

            if (intersectsRect(nextFrameCharacter.wbbox, worldObject.wbbox)) {
                this.isColliding = true;

                const collider = this.collider(worldObject.wbbox, nextFrameCharacter.wbbox);
                const minY = worldObject.wbbox.min.y;
                const maxY = worldObject.wbbox.max.y;
                const minX = worldObject.wbbox.min.x;
                const maxX = worldObject.wbbox.max.x;

                switch (collider) {
                    case 'top': {
                        this.y = Math.round(maxY + this.height / 2);
                        this.vy = -this.vy * bounce;
                        this.vx *= drag * friction;

                        break;
                    }
                    case 'bottom': {
                        this.y = Math.round(minY - this.height / 2) + 1;
                        this.vy = -this.vy * bounce;
                        this.vx *= drag * friction;

                        break;
                    }
                    case 'left': {
                        this.x = Math.round(maxX + this.width / 2);
                        this.vx = -this.vx * bounce;

                        break;
                    }
                    case 'right': {
                        this.x = Math.round(minX - this.width / 2);
                        this.vx = -this.vx * bounce;

                        break;
                    }
                    default:
                        break;
                }

                this.angle = 0;

                break;
            }
        }
    };

    updateCharacterPosition = () => {
        const { isGameOver, isPaused } = this.state;

        if (isGameOver || !this.isThrown || isPaused) return;

        const newX = this.x + this.vx;
        const newY = this.y + this.vy;

        this.detectCollision(newX, newY);

        if (this.isColliding && this.doesNotMove) {
            this.flightTexture.transparency = 0;
            this.texture.transparency = 1;
            this.setState({
                isGameOver: true,
            });
            return;
        }

        if (this.isInFlight) {
            const newMap = this.map.x - this.vx * 2;

            this.gameMediator.bg.setPosition(this.vx);

            this.gameMediator.map.x = newMap;
        }

        if (!this.isColliding) {
            let angle = Math.atan2(newY - this.y, newX - this.x);

            angle = (angle * 180) / Math.PI;

            this.angle = angle;
            this.x = newX;
            this.y = newY;

            this.vx *= drag;
            this.vy = this.vy * drag + gravity;
        }

        this.setState({
            score: Math.round(Math.abs(this.startFlightX - this.x)),
        });
    };
}
