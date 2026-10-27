import { getCanvasAndContext, setCanvasSize } from "../engine";
import { scene2 } from "../globals";

export default function scene2Setup() {
  setupCanvas();

  scene2.update("instances", {
    particles: [],
  });
}

function setupCanvas() {
  const { ctx, canvas } = getCanvasAndContext(".scene-2");

  scene2.update("ctx", ctx);
  scene2.update("canvas", canvas);

  setCanvasSize(scene2.get().canvas, innerWidth, innerHeight);
}
