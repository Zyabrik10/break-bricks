import { createRect, randFloat, randInt } from "../engine";
import { gameConfiguration } from "../globals";
import { createBonus } from "./create.utils";

export function spawnBonuses(scene) {
  const { instances } = scene;
  const { bonuses } = scene.instances;

  const randomness = Math.random() <= 0.5;
  const lessThen = bonuses.length > 10;

  if (randomness || lessThen) return;

  const bonus = createBonus(scene);

  scene.instances.bonuses = [...instances.bonuses, bonus];
}

export function spawnParticles({ scene, coor, quantity }) {
  const { graphics } = gameConfiguration.get();
  const { type, colors } = graphics;
  const { array } = colors;

  const { instances } = scene;

  const particles = [];
  let angle = 0;
  let step = Math.PI / quantity;

  for (let i = 0; i < quantity; i++) {
    const randomForce = randInt(1, 2);
    const randomness = Math.random();
    const size = randInt(2, 6);

    const particle = createRect({
      x: coor.x,
      y: coor.y,
      toFill: type === "colors",
      fill: array[randInt(0, array.length - 1)],
      width: size,
      height: size,
      extra: {
        vel: {
          x: randomness * Math.cos(angle) * randomForce,
          y: randomness * -Math.sin(angle) * randomForce,
        },
      },
    });

    particles.push(particle);
    angle += step;
  }

  scene.instances.particles = [...instances.particles, ...particles];
}

export function spawnStaticParticles({ scene, coor, quantity }) {
  const { instances } = scene;

  const particles = [];

  for (let i = 0; i < quantity; i++) {
    const randomColor = "black";
    const size = randInt(2, 6);

    const randomRadian = randFloat(0, Math.PI * 2);

    const randomOffsetX = randFloat(1, 10);
    const randomOffsetY = randFloat(1, 10);

    const particle = createRect({
      x: coor.x + Math.cos(randomRadian) * randomOffsetX,
      y: coor.y + Math.sin(randomRadian) * randomOffsetY,
      toFill: true,
      fill: randomColor,
      width: size,
      height: size,
      extra: {
        vel: {
          x: randFloat(-0.5, 0.5),
          y: randFloat(-0.5, 0.5),
        },
      },
    });

    particles.push(particle);
  }

  scene.instances.particles = [...instances.particles, ...particles];
}
