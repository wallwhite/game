import { getPixelRatio } from '../../../../utils';
import Graphics from './graphics';

class Renderer {
    constructor(options) {
        this.options = options;
        this.renderSize = { width: 0, height: 0 };

        if (this.options.canvasInstance) {
            this.canvas = this.options.canvasInstance;
        } else {
            throw Error(`Canvas not found: ${this.options.canvasId}`);
        }
        const canvasResizeCheck = () => {
            const pixelRatio = getPixelRatio(this.canvas.getContext('2d'));

            const { width, height } = document.body.getBoundingClientRect();

            if (width * pixelRatio !== this.renderSize.width || height * pixelRatio !== this.renderSize.height) {
                this.resetViewport();
                if (this.currentScene) {
                    this.currentScene.requestUpdateFrame();
                }
            }
        };

        window.addEventListener('resize', canvasResizeCheck);

        this.ctx = this.canvas.getContext('2d');

        if (!this.ctx) {
            throw Error("Can't get context 2d");
        }

        this.graphics = new Graphics(this.canvas, this.ctx, this.options);

        this.resetViewport();

        this.canvas.tabIndex = 0;

        this.canvas.focus();

        this.render();
    }

    resetViewport() {
        const { width, height } = document.body.getBoundingClientRect();
        const pixelRatio = getPixelRatio(this.canvas.getContext('2d'));

        this.canvas.width = width * pixelRatio;
        this.canvas.height = height * pixelRatio;

        this.renderSize.width = this.canvas.width;
        this.renderSize.height = this.canvas.height;

        this.canvas.style.width = `${width}px`;
        this.canvas.style.height = `${height}px`;
    }

    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    show(scene) {
        if (this.currentScene) this.currentScene.onHide();

        if (this.currentScene !== scene) {
            this.currentScene = scene;
            // eslint-disable-next-line no-param-reassign
            scene.renderer = this;
            scene.requestUpdateFrame();
        }
    }

    render() {
        if (!this.currentScene) return;
        this.clear();
        this.currentScene.render(this.graphics);
    }
}

export default Renderer;
