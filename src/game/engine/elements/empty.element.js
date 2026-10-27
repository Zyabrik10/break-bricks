import { nanoid } from "nanoid";

/**
 * Create an empty template of any element of the scene
 * @param {{
 *  x?: number;
 *  y?: number;
 *  width?: number;
 *  height?: number;
 *  toFill?: boolean;
 *  toStroke?: boolean;
 *  toSprite?: boolean;
 *  stroke?: string;
 *  fill?: string;
 *  sprite?: Object.<string, unknown>;
 *  extra?: Object.<string, unknown>;
 *  instances?: Object.<string, unknown>;
 * alpha?: number;
 * }} emptyElementProps={}
 * @returns {{
 *  id: string;
 *  coor: { x: number, y: number; };
 *  width: number;
 *  height: number;
 *  toFill: boolean;
 *  toStroke: boolean;
 *  toSprite: boolean;
 *  stroke: string;
 *  fill: string;
 *  sprite: Object.<string, unknown>;
 *  extra: Object.<string, unknown>;
 *  instances: Object.<string, unknown>;
 *  alpha: 1
 * }}
 */
export default function createEmptyElement(emptyElementProps = {}) {
  const {
    x = 0,
    y = 0,
    width = 100,
    height = 100,
    toFill = false,
    toStroke = false,
    toSprite = false,
    stroke = "black",
    fill = "black",
    sprite = {},
    extra = {},
    instances = {},
    alpha = 1,
    angle = 0,
  } = emptyElementProps;

  return {
    id: nanoid(10),
    coor: { x, y },
    width,
    height,
    toFill,
    toStroke,
    toSprite,
    stroke,
    fill,
    sprite,
    extra,
    instances,
    alpha,
    angle,
  };
}
