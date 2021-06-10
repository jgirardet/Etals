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
  ColorText,
} from "../marks";

import { EtalsEditor } from "../core";

export type TEDITOR = BaseEditor & ReactEditor & HistoryEditor & EtalsEditor;

export type TElement = ParagraphElement | HeadingElement;

export type EtalsText = BoldText &
  ItalicText &
  UnderlineText &
  StrikethroughText &
  SubSuperscriptText &
  FontSizeText &
  ColorText;

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
