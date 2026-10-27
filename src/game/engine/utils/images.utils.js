/**
 * Function ensures an image is loaded
 * @param {string} imageSrc
 * @param {{ beforeLoaded: () => void, afterLoaded: ()=> void, onError: (e: Error)=> void }} options
 * @returns {Promise<Image>}
 */
export async function loadImage(imageSrc, options = {}) {
  const { beforeLoaded, afterLoaded, onError } = options;

  return new Promise((resolve, reject) => {
    beforeLoaded?.();

    const img = new Image();

    img.src = imageSrc;

    img.onload = () => {
      resolve(img);

      afterLoaded?.();
    };

    img.onerror = () => {
      const error = new Error(`Image loading error: ${imageSrc}`);
      reject(error);

      onError?.(error);
    };

    beforeLoaded?.();
  });
}

export function loadImages(sprites) {
  return Promise.all(
    sprites.map(async (sprite) => {
      const loadedImage = await loadImage(sprite.src);

      sprite.image = loadedImage;

      return sprite;
    }),
  );
}