import {
  hitRandomBricks,
  increaseBallDamage,
  increaseBallsSpeed,
  increasePlatformSpeed,
  increasePlatformWidth,
  increaseRadius,
  spawnMoreBalls,
} from "../utils";

export const bonuses = [
  {
    color: "black",
    getBonus: increaseRadius,
  },
  {
    color: "blue",
    getBonus: spawnMoreBalls,
  },
  {
    color: "green",
    getBonus: increaseBallsSpeed,
  },
  {
    color: "yellow",
    getBonus: increasePlatformSpeed,
  },
  {
    color: "purple",
    getBonus: increasePlatformWidth,
  },
  {
    color: "orange",
    getBonus: hitRandomBricks,
  },
  {
    color: "red",
    getBonus: increaseBallDamage,
  },
];