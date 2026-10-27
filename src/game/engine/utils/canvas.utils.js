/**
 * Set canvas full viewport width and height
 * @param {HTMLCanvasElement} canvas
 * @returns {void}
 */
export function setCanvasFullSize(canvas) {
  canvas.height = innerHeight;
  canvas.width = innerWidth;
}

export function setCanvasSize(canvas, width, height) {
  canvas.width = width;
  canvas.height = height;
}

/**
 * Set canvas and context to object
 * @param {HTMLCanvasElement} canvas
 * @param {string} canvasSelector
 * @returns {{
 *  canvas: HTMLCanvasElement;
 *  ctx: CanvasRenderingContext2D
 * }}
 */
export function getCanvasAndContext(canvasSelector = "canvas") {
  const canvas = document.querySelector(canvasSelector);
  const ctx = canvas.getContext("2d");

  return {
    canvas,
    ctx,
  };
}