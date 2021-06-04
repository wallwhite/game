import { Vec2 as Vector2 } from '@jingwood/graphics-math';
import {
    RectangleShape,
    ImageShape,
    TexturesLoader,
    LineShape,
    findLineIntersectCirclePoint,
    findPointIntersectCircle,
    Line,
} from '../core';
import {
    slingWidth,
    slingHeight,
    slingTextures,
    initialRubberBackPos,
    maxStrengthRadius,
    initialRubberFrontPos,
    GAME_MEDIATOR_EVENTS,
} from '../../../constants';

export default class Sling extends RectangleShape {
    constructor() {
        super();

        this.size.set(slingWidth, slingHeight);

        this.style.fillColor = 'transparent';
        this.style.strokeColor = 'transparent';

        this.gameMediator = null;
    }

    get dpr() {
        return this.gameMediator?.dpr ?? 1;
    }

    get slingX() {
        const { width } = document.body.getBoundingClientRect();

        return (width * this.dpr) / 2 - slingWidth - (width * this.dpr - this?.map?.x ?? 0);
    }

    get slingY() {
        const { height } = document.body.getBoundingClientRect();
        const groundJutting = height * this.dpr * 0.2;
        const groundHeight = 1000 * this.dpr;
        const groundY = (height + groundJutting) * this.dpr;
        const dx = groundY - groundHeight / 2;

        return dx - (this.height * this.dpr) / 2 - 10 * this.dpr;
    }

    get defaultCharY() {
        return this.slingY - 50 * this.dpr;
    }

    get start() {
        return this.rubberBandBack.start;
    }

    get end() {
        return this.rubberBandBack.end;
    }

    get map() {
        return this.gameMediator?.map ?? {};
    }

    get isThrown() {
        return this.gameMediator?.isThrown ?? false;
    }

    get character() {
        return this.gameMediator?.character ?? {};
    }

    setMediator = mediator => {
        this.gameMediator = mediator;
    };

    setDefaultPosition = () => {
        this.origin.set(this.slingX, this.slingY);

        this.character.setPosition(this.slingX, this.slingY);
    };

    initEventHandlers() {
        document.addEventListener('mousedown', this.handleMouseDown);
        document.addEventListener('mouseup', this.handleMouseUp);
    }

    init = () => {
        this.texturesLoader = new TexturesLoader(slingTextures, this.setup);
    };

    setup = () => {
        if (!this.gameMediator) return;

        this.setupRubberBandBack();
        this.setupRubberBandFront();
        this.setupSlingFront();
        this.setupSlingBack();
        this.setDefaultPosition();
        this.initEventHandlers();

        this.gameMediator.notify(GAME_MEDIATOR_EVENTS.SLING_READY);
    };

    setupSlingBack = () => {
        const { slingBack } = this.texturesLoader.textures;

        this.texture = new ImageShape(slingBack);
        this.texture.origin.set(0, 0);
        this.texture.size = this.size;
        this.scale = { x: this.dpr, y: this.dpr };
        this.add(this.texture);
    };

    setupSlingFront = () => {
        const { slingFront } = this.texturesLoader.textures;

        this.texture = new ImageShape(slingFront);
        this.texture.origin.set(0, 0);
        this.texture.size = this.size;

        this.add(this.texture);
    };

    setupRubberBandBack() {
        this.rubberBandBack = new LineShape(...initialRubberBackPos);
        this.rubberBandBack.style.strokeWidth = 5;
        this.rubberBandBack.style.strokeColor = '#301708';

        this.add(this.rubberBandBack);
    }

    setupRubberBandFront() {
        this.rubberBandFront = new LineShape(...initialRubberFrontPos);
        this.rubberBandFront.style.strokeWidth = 5;
        this.rubberBandFront.style.strokeColor = '#301708';

        this.add(this.rubberBandFront);
    }

    updateSling() {
        this.origin.set(this.slingX, this.slingY);
    }

    rubberToDefault = () => {
        this.rubberBandBack.line.set(...initialRubberBackPos);
        this.rubberBandFront.line.set(...initialRubberFrontPos);
    };

    handleMouseDown = e => {
        if (!this.rubberBandBack) return;

        const x = e.clientX * this.dpr;
        const y = e.clientY * this.dpr;

        const vx = x - this.slingX;
        const vy = y - this.slingY;

        const newEndVector = new Vector2(vx, vy);
        const isIntersect = findPointIntersectCircle(
            this.rubberBandBack.start,
            maxStrengthRadius * this.dpr,
            newEndVector,
        );

        if (!isIntersect || this.isThrown) return;

        const angle = Vector2.angleOf(newEndVector, this.rubberBandBack.start);

        this.setRubberEnd(vx, vy);
        this.character.setPosition(x, y, angle);
        document.addEventListener('mousemove', this.handleMouseMove);
    };

    handleMouseUp = () => {
        document.removeEventListener('mousemove', this.handleMouseMove);
    };

    handleMouseMove = e => {
        e.stopPropagation();
        e.preventDefault();

        const x = e.clientX * this.dpr;
        const y = e.clientY * this.dpr;

        this.moveRubber(x, y);
    };

    moveRubber = (x, y) => {
        const vx = x - this.slingX;
        const vy = y - this.slingY;

        const newEndVector = new Vector2(vx, vy);
        const { start } = this.rubberBandBack.line;
        const virtualNewLine = new Line(start.x, start.y, newEndVector.x, newEndVector.y);

        if (virtualNewLine.length > maxStrengthRadius) {
            const vecIntersects = findLineIntersectCirclePoint(
                this.rubberBandBack.start,
                maxStrengthRadius,
                newEndVector,
            );

            const angle = Vector2.angleOf(vecIntersects, this.rubberBandBack.start);

            this.character.setPosition(vecIntersects.x * this.dpr + this.x, vecIntersects.y * this.dpr + this.y, angle);
            this.setRubberEnd(vecIntersects.x, vecIntersects.y);

            return;
        }
        const angle = Vector2.angleOf(newEndVector, this.rubberBandBack.start);

        this.character.setPosition(x, y, angle);
        this.setRubberEnd(vx, vy);
    };

    setRubberEnd = (x, y) => {
        this.rubberBandBack.end = { x, y };
        this.rubberBandFront.end = { x, y };
    };
}
