import { windowsEvents, elementsEvents } from "./events";
import { gameConfiguration } from "./game/globals";
import { initGameConfig, initPortals, initSettingsElements } from "./utils";

window.addEventListener("load", async () => {
  initPortals();
  initGameConfig();
  initSettingsElements(gameConfiguration.get());

  // events setup
  windowsEvents();
  elementsEvents();
});
