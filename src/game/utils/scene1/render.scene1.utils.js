import { renderInstances } from "../../engine";

export function renderScene(scene) {
  const { ctx, canvas, instances } = scene;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  renderInstances(ctx, instances);
}
