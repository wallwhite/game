import { Matrix3 } from '@jingwood/graphics-math';

class Graphics {
    constructor(canvas, ctx, options) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.options = { ...options };

        this.resetDrawingStyle();

        this.currentTransform = new Matrix3().loadIdentity();
        this.transformStack = [];
    }

    resetTransform() {
        this.currentTransform.loadIdentity();

        const { a1, b1, a2, b2, a3, b3 } = this.currentTransform;

        this.transformStack = [];

        this.ctx.setTransform(a1, b1, a2, b2, a3, b3);
    }

    setTransform(t) {
        if (this.transformStack.length > 0) {
            this.transformStack = [];
        }

        this.currentTransform.copyFrom(t);

        this.ctx.setTransform(t.a1, t.b1, t.a2, t.b2, t.a3, t.b3);
    }

    resetDrawingStyle() {
        this.strokeWidth = 1;
        this.strokeColor = 'black';
        this.fillColor = 'white';
    }

    drawRect(rect, strokeWidth, strokeColor, fillColor, strokeStyle) {
        const { ctx } = this;

        if (fillColor) {
            ctx.fillStyle = fillColor;
            ctx.fillRect(rect.x, rect.y, rect.width, rect.height);
        }

        if (strokeColor && strokeWidth > 0) {
            ctx.strokeStyle = strokeColor;
            ctx.lineWidth = strokeWidth;

            if (strokeStyle) {
                switch (strokeStyle) {
                    case 'dash':
                        ctx.setLineDash([5, 2]);
                        break;
                    default:
                        break;
                }
            }

            ctx.strokeRect(rect.x, rect.y, rect.width, rect.height);

            if (strokeStyle) ctx.setLineDash([]);
        }
    }

    drawImage(...args) {
        const { ctx } = this;

        switch (args.length) {
            case 5: {
                const [image, dx, dy, dWidth, dHeight] = args;

                ctx.drawImage(image, dx, dy, dWidth, dHeight);
                break;
            }
            case 9: {
                const [image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight] = args;

                ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
                break;
            }
            default:
                break;
        }
    }

    drawLine(from, to, strokeWidth = 1, strokeColor = 'black') {
        const { ctx } = this;

        ctx.beginPath();

        if (Array.isArray(from)) {
            ctx.moveTo(from[0], from[1]);
            ctx.lineTo(to[0], to[1]);
        } else {
            ctx.moveTo(from.x, from.y);
            ctx.lineTo(to.x, to.y);
        }

        ctx.closePath();

        ctx.lineWidth = strokeWidth;
        ctx.strokeStyle = strokeColor;
        ctx.stroke();
    }

    drawLineSegments(...args) {
        return this.drawLines(...args);
    }
}

export default Graphics;
