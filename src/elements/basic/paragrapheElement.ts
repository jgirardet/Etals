import { EtalsElement, EtalsElementPlugin, Formats } from "../../types";
import { getRenderDefault } from "../../core";
export const ParagraphName = "paragraph";
export type ParagraphType = typeof ParagraphName;

export interface ParagraphElement extends EtalsElement {
  type: ParagraphType;
}

export const etalsParagraph = (formats: Formats): EtalsElementPlugin => {
  return {
    type: ParagraphName,
    renderElement: getRenderDefault(formats),
  };
};
