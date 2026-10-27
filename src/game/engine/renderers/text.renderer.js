import { preRendering } from "./render.renderer";

/**
 * Render text using instance of text element of **_createText_**
 * @param {CanvasRenderingContext2D} ctx
 * @param {ReturnType<typeof createText>} instance
 * @returns {void}
 */
export default function renderText(ctx, instance) {
  const { coor, width, text, toFill, fill, toStroke, stroke, lineWidth } =
    instance;

  preRendering(ctx, instance, () => {
    ctx.textBaseline = "top";
    ctx.lineWidth = lineWidth;

    if (toFill) {
      ctx.fillStyle = fill;
      ctx.fillText(text, coor.x, coor.y, width);
    }

    if (toStroke) {
      ctx.strokeStyle = stroke;
      ctx.strokeText(text, coor.x, coor.y, width);
    }
  });
}
