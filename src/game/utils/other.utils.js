import { randInt } from "../engine";
import { gameAudios, scene1 } from "../globals";
import { spawnParticles } from "./spawn.utils";

export function updateParticles(scene) {
  const { instances } = scene;
  const { particles } = instances;

  for (const particle of particles) {
    particle.coor.x += particle.extra.vel.x * 0.96;
    particle.coor.y += particle.extra.vel.y * 0.96;

    particle.coor.y += 0.5;

    particle.alpha -= 0.005;
    particle.radius -= 0.01;

    if (particle.radius <= 0 || particle.alpha <= 0) {
      scene.instances = {
        ...scene.instances,
        particles: scene.instances.particles.filter(
          (part) => part.id !== particle.id,
        ),
      };
    }
  }
}

export function hitBrick(instance, damage = 1) {
  instance.extra.hp -= damage;
  instance.instances.text.text = instance.extra.hp;

  if (instance.extra.hp <= 0) {
    instance.extra.dead = true;

    spawnParticles({
      scene: scene1.get(),
      coor: {
        x: instance.coor.x + instance.width / 2,
        y: instance.coor.y + instance.height / 2,
      },
      quantity: randInt(30, 60),
    });
    gameAudios.destroyBrick.play();
  }
}
