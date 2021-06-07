import { BaseEditor } from "slate";
import { ReactEditor } from "slate-react";
import { HistoryEditor } from "slate-history";
import {
  HeadingElement,
  HeadingType,
  ParagraphElement,
  ParagraphType,
} from "../elements";
import {
  BoldText,
  ItalicText,
  StrikethroughText,
  UnderlineText,
  SubSuperscriptText,
  FontSizeText,
} from "../marks";

export type TEDITOR = BaseEditor & ReactEditor & HistoryEditor;

export type TElement = ParagraphElement | HeadingElement;

export type EtalsText = BoldText &
  ItalicText &
  UnderlineText &
  StrikethroughText &
  SubSuperscriptText &
  FontSizeText;

export type EtalsTextKeys = keyof EtalsText;
export type EtalsElementTypes = ParagraphType | HeadingType;
export type FormattedText = { text: string } & Partial<EtalsText>;
export type TText = FormattedText;

declare module "slate" {
  interface CustomTypes {
    Editor: TEDITOR;
    Element: TElement;
    Text: TText;
  }
}
