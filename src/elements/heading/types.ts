import { TText } from "../../types";

export type HeadingElement = {
  type: "heading";
  level: number;
  children: TText;
};
