import React from "react";
import { Editor, Transforms, Node } from "slate";

import { RenderElementProps } from "slate-react";
import { EtalsEditor } from "../../core";
import {
  Command,
  Config,
  ConfigurablePluginAction,
  EtalsElement,
  EtalsPlugin,
  FormatKeys,
  Formats,
  RenderElement,
} from "../../types";
import { newParagraph, toParagraph } from "./paragrapheElement";
import { Element } from "slate";

//------------------------- types -------------------------//

export const HeadingName = "heading";

export type HeadingType = typeof HeadingName;

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

export interface HeadingElement extends EtalsElement {
  type: HeadingType;
  level: HeadingLevel;
}

export interface HeadingProps extends RenderElementProps {
  element: HeadingElement;
}

//------------------------- plugin -------------------------//

export const etalsHeading: EtalsPlugin = (config: Config) => {
  return {
    kind: "element",
    key: HeadingName,
    render: getHeadingRender(config.formats),
    actions: [CycleHeadingAction(config), clearHeadingAction(config)],
  };
};

//------------------------- utils -------------------------//

export const toHeading = (el: Element, level: HeadingLevel): HeadingElement => {
  return {
    type: "heading",
    level: level,
    children: el.children,
  };
};

//------------------------- render -------------------------//

const getHeadingRender =
  (formats: Formats): RenderElement =>
  ({ element, children, attributes }) => {
    element = element as HeadingElement;
    const header = "h" + element.level;
    const style = formats[header as FormatKeys];

    return React.createElement(
      header,
      { ...attributes, style: style },
      children
    );
  };

//------------------------- actions/commands -------------------------//

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
