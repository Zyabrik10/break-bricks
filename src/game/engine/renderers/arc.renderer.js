import { preRendering, render } from "./render.renderer";

/**
 * Render arc using instance of arc element of **_createArc_**
 * @param {CanvasRenderingContext2D} ctx
 * @param {ReturnType<typeof createArc>} instance
 * @returns {void}
 */
export default function renderArc(ctx, instance) {
  const { coor, radius, clockwise, startAngle, endAngle } = instance;

  preRendering(ctx, instance, () => {
    ctx.arc(coor.x, coor.y, radius, startAngle, endAngle, clockwise);
    render(ctx, instance);
  });
}
