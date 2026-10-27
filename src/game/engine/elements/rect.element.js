import createEmptyElement from "./empty.element";

/**
 * Creates an element with type rect
 * @param {Parameters<typeof createEmptyElement>} rectEmptyElementProps={}
 * @returns {{ type: "rect" } & ReturnType<typeof createEmptyElement>}
 */
export default function createRect(rectEmptyElementProps = {}) {
  const objectStructure = createEmptyElement(rectEmptyElementProps);

  return {
    ...objectStructure,
    type: "rect",
  };
}
