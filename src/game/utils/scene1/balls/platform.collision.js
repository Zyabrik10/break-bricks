import { getCollidedSidesRectWithArc } from "../../../engine";

export default function hasCollidedWithPlatform(ball, scene) {
  const { instances } = scene;
  const { platform } = instances;

  const collidedRectSides = getCollidedSidesRectWithArc(ball, platform);

  if (collidedRectSides.top) {
    ball.coor.y = platform.coor.y - ball.radius;
  } else if (collidedRectSides.bottom) {
    ball.coor.y = platform.coor.y + platform.height + ball.radius;
  } else if (collidedRectSides.left) {
    ball.coor.x = platform.coor.x - ball.radius;
  } else if (collidedRectSides.right) {
    ball.coor.x = platform.coor.x + platform.width + ball.radius;
  }

  if (collidedRectSides.top) {
    const MAX_ANGLE = Math.PI / 3; // 60° from vertical
    const MIN_VY_RATIO = 0.25; // never flatter than this
    const SPIN = 0.35; // platform influence on ball

    // 2. hit offset: -1 (left edge) .. 0 (center) .. +1 (right edge)
    let hit =
      (ball.coor.x - (platform.coor.x + platform.width / 2)) /
      (platform.width / 2);
    hit = Math.max(-1, Math.min(1, hit));

    // 3. rebuild velocity from angle, preserving speed
    const speed = Math.hypot(ball.extra.vel.x, ball.extra.vel.y);
    const angle = hit * MAX_ANGLE;

    ball.extra.vel.x = speed * Math.sin(angle);
    ball.extra.vel.y = -speed * Math.cos(angle);

    // 4. spin: paddle's own motion drags the ball sideways
    ball.extra.vel.x += platform.extra.vel.x * SPIN;

    // 5. clamp so the ball never travels near-horizontally
    const minVy = speed * MIN_VY_RATIO;
    if (Math.abs(ball.extra.vel.y) < minVy) ball.extra.vel.y = -minVy;

    // renormalize to keep speed constant after spin + clamp
    const k = speed / Math.hypot(ball.extra.vel.x, ball.extra.vel.y);
    ball.extra.vel.x *= k;
    ball.extra.vel.y *= k;
  } else if (collidedRectSides.bottom) {
    ball.extra.vel.y = ball.extra.speed;
  } else if (collidedRectSides.left) {
    ball.extra.vel.x = -ball.extra.speed;
  } else if (collidedRectSides.right) {
    ball.extra.vel.x = ball.extra.speed;
  }
  return collidedRectSides.hasCollision;
}
