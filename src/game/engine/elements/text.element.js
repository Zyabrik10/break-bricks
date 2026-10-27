import createEmptyElement from "./empty.element";

/**
 * Creates an element with type text
 * @param {{ text: string; font: string; lineWidth: number; } & Parameters<typeof createEmptyElement>} emptyTextElementProps={}
 * @returns {{ type: "text"; font: "16px Arial"; lineWidth: 1; } & ReturnType<typeof createEmptyElement>}
 */
export default function createText(emptyTextElementProps = {}) {
  const { text = "", font = "16px Arial", lineWidth = 1 } = emptyTextElementProps;
  const objectStructure = createEmptyElement(emptyTextElementProps);

  return {
    ...objectStructure,
    type: "text",
    text,
    font,
    lineWidth,
  };
}
