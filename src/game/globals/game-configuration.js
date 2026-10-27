import { createStore } from "../engine";

export const defaultConfiguration = Object.freeze({
  particles: {
    areOn: true,
    bricks: true,
    walls: true,
    paddle: true,
    tail: true,
    bonus: true,
    maxHit: 30,
    maxTail: 1,
  },
  audio: {
    volume: {
      master: 100,
      destroyBrick: 100,
      getBonus: 100,
      hit: {
        wall: 100,
        paddle: 100,
        brick: 100,
        bonus: 100,
      },
    },
    hit: {
      wall: "audios/beep4.mp3",
      paddle: "audios/beep4.mp3",
      brick: "audios/beep4.mp3",
      bonus: "audios/beep4.mp3",
    },
    getBonus: "audios/beep3.mp3",
    destroyBrick: "audios/beep2.mp3",
  },
  graphics: {
    type: "colors",
    colors: {
      ball: {
        type: "array-random",
        customColor: "#000",
      },
      background: {
        type: "custom",
        customColor: "#000",
      },
      paddle: {
        type: "array-random",
        customColor: "#000",
      },
      brick: {
        type: "array-random",
        customColor: "#000",
      },
      bonus: {
        type: "array-random",
        customColor: "#000",
      },
      brickHp: {
        type: "custom",
        customColor: "#0b970b",
      },
      particles: {
        type: "array-random",
        customColor: "#000",
      },
      array: [
        "hsl(351, 100%, 79%)",
        "hsl(355, 100%, 74%)",
        "hsl(315, 100%, 61%)",
        "hsl(304, 100%, 44%)",
        "hsl(317, 100%, 17%)",
        "hsl(253, 100%, 63%)",
        "hsl(261, 100%, 79%)",
        "hsl(329, 100%, 88%)",
        "hsl(341, 100%, 78%)",
        "hsl(354, 100%, 71%)",
      ],
    },
    sprites: {},
  },
});

export const gameConfiguration = createStore({
  ...defaultConfiguration,
});
