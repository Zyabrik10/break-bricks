import { randElement } from "../../../engine";

export default function hasCollidedWithScene(ball, scene) {
  const { canvas } = scene;

  let collision = false;

  if (ball.coor.y + ball.radius >= canvas.height) {
    ball.extra.vel.y = -ball.extra.speed;
    ball.coor.y = canvas.height - ball.radius;
    collision = true;
  } else if (ball.coor.y - ball.radius <= 0) {
    ball.extra.vel.y = ball.extra.speed;
    ball.coor.y = ball.radius + 1;

    collision = true;
  } else if (ball.coor.x + ball.radius >= canvas.width) {
    ball.extra.vel.x = -ball.extra.speed;
    ball.coor.x = canvas.width - ball.radius - 1;

    collision = true;
  } else if (ball.coor.x - ball.radius <= 0) {
    ball.extra.vel.x = ball.extra.speed;
    ball.coor.x = ball.radius + 1;

    collision = true;
  }

  if (collision && ball.extra.firstTimePlatformHit === false) {
    const randomness = Math.random() || 1;

    ball.extra.firstTimePlatformHit = true;
    ball.extra.vel.x = randElement(-1, 1) * ball.extra.speed * randomness;
  }

  return collision;
}
