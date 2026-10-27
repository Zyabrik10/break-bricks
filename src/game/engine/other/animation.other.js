/**
 * Works in such way - on play runs sequence of animation functions which change placement of passed instance. n
 * @param {{
 *  preAnimation: (instance: Object.<string, unknown>) => void;
 *  postAnimation: (instance: Object.<string, unknown>) => void;
 *  clearAnimation: (instance: Object.<string, unknown>) => void;
 *  animations: Array.<(instance: Object.<string, unknown>, configuration: Object.<string, unknown>) => void>
 * }} props
 * @returns {{
 *  play:  (instance: Object.<string, unknown>, configuration: Object.<string, unknown>)=> void;
 *  clear: (instance: Object.<string, unknown>, configuration: Object.<string, unknown>)=> void;
 * }}
 */
export function createAnimation(props) {
  const {
    preAnimation,
    postAnimation,
    clearAnimation,
    animations = [],
  } = props;

  return {
    play: (instance, configuration) => {
      preAnimation?.(instance, configuration);

      animations.forEach((animation) => animation(instance, configuration));

      postAnimation?.(instance, configuration);
    },
    clear: (instance, configuration) => {
      clearAnimation?.(instance, configuration);
    },
  };
}

/**
 * Moves instance using sin function
 * @param {number} a=1
 * @param {number} b=1
 * @returns {(instance: Object.<string, unknown>)=> void}
 */
export function verticalSin(a = 1, b = 1) {
  return (instance) => {
    instance.coor.y += Math.sin(instance.extra.angle * a) * b;
  };
}

/**
 * Moves instance using cos function
 * @param {number} a=1
 * @param {number} b=1
 * @returns {(instance: Object.<string, unknown>)=> void}
 */
export function horizontalCos(a = 1, b = 1) {
  return (instance) => {
    instance.coor.x += Math.cos(instance.extra.angle * a) * b;
  };
}

/**
 * Moves instance forward or backward depending on vector of speed
 * @param {number} speed=1
 * @returns {(instance: Object.<string, unknown>)=> void}
 */
export function forward(speed = 1) {
  return (instance) => {
    instance.coor.x += speed;
  };
}

/**
 * Moves instance to the top or to the bottom depending on vector of speed
 * @param {number} speed=1
 * @returns {(instance: Object.<string, unknown>)=> void}
 */
export function top(speed = 1) {
  return (instance) => {
    instance.coor.y += speed;
  };
}
