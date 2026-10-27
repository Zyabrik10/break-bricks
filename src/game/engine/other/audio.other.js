export function createAudio(audioSrc, audioConfiguration = {}) {
  const { volume = 100 } = audioConfiguration;

  let audioElement;

  return {
    audioSrc: audioSrc,
    volume,
    play() {
      audioElement = new Audio(this.audioSrc);

      audioElement.volume = Math.max(0, Math.min(this.volume / 100, 1));

      audioElement.play();
    },
    pause() {
      audioElement.pause();
    },
  };
}
