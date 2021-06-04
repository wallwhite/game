// @flow
export const getPixelRatio = (ctx: CanvasRenderingContext2D): number => {
    const dpr = window.devicePixelRatio || 1;
    const bsr =
        // $FlowFixMe
        ctx.webkitBackingStorePixelRatio ||
        // $FlowFixMe
        ctx.mozBackingStorePixelRatio ||
        // $FlowFixMe
        ctx.msBackingStorePixelRatio ||
        // $FlowFixMe
        ctx.oBackingStorePixelRatio ||
        // $FlowFixMe
        ctx.backingStorePixelRatio ||
        1;

    return dpr / bsr;
};
