import React from "react";

import { RenderElementProps } from "slate-react";
import { toggleMark } from "../../core";
import {
  Command,
  EtalsElement,
  EtalsElementPlugin,
  Formats,
  RenderElement,
} from "../../types";

export const HeadingName = "heading";

export type HeadingType = typeof HeadingName;

export interface HeadingElement extends EtalsElement {
  type: HeadingType;
  level: 1 | 2 | 3 | 4 | 5 | 6;
}

interface HeadingProps extends RenderElementProps {
  element: HeadingElement;
}

const getHeadingRender =
  (formats: Formats) =>
  ({ element, children, attributes }: HeadingProps) => {
    const header = "h" + element.level;
    const style = formats[header];

    return React.createElement(header, { ...attributes }, children);
  };

const cycleHeaderCommand: Command = ({ editor }) => {};

export const etalsHeading = (formats: Formats): EtalsElementPlugin => {
  return {
    type: HeadingName,
    renderElement: getHeadingRender(formats) as RenderElement,
    //actions
  };
};
