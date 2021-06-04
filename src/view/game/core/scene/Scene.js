/* eslint-disable no-param-reassign */
import { find, equals } from 'ramda';

class Scene {
    constructor() {
        this.renderer = null;
        this.objects = [];
    }

    render = g => {
        this.objects.forEach(obj => {
            if (obj) obj.render(g);
        });

        g.resetTransform();
    };

    requestUpdateFrame = () => {
        if (this.renderer) this.renderer.render();
    };

    add(...args) {
        args.forEach(arg => {
            if (Array.isArray(arg)) {
                this.add(...arg);
            } else {
                const hasSameObj = find(el => equals(arg, el))(this.objects);

                if (!hasSameObj) {
                    this.objects.push(arg);
                    arg.scene = this;
                }
            }
        });

        this.requestUpdateFrame();
    }

    remove = obj => {
        this.objects.remove(obj);
    };
}

export default Scene;
