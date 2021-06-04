import { subscribeToObject } from '../../../../utils';

class TexturesLoader {
    constructor(texturesPaths, onLoad) {
        this.onReady = onLoad;
        this.texturesPaths = texturesPaths;
        this.textures = {};

        const [state, stateObserver] = subscribeToObject({
            loadedTexturesCount: 0,
        });

        this.state = state;

        stateObserver.subscribe(this.handleChangeState);

        this.loadImages();
    }

    get isReady() {
        return this.loadedCount === Object.keys(this.texturesPaths).length;
    }

    get loadedCount() {
        const { loadedTexturesCount } = this.state;

        return loadedTexturesCount;
    }

    loadImages = () => {
        Object.keys(this.texturesPaths).forEach(key => {
            const img = new Image();

            img.onload = this.onLoadSingle;
            img.src = this.texturesPaths[key];
            this.textures[key] = img;
        });
    };

    handleChangeState = ({ name, oldValue }) => {
        if (this.state[name] === oldValue) return;

        switch (name) {
            case 'loadedTexturesCount':
                this.onLoadTextures();
                break;
            default:
                break;
        }
    };

    setState = state => {
        Object.keys(state).forEach(key => {
            this.state[key] = state[key];
        });
    };

    onLoadSingle = () => {
        this.setState({ loadedTexturesCount: this.loadedCount + 1 });
    };

    onLoadTextures = () => {
        if (!this.isReady) return;

        if (this.onReady) this.onReady();
    };
}

export default TexturesLoader;
