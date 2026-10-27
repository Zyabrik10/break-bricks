/**
 * Renders specific parts of elements.
 *
 * upf [updates per frame]
 * @param {CanvasRenderingContext2D} ctx
 * @param {{
 * toFill: boolean;
 * fill: string;
 * toStroke: boolean;
 * stroke: string;
 * toSprite: boolean;
 * sprite: {
 * image: HTMLImageElement;
 * animate: boolean;
 * framesAmount: number;
 * upf: number | undefined;
 * isFlipped: boolean;
 * isFlopped: boolean;
 *  imageOffset: { x: number, y: number };
 *  frameStartOffset: { x: number, y: number };
 *  frameOffset: { x: number, y: number };
 *  imageSizeOffset: { width: number, height: number };
 * frameWidth: number;
 * currentFrame: number;
 * frameCounter: number;
 * };
 * coor: { x: number, y: number; }
 * }} renderProps
 * @returns {void}
 */
export function render(ctx, renderProps) {
  const {
    toFill,
    fill,
    toStroke,
    stroke,
    toSprite,
    sprite,
    coor,
    alpha,
    rotate,
  } = renderProps;

  if (toFill) {
    renderFillPath(ctx, fill);
  }

  if (toStroke) {
    renderStrokePath(ctx, stroke);
  }

  if (toSprite) {
    renderSprite(ctx, { sprite, coor, alpha, rotate });
  }
}

/**
 * Renders sprite
 * @param {CanvasRenderingContext2D} ctx
 * @param {{
 * sprite: {
 * image: HTMLImageElement;
 * framesAmount: number;
 * upf: number | undefined;
 * isFlipped: boolean;
 * isFlopped: boolean;
 *  imageOffset: { x: number, y: number };
 *  frameStartOffset: { x: number, y: number };
 *  frameOffset: { x: number, y: number };
 *  imageSizeOffset: { width: number, height: number };
 * frameWidth: number;
 * currentFrame: number;
 * frameCounter: number;
 * sizeCof: number;
 * };
 * coor: { x: number, y: number; };
 * alpha: number;
 * rotate: number;
 * }} spriteProps
 * @returns {void}
 */
export function renderSprite(ctx, spriteProps) {
  const { sprite, coor } = spriteProps;

  const {
    frameWidth,
    image,
    currentFrame,
    isFlipped,
    isFlopped,
    frameStartOffset,
    imageOffset,
    frameOffset,
    sizeCof,
    imageSizeOffset,
  } = sprite;

  preRendering(ctx, spriteProps, () => {
    ctx.translate(coor.x + frameWidth / 2, coor.y + image.height / 2);
    ctx.scale(isFlipped ? -1 : 1, isFlopped ? -1 : 1);
    ctx.translate(-coor.x - frameWidth / 2, -coor.y - image.height / 2);

    ctx.drawImage(
      image,
      frameStartOffset.x + frameWidth * currentFrame,
      frameStartOffset.y,
      frameOffset.x + frameWidth,
      image.height + frameOffset.y,
      coor.x + imageOffset.x,
      coor.y + imageOffset.y,
      frameWidth * sizeCof + imageSizeOffset.width,
      image.height * sizeCof + imageSizeOffset.height,
    );
  });
}

/**
 * Renders fill path
 * @param {CanvasRenderingContext2D} ctx
 * @param {string} fill
 * @returns {void}
 */
export function renderFillPath(ctx, fill) {
  ctx.fillStyle = fill;
  ctx.fill();
}

/**
 * Renders stroke
 * @param {CanvasRenderingContext2D} ctx
 * @param {string} stroke
 * @returns {void}
 */
export function renderStrokePath(ctx, stroke) {
  ctx.strokeStyle = stroke;
  ctx.stroke();
}

export function preRendering(ctx, spriteProps, renderCallback) {
  const { alpha, angle } = spriteProps;

  ctx.beginPath();
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.rotate(angle);

  renderCallback();

  ctx.restore();
}
