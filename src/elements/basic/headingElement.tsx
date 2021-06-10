import React from "react";
import { Editor, Transforms, Node } from "slate";

import { RenderElementProps } from "slate-react";
import { EtalsEditor } from "../../core";
import {
  Command,
  Config,
  ConfigurablePluginAction,
  EtalsElement,
  FormatKeys,
  Formats,
} from "../../types";
import { newParagraph, toParagraph } from "./paragrapheElement";
import { Element } from "slate";

export const HeadingName = "heading";

export type HeadingType = typeof HeadingName;

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

export interface HeadingElement extends EtalsElement {
  type: HeadingType;
  level: HeadingLevel;
}

interface HeadingProps extends RenderElementProps {
  element: HeadingElement;
}

const getHeadingRender =
  (formats: Formats) =>
  ({ element, children, attributes }: HeadingProps) => {
    const header = "h" + element.level;
    const style = formats[header as FormatKeys];

    return React.createElement(
      header,
      { ...attributes, style: style },
      children
    );
  };

const cycleHeaderCommand: Command = ({ editor }) => {
  const res = EtalsEditor.getElement(editor);
  if (!res) return;
  const [node, _] = res;
  let diff = {};
  if (node && node.type === "heading") {
    if (node.level >= 4) diff = toParagraph(node);
    else diff = toHeading(node, (node.level + 1) as HeadingLevel);
  } else if (node && node.type === "paragraph") {
    diff = toHeading(node, 1);
  }
  Transforms.setNodes(editor, diff);
};

const CycleHeadingAction: ConfigurablePluginAction = (_config: Config) => {
  return {
    name: "cycleHeading",
    command: cycleHeaderCommand,
    hotkeys: [
      { layout: "base", hotkey: "mod+y" },
      { layout: "bépo", hotkey: "mod+s" },
    ],
  };
};

const clearHeading: Command = ({ editor, options }) => {
  const sel = editor.selection;
  if (!sel) return;
  const node = EtalsEditor.getElement(editor);
  if (!node) return;
  const [element, _] = node;
  if (element.type === "heading") {
    Transforms.select(editor, Editor.end(editor, sel.anchor.path));
    Transforms.insertNodes(editor, newParagraph());
  } else {
    Editor.insertBreak(editor);
  }
};

const clearHeadingAction: ConfigurablePluginAction = (_config: Config) => {
  return {
    name: "clearHeading",
    command: clearHeading,
    hotkeys: [{ layout: "base", hotkey: "Enter" }],
  };
};

export const etalsHeading = (config: Config) => {
  return {
    type: HeadingName,
    renderElement: getHeadingRender(config.formats),
    actions: [CycleHeadingAction(config), clearHeadingAction(config)],
  };
};

export const toHeading = (el: Element, level: HeadingLevel): HeadingElement => {
  return {
    type: "heading",
    level: level,
    children: el.children,
  };
};
