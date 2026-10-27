import { goTo } from "../utils";
import { gameConfiguration, scene1 } from "./globals";
import { scene1Setup } from "./setups";
import { initAudios } from "./utils";

export default function main() {
  // init assets
  initAudios(gameConfiguration.get());

  // scene setups
  scene1Setup();

  // run scenes
  scene1.get().start((scene) => {
    const { instances } = scene;
    const { bricks } = instances;

    if (bricks.length === 0) {
      scene.pause();
      goTo("home-menu");
    }
  });
}
