import { renderInstances } from "../engine";

/**
 * Description
 * @param {Object} scene
 * @returns {void}
 */
export default function scene2Update(scene) {
  renderScene(scene);
}

function renderScene(scene) {
  const { ctx, canvas, instances } = scene;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  renderInstances(ctx, instances);
}