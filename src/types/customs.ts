// This example is for an Editor with `ReactEditor` and `HistoryEditor`
import { BaseEditor } from "slate";
import { ReactEditor } from "slate-react";
import { HistoryEditor } from "slate-history";
import { HeadingElement, ParagraphElement } from "../elements";
import {
  BoldText,
  ItalicText,
  StrikethroughText,
  UnderlineText,
  SubSuperscriptText,
} from "../marks";

export type TEDITOR = BaseEditor & ReactEditor & HistoryEditor;

export type TElement = ParagraphElement | HeadingElement;

export type EtalsText = BoldText &
  ItalicText &
  UnderlineText &
  StrikethroughText &
  SubSuperscriptText;

export type EtalsTextKeys = keyof EtalsText;
export type FormattedText = { text: string } & Partial<EtalsText>;
export type TText = FormattedText;

declare module "slate" {
  interface CustomTypes {
    Editor: TEDITOR;
    Element: TElement;
    Text: TText;
  }
}
