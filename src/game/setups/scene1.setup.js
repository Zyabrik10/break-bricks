import {
  createRect,
  getCanvasAndContext,
  randInt,
  setCanvasSize,
} from "../engine";
import { gameConfiguration, scene1 } from "../globals";
import { createBall, createBrick } from "../utils";

export default function scene1Setup() {
  setupCanvas();

  const newElements = setupElements(scene1.get());

  scene1.update("instances", {
    particles: [],
    bonuses: [],
    balls: [newElements.newBall],
    bricks: newElements.bricks,
    platform: newElements.platform,
  });
}

function setupCanvas() {
  const { ctx, canvas } = getCanvasAndContext(".scene-1");

  scene1.update("ctx", ctx);
  scene1.update("canvas", canvas);

  setCanvasSize(scene1.get().canvas, innerWidth, innerHeight);
}

function setupElements(scene) {
  const { graphics } = gameConfiguration.get();
  const { type, colors } = graphics;
  const { array, paddle, background } = colors;
  const { canvas } = scene;

  const newBall = createBall((createBall) => {
    return {
      ...createBall,
      coor: {
        x: innerWidth / 2 - createBall.radius / 2,
        y: innerHeight / 2,
      },
      extra: {
        ...createBall.extra,
        type: "player",
      },
    };
  });

  const bricks = createBricks(12, 11, scene);

  const platform = createRect({
    width: 200,
    height: 10,
    toFill: type === "colors",
    fill:
      type === "colors"
        ? paddle.type === "custom"
          ? paddle.customColor
          : array[randInt(0, array.length - 1)]
        : paddle.customColor,
    extra: {
      vel: {
        x: 0,
        y: 0,
      },
      speed: 4,
      defaultSpeed: 4,
      defaultWidth: 200,
    },
  });

  platform.coor.x = innerWidth / 2 - platform.width / 2;
  platform.coor.y = innerHeight - 100;

  canvas.style.backgroundColor = type === "colors" ? "black" : background.customColor;

  return {
    newBall,
    bricks,
    platform,
  };
}

function createBricks(rows, columns, scene) {
  const { canvas } = scene;

  const bricks = [];

  const width = canvas.width / rows;
  const height = 30;

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      const x = i * width;
      const y = j * height;

      const brick = createBrick({
        width,
        height,
        x,
        y,
      });

      bricks.push(brick);
    }
  }

  return bricks;
}
