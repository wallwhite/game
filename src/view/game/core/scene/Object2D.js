import { find, equals, forEach } from 'ramda';
import { Vec2 as Vector2, Matrix3, BoundingBox2D as BBox2D } from '@jingwood/graphics-math';
import ObjectStyle from './ObjectStyle';
import { SizeProperty, Vector2Property } from '../properties';
import { clamp, Size } from '../utils';

class Object2D {
    constructor() {
        this.objects = [];
        this.style = new ObjectStyle();
        this.bbox = new BBox2D();
        this.wbbox = new BBox2D();
        this.minSize = new Size(0, 0);
        this.rotateOrigin = new Vector2();
        this.scaleOrigin = new Vector2();

        this._parent = null;
        this._scene = null;
        this._transparency = 1;
        this._origin = new Vector2Property(this, 0, 0);
        this._size = new SizeProperty(this, 1, 1);
        this._angle = 0;
        this._scale = new Vector2Property(this, 1, 1);
        this._transform = new Matrix3().loadIdentity();

        this._renderArgs = {
            transparency: 1,
        };
    }

    get parent() {
        return this._parent;
    }

    set parent(parent) {
        if (this._parent !== parent) {
            this._parent = parent;

            this.update();
        }
    }

    get scene() {
        return this._scene;
    }

    set scene(scene) {
        if (this._scene !== scene) {
            this._scene = scene;

            Object.keys(this.objects).forEach(key => {
                const child = this.objects[key];

                child.scene = scene;
            });
        }
    }

    get x() {
        return this._origin._x;
    }

    set x(originX) {
        if (this._origin._x !== originX) this._origin.x = originX;
    }

    get y() {
        return this._origin._y;
    }

    set y(v) {
        if (this._origin._y !== v) {
            this._origin.y = v;
        }
    }

    set origin(v) {
        if (this._origin.x !== v.x || this._origin.y !== v.y) {
            this._origin.set(v);
        }
    }

    get origin() {
        return this._origin;
    }

    set size(v) {
        if (this._size.width !== v.width || this._size.height !== v.height) {
            this._size.set(v);
        }
    }

    get size() {
        return this._size;
    }

    set width(v) {
        this._size.width = v;
    }

    get width() {
        return this._size.width;
    }

    set height(v) {
        this._size.height = v;
    }

    get height() {
        return this._size.height;
    }

    get angle() {
        return this._angle;
    }

    set angle(v) {
        if (this._angle !== v) {
            this._angle = v;

            this.update();
        }
    }

    get scale() {
        return this._scale;
    }

    set scale(v) {
        if (this._scale.x !== v.x || this._scale.y !== v.y) {
            this._scale.set(v);
        }
    }

    get transform() {
        return this._transform;
    }

    get transparency() {
        return this._transparency;
    }

    set transparency(v) {
        this._transparency = v;

        this._updateRenderArgs();

        Object.keys(this.objects).forEach(key => {
            const child = this.objects[key];

            child._updateRenderArgs();
        });
    }

    _updateRenderArgs() {
        if (this.parent) {
            this._renderArgs.transparency = clamp(Math.min(this._transparency, this.parent.transparency));
        } else {
            this._renderArgs.transparency = clamp(this._transparency);
        }
    }

    add(...args) {
        if (args.length <= 0) return;

        args.forEach(obj => {
            if (Array.isArray(obj)) {
                obj.forEach(child => this.add(child));
            } else {
                const hasSameObj = find(el => equals(obj, el))(this.objects);

                if (!hasSameObj) {
                    this.objects.push(obj);
                    obj.parent = this;
                    obj.scene = this.scene;
                }
            }
        });

        if (this.scene) this.scene.requestUpdateFrame();
    }

    render(g) {
        const { style } = this;

        if (style) {
            if (style.strokeWidth) g.strokeWidth = style.strokeWidth;
            if (style.strokeColor) g.strokeColor = style.strokeColor;
            if (style.fillColor) g.fillColor = style.fillColor;
        }

        if (this._renderArgs.transparency < 1) {
            g.ctx.globalAlpha = this._renderArgs.transparency;
        } else {
            g.ctx.globalAlpha = 1;
        }

        g.setTransform(this._transform);

        this.draw(g);

        g.ctx.globalAlpha = 1;
    }

    draw(g) {
        if (this.drawSelf) this.drawSelf(g);

        this.drawChildren(g);

        if (g.options.debugMode && g.options.debugOptions.showBBox) g.drawRect(this.bbox.rect, 1, 'blue');
    }

    drawChildren = g => {
        forEach(child => {
            if (child) child.render(g);
        }, this.objects);
    };

    update() {
        this.updateTransform();
        this.updateBoundingBox();
        this.updateWorldBoundingBox();
        this.updateChildren();

        if (this._scene) {
            this._scene.requestUpdateFrame();
        }
    }

    updateTransform() {
        window._updates += 1;

        this._transform.loadIdentity();
        this._transform.notIdentity = false;

        if (
            this.origin.x !== 0 ||
            this.origin.y !== 0 ||
            this.angle !== 0 ||
            this.scale.x !== 1 ||
            this.scale.y !== 1
        ) {
            this._transform.translate(this.origin.x, this.origin.y);

            this._transform.rotate(this.angle);

            if (this.scaleOrigin.x !== 0 || this.scaleOrigin.y !== 0)
                this._transform.translate(this.scaleOrigin.x, this.scaleOrigin.y);

            this._transform.scale(this.scale.x, this.scale.y);

            if (this.scaleOrigin.x !== 0 || this.scaleOrigin.y !== 0) {
                this._transform.translate(-this.scaleOrigin.x, -this.scaleOrigin.y);
            }

            this._transform.notIdentity = true;
        }

        if (this.parent) {
            this._transform.notIdentity = true;

            if (this.parent.cacheCanvas) {
                this._transform = this._transform.mul(this.parent._cacheTransform);
            } else {
                this._transform = this._transform.mul(this.parent.transform);
            }
        }
    }

    updateChildren() {
        forEach(child => {
            child.update();
        }, this.objects);
    }

    updateBoundingBox() {
        const { width, height } = this.size.mul(0.5);

        this.bbox.min.set(-width, -height);
        this.bbox.max.set(width, height);
    }

    updateWorldBoundingBox = () => {
        this.wbbox.set(this.bbox);
        this.wbbox.applyTransform(this.transform);
    };
}

export default Object2D;
