/**
 * Creates sprite object
 *
 * upf [updates per frame]
 * @param {{
 *  image?: HTMLImageElement;
 *  framesAmount?: number;
 *  upf?: number;
 *  isFlipped?: boolean;
 *  isFlopped?: boolean;
 *  imageOffset?: { x: number, y: number };
 *  frameStartOffset?: { x: number, y: number };
 *  frameOffset?: { x: number, y: number };
 *  imageSizeOffset?: { width: number, height: number };
 *  sizeCof?: number;
 * }} spriteProps
 * @returns {{
 * image: HTMLImageElement;
 * framesAmount: number;
 * upf: number;
 * isFlipped: boolean;
 * isFlopped: boolean;
 * imageOffset: { x: number, y: number };
 * frameStartOffset: { x: number, y: number };
 * frameOffset: { x: number, y: number };
 * imageSizeOffset: { width: number, height: number };
 * frameWidth: number;
 * currentFrame: number;
 * frameCounter: number;
 * sizeCof: number;
 * }}
 */
export default function createSprite(spriteProps) {
  const {
    image = new Image(),
    framesAmount = 1,
    upf = 1,
    isFlipped = false,
    isFlopped = false,
    toStroke = false,
    stroke = "black",
    imageOffset = { x: 0, y: 0 },
    frameStartOffset = { x: 0, y: 0 },
    frameOffset = { x: 0, y: 0 },
    imageSizeOffset = { width: 0, height: 0 },
    sizeCof = 1,
  } = spriteProps;

  const frameWidth = image.width / framesAmount;
  const currentFrame = 0;
  const frameCounter = 0;

  return {
    image,
    framesAmount,
    upf,
    isFlipped,
    isFlopped,
    toStroke,
    stroke,
    imageOffset,
    frameStartOffset,
    frameOffset,
    imageSizeOffset,
    frameWidth,
    currentFrame,
    frameCounter,
    sizeCof,
  };
}
