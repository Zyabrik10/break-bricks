import createEmptyElement from "./empty.element";

/**
 * Creates an element with type ellipse
 * @param {{ 
 * rotation?: number;
 * startAngle?: number;
 * endAngle?: number;
 * } & Parameters<typeof createEmptyElement>} emptyEllipseElementProps={}
 * @returns {{ 
 *  type: "ellipse";
 *  rotation?: number;
 *  startAngle?: number;
 *  endAngle?: number;
 * } & ReturnType<typeof createEmptyElement>}
 */
export default function createEllipse(emptyEllipseElementProps = {}) {
  const { rotation = 0, startAngle = 0, endAngle = Math.PI * 2 } = emptyEllipseElementProps;

  const objectStructure = createEmptyElement(emptyEllipseElementProps);

  return {
    ...objectStructure,
    type: "ellipse",
    rotation,
    startAngle,
    endAngle,
  };
}
