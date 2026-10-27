import { gameAudios } from "../../../globals";

export default function hasCollidedWithBonuses(ball, scene) {
  const { instances } = scene;
  const { bonuses } = instances;

  let collision = false;

  for (const bonus of bonuses) {
    if (bonus.extra.dead) {
      continue;
    }

    const distance = Math.hypot(
      bonus.coor.x - ball.coor.x,
      bonus.coor.y - ball.coor.y,
    );
    const radiusSum = bonus.radius + ball.radius;

    if (distance <= radiusSum) {
      bonus.extra.getBonus({
        instance: ball,
        scene,
      });
      collision = true;

      bonus.extra.dead = true;

      gameAudios.getBonus.play();
    }
  }

  return collision;
}
