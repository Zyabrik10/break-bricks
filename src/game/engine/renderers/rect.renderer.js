import { preRendering, render } from "./render.renderer";

/**
 * Render rect using instance of rect element of **_createRect_**
 * @param {CanvasRenderingContext2D} ctx
 * @param {ReturnType<typeof createRect>} instance
 * @returns {void}
 */
export default function renderRect(ctx, instance) {
  const { coor, width, height } = instance;

  preRendering(ctx, instance, () => {
    ctx.rect(coor.x, coor.y, width, height);

    render(ctx, instance);
  });
}
