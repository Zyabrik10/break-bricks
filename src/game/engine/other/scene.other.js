/**
 * Return scene object along with convenient methods and properties
 * @param {{
 * canvas?: HTMLCanvasElement;
 * ctx?: CanvasRenderingContext2D;
 * instances?: Object.<string, Object>;
 * currentFrame?: number;
 * maxFrame?: number;
 * updatePer?: number;
 * updateCallback?: (scene: Object) => void;
 * }} props={}
 * @returns {{
 * type: "scene";
 * canvas: HTMLCanvasElement;
 * ctx: CanvasRenderingContext2D;
 * instances: Object.<string, Object>;
 * currentFrame: number;
 * maxFrame: number;
 * updatePer: number;
 * }}
 */
export default function createScene(props = {}) {
  const {
    canvas = undefined,
    ctx = undefined,
    instances = {},

    currentFrame = 0,
    maxFrame = 0,
    updatePer = 0,

    updateCallback,
  } = props;

  let timeoutIndex = null;
  let callback = null;

  return {
    ...props,
    canvas,
    ctx,
    instances,

    currentFrame,
    maxFrame,
    updatePer,

    type: "scene",
    status: "pause",

    start(runCallback) {
      callback = runCallback;
      this.resume();
    },

    resume() {
      const { framesPer, currentFrame, maxFrame } = this;

      timeoutIndex = setTimeout(this.resume.bind(this), framesPer);

      if (currentFrame === maxFrame) {
        this.currentFrame = 0;
      }

      updateCallback?.(this);
      callback?.(this);

      this.currentFrame += 1;
      this.status = "ongoing";
    },

    pause() {
      clearTimeout(timeoutIndex);
      this.status = "pause";
    },
  };
}
