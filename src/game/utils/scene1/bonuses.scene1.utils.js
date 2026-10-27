import { bonusesTimeIndex, sinAnimation } from "../../globals";
import { spawnBonuses } from "../spawn.utils";

export function bonusesUpdate(scene) {
  const { instances } = scene;
  const { bonuses } = instances;

  for (const bonus of bonuses) {
    sinAnimation.play(bonus);
    bonus.extra.angle += 0.01;

    if (!bonus.extra.dead && bonus.alpha < 1) {
      bonus.alpha += 0.01;
    }

    if (bonus.extra.dead) {
      bonus.alpha -= 0.01;

      if (bonus.alpha <= 0) {
        bonus.extra.destroy();
      }
    }
  }

  if (bonusesTimeIndex.get() !== 0) return;

  bonusesTimeIndex.set(
    setTimeout(() => {
      bonusesTimeIndex.set(0);
      spawnBonuses(scene);
    }, 1000),
  );
}
