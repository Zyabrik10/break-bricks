import { createAudio } from "../engine";

export const gameAudios = {
  hit: {
    wall: createAudio("audios/beep4.mp3"),
    paddle: createAudio("audios/beep4.mp3"),
    brick: createAudio("audios/beep4.mp3"),
    bonus: createAudio("audios/beep4.mp3"),
  },
  getBonus: createAudio("audios/beep3.mp3"),
  destroyBrick: createAudio("audios/beep2.mp3"),
};
