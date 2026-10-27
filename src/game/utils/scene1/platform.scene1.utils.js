import { mouse } from "../../engine";

export function platformUpdate(scene) {
  const { instances, canvas } = scene;
  const { platform } = instances;

  const activeKey = mouse.keysDown.at(-1);

  if (activeKey === "ArrowLeft") {
    platform.extra.vel.x = -platform.extra.speed;
  } else if (activeKey === "ArrowRight") {
    platform.extra.vel.x = platform.extra.speed;
  }

  platform.coor.x += platform.extra.vel.x;
  platform.extra.vel.x *= 0.95;

  if (platform.coor.x + platform.width > canvas.width) {
    platform.coor.x = canvas.width - platform.width;
    platform.extra.vel.x = 0;
  } else if (platform.coor.x < 0) {
    platform.coor.x = 0;
    platform.extra.vel.x = 0;
  }
}
