import { randInt } from "../engine";
import { createBall } from "./create.utils";
import { hitBrick } from "./other.utils";

export function increaseRadius({ instance }) {
  if (instance.radius + 10 >= 30) {
    return;
  }

  instance.radius += 10;

  setTimeout(() => {
    instance.radius = instance.extra.defaultRadius;
  }, 5000);
}

export function spawnMoreBalls({ scene }) {
  const quantity = randInt(1, 10);

  for (let i = 0; i < quantity; i++) {
    const newBall = createBall((createBall) => {
      return {
        ...createBall,
        coor: {
          x: innerWidth / 2 - createBall.radius / 2,
          y: innerHeight / 2,
        },
        extra: {
          ...createBall.extra,
          hp: randInt(1, 10),
        },
      };
    });

    let interval = 0;

    setTimeout(
      () => {
        scene.instances.balls.push(newBall);

        interval = setInterval(() => {
          newBall.extra.hp--;

          if (newBall.extra.hp === 0) {
            newBall.extra.dead = true;
            clearInterval(interval);
          }
        }, 5000);
      },
      randInt(0, 5000),
    );
  }
}

export function increaseBallsSpeed({ instance }) {
  if (instance.extra.speed + 1 >= 7) {
    return;
  }

  instance.extra.speed += 1;

  setTimeout(() => {
    instance.extra.speed = instance.extra.defaultSpeed;
  }, 5000);
}

export function increasePlatformSpeed({ scene }) {
  const { instances } = scene;
  const { platform } = instances;

  if (platform.extra.speed + 5 >= 20) {
    return;
  }

  platform.extra.speed += 5;

  setTimeout(() => {
    platform.extra.speed = platform.extra.defaultSpeed;
  }, 5000);
}

export function increasePlatformWidth({ scene }) {
  const { instances, canvas } = scene;
  const { platform } = instances;

  if (platform.width * 1.1 >= canvas.width) {
    return;
  }

  platform.width *= 1.1;

  setTimeout(() => {
    platform.width = platform.extra.defaultWidth;
  }, 5000);
}

export function hitRandomBricks({ scene }) {
  const { instances } = scene;
  const { bricks } = instances;

  const quantity = randInt(1, bricks.length - 1);
  const randomIndexToRemove = new Set(
    new Array(quantity).fill().map(() => randInt(0, bricks.length)),
  );

  scene.instances.bricks.forEach((brick, index) => {
    if (randomIndexToRemove.has(index)) {
      hitBrick(brick);
    }
  });
}

export function increaseBallDamage({ instance }) {
  instance.extra.damage = randInt(2, 10);

  setTimeout(() => {
    instance.extra.damage = instance.extra.defaultDamage;
  }, 5000);
}
