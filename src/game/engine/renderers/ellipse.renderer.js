import { preRendering, render } from "./render.renderer";

/**
 * Render ellipse using instance of ellipse element of **_createEllipse_**
 * @param {CanvasRenderingContext2D} ctx
 * @param {ReturnType<typeof createEllipse>} instance
 * @returns {void}
 */
export default function renderEllipse(ctx, instance) {
  const { coor, width, height, rotation, startAngle, endAngle } = instance;

  preRendering(ctx, instance, () => {
    ctx.ellipse(coor.x, coor.y, width, height, rotation, startAngle, endAngle);
    render(ctx, instance);
  });
}
