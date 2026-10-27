import createEmptyElement from "./empty.element";

/**
 * Creates an element with type arc
 * @param {{ 
 * radius: number;
 * clockwise?: boolean;
 * startAngle?: number;
 * endAngle?: number;
 * } & Parameters<typeof createEmptyElement>} emptyArcElementProps={}
 * @returns {{ 
 *  type: "arc";
 *  width: 0;
 *  height: 0; 
 *  radius: number;
 *  clockwise: boolean;
 *  startAngle: number;
 *  endAngle: number; 
 * } & ReturnType<typeof createEmptyElement>}
 */
export default function createArc(emptyArcElementProps = {}) {
  const {
    clockwise = true,
    startAngle = 0,
    endAngle = Math.PI * 2,
    radius,
  } = emptyArcElementProps;
  const objectStructure = createEmptyElement(emptyArcElementProps);

  return {
    ...objectStructure,
    type: "arc",
    width: 0,
    height: 0,
    radius,
    clockwise,
    startAngle,
    endAngle,
  };
}
