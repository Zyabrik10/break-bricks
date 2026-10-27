import { createScene, createStore } from "../engine";
import { scene1Update, scene2Update } from "../updates";

export const scene1 = createStore(
  createScene({
    maxFrame: 1,
    updateFor: 500,
    updateCallback: scene1Update,
  }),
);

export const scene2 = createStore(
  createScene({
    maxFrame: 1,
    updateFor: 500,
    updateCallback: scene2Update,
  }),
);
