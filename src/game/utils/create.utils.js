import { createArc, createRect, createText, randInt } from "../engine";
import { bonuses, gameConfiguration } from "../globals";

export function createBall(arcPropsCallback) {
  const { graphics } = gameConfiguration.get();
  const { type, colors } = graphics;
  const { ball: ballConfiguration, array } = colors;

  const ball = createArc({
    radius: 5,
    toFill: type === "colors",
    fill:
      type === "colors"
        ? ballConfiguration.type === "custom"
          ? ballConfiguration.customColor
          : array[randInt(0, array.length - 1)]
        : ballConfiguration.customColor,
    extra: {
      firstTimePlatformHit: false,
      vel: {
        x: 0,
        y: 3,
      },
      speed: 3,
      defaultSpeed: 3,
      defaultRadius: 5,
      dead: false,
      type: "extra",
      hp: 3,
      defaultHp: 3,
      damage: 1,
      defaultDamage: 1,
      canSpawnParticles: true,
    },
    alpha: 0,
  });
  return typeof arcPropsCallback === "function" ? arcPropsCallback(ball) : ball;
}

export function createBrick({ x, y, width, height = 30 }) {
  const { graphics } = gameConfiguration.get();
  const { colors } = graphics;
  const { brick: brickConfiguration, array, brickHp } = colors;

  const hp = randInt(1, 10);

  const textInstance = createHPText({
    hp,
    width,
    height,
    x,
    y,
    strokeColor:
      brickHp.type === "custom"
        ? brickHp.customColor
        : array[randInt(0, array.length - 1)],
  });

  const brick = createRect({
    width,
    height,
    toFill: true,
    fill:
      brickConfiguration.type === "custom"
        ? brickConfiguration.customColor
        : array[randInt(0, array.length - 1)],
    x,
    y,
    extra: {
      hp: hp,
      dead: false,
    },
    instances: {
      text: textInstance,
    },
  });

  return brick;
}

function createHPText({ hp, width, height, x, y, strokeColor }) {
  const fontSize = 30;

  const font = `${fontSize}px Arial`;

  const textX = x + width / 2;
  const textY = y + height / 2;

  const textInstance = createText({
    text: hp,
    x: textX,
    y: textY,
    toStroke: true,
    stroke: strokeColor,
    font,
    lineWidth: 1.4,
  });

  return textInstance;
}

export function createBonus(scene) {
  const { graphics } = gameConfiguration.get();
  const { colors } = graphics;
  const { bonus: bonusConfiguration, array } = colors;

  const { canvas } = scene;

  const rad = randInt(10, 20);

  const randomBonus = bonuses[randInt(0, bonuses.length - 1)];

  let deleteTimeIndex = 0;

  const bonus = createArc({
    toFill: true,
    fill:
      bonusConfiguration.type === "custom"
        ? bonusConfiguration.customColor
        : array[randInt(0, array.length - 1)],
    radius: rad,
    x: randInt(rad, canvas.width - rad),
    y: randInt(rad, canvas.height / 2 - rad),
    alpha: 0,
    extra: {
      getBonus: randomBonus.getBonus,
      destroy: () => {
        clearInterval(deleteTimeIndex);

        scene.instances.bonuses = scene.instances.bonuses.filter(
          (bn) => bn.id !== bonus.id,
        );
      },
      angle: 1,
      dead: false,
    },
  });

  deleteTimeIndex = setTimeout(() => {
    bonus.dead = true;
  }, 30000);

  return bonus;
}
