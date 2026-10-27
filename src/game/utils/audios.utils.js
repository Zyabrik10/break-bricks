import { gameAudios } from "../globals";

export function initAudios(gameConfiguration) {
  const masterVolume = gameConfiguration.audio.volume.master / 100;

  gameAudios.destroyBrick.audioSrc = gameConfiguration.audio.destroyBrick;
  gameAudios.destroyBrick.volume =
    gameConfiguration.audio.volume.destroyBrick * masterVolume;

  gameAudios.getBonus.audioSrc = gameConfiguration.audio.getBonus;
  gameAudios.getBonus.volume =
    gameConfiguration.audio.volume.getBonus * masterVolume;

  gameAudios.hit.wall.audioSrc = gameConfiguration.audio.hit.wall;
  gameAudios.hit.wall.volume =
    gameConfiguration.audio.volume.hit.wall * masterVolume;

  gameAudios.hit.paddle.audioSrc = gameConfiguration.audio.hit.paddle;
  gameAudios.hit.paddle.volume =
    gameConfiguration.audio.volume.hit.paddle * masterVolume;

  gameAudios.hit.brick.audioSrc = gameConfiguration.audio.hit.brick;
  gameAudios.hit.brick.volume =
    gameConfiguration.audio.volume.hit.brick * masterVolume;

  gameAudios.hit.bonus.audioSrc = gameConfiguration.audio.hit.bonus;
  gameAudios.hit.bonus.volume =
    gameConfiguration.audio.volume.hit.bonus * masterVolume;
}
