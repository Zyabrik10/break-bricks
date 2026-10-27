/**
 * Safely increases sprite's frame along with upf [updates per frame] configuration
 * @param {any} sprite
 * @returns {any}
 */
export function increaseSpriteFrame(sprite) {
  if (sprite.frameCounter % sprite.upf === 0) {
    sprite.currentFrame++;
  }

  if (sprite.currentFrame >= sprite.framesAmount) {
    sprite.currentFrame = 0;
  }

  sprite.frameCounter++;
}

/**
 * Returns random integer from min-max range
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
export function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

/**
 * Returns random float from min-max range
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
export function randFloat(min, max) {
  return Math.random() * (max - min + 1) + min;
}

/**
 * Returns random element from arguments array
 * @param {Array.<unknown>} ...elements
 * @returns {unknown}
 */
export function randElement(...elements) {
  return elements[randInt(0, elements.length - 1)];
}

export function getUnitVector2D(x, y) {
  const magnitude = Math.hypot(x, y);
  
  if (magnitude === 0) {
    return { x: 0, y: 0 };
  }
  
  return {
    x: x / magnitude,
    y: y / magnitude
  };
}