import hasCollidedWithScene from "./scene.collision";
import hasCollidedWithPlatform from "./platform.collision";
import hasCollidedWithBricks from "./bricks.collision";
import hasCollidedWithBonuses from "./bonuses.collision";
import { spawnParticles, spawnStaticParticles } from "../../spawn.utils";
import { gameAudios, gameConfiguration } from "../../../globals";

export default function ballsUpdate(scene) {
  const { instances } = scene;
  const { balls } = instances;

  balls.forEach((ball) => {
    ball.coor.x += ball.extra.vel.x;
    ball.coor.y += ball.extra.vel.y;

    const { areOn, walls, bricks, paddle, bonus, maxHit, tail, maxTail } =
      gameConfiguration.get().particles;

    if (areOn && tail) {
      particlesAction(ball, scene, maxTail);
    }

    if (ball.alpha < 1) {
      ball.alpha += 0.01;
    }

    const sceneCollision = hasCollidedWithScene(ball, scene);
    const platformCollision = hasCollidedWithPlatform(ball, scene);
    const brickCollision = hasCollidedWithBricks(ball, scene);
    const bonusCollision = hasCollidedWithBonuses(ball, scene);

    if (sceneCollision) {
      gameAudios.hit.wall.play();

      if (areOn && walls) {
        spawnParticles({
          scene,
          quantity: maxHit,
          coor: ball.coor,
        });
      }
    } else if (brickCollision) {
      gameAudios.hit.brick.play();

      if (areOn && bricks) {
        spawnParticles({
          scene,
          quantity: maxHit,
          coor: ball.coor,
        });
      }
    } else if (platformCollision) {
      gameAudios.hit.paddle.play();

      if (areOn && paddle) {
        spawnParticles({
          scene,
          quantity: maxHit,
          coor: ball.coor,
        });
      }
    } else if (bonusCollision) {
      gameAudios.hit.bonus.play();

      if (areOn && bonus) {
        spawnParticles({
          scene,
          quantity: maxHit,
          coor: ball.coor,
        });
      }
    }
  });
}

function particlesAction(ball, scene, q) {
  if (!ball.extra.canSpawnParticles) return;

  spawnStaticParticles({
    scene,
    quantity: q,
    coor: ball.coor,
  });

  ball.extra.canSpawnParticles = false;

  setTimeout(() => {
    ball.extra.canSpawnParticles = true;
  }, 50);
}
