import { getCollidedSidesRectWithArc } from "../../../engine";
import { hitBrick } from "../../other.utils";

export default function hasCollidedWithBricks(ball, scene) {
  const { instances } = scene;
  const { bricks } = instances;

  let collision = false;

  for (const brick of bricks) {
    if (brick.extra.dead) {
      brick.alpha -= 0.01;
      brick.instances.text.alpha -= 0.01;

      if (brick.alpha <= 0) {
        scene.instances = {
          ...scene.instances,
          bricks: bricks.filter((b) => b.id !== brick.id),
        };
      }

      continue;
    }

    const collidedRectSides = getCollidedSidesRectWithArc(ball, brick);

    if (collidedRectSides.bottom) {
      ball.extra.vel.y = ball.extra.speed;
      ball.coor.y = brick.coor.y + brick.height + ball.radius + 1;
    } else if (collidedRectSides.top) {
      ball.extra.vel.y = -ball.extra.speed;
      ball.coor.y = brick.coor.y - ball.radius - 1;
    } else if (collidedRectSides.left) {
      ball.extra.vel.x = -ball.extra.speed;
      ball.coor.x = brick.coor.x - ball.radius - 1;
    } else if (collidedRectSides.right) {
      ball.extra.vel.x = ball.extra.speed;
      ball.coor.x = brick.coor.x + brick.width + ball.radius + 1;
    }

    if (collidedRectSides.hasCollision) {
      collision = true;

      hitBrick(brick, ball.extra.damage);
    }
  }

  return collision;
}
