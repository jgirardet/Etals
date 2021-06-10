import { createEditor, Element, Node, Path, Text } from "slate";
import {
  EditorPlugin,
  EtalsPlugin,
  FormatKeys,
  FormatProperties,
} from "../types";

import { BaseEditor, Editor } from "slate";
import { Config } from "../types";
import React, { CSSProperties } from "react";
import {
  getHandleKeyDown,
  getLayouts,
  getRenderElement,
  getRenderLeaf,
} from ".";

/*
mixEditor: create Slate Editor from specified plugins
*/
export const mixEditor = (editors: EditorPlugin[]) => {
  return editors.reduce((prev, next) => next(prev), createEditor());
};

export const initializePlugins = (
  disabledPlugins: EtalsPlugin[],
  config: Config
) => {
  const plugins = disabledPlugins.map((x) => x(config));
  const renderElement = getRenderElement(plugins, config.formats);
  const renderLeaf = getRenderLeaf(plugins);
  const layouts = getLayouts(plugins);
  const onKeyDown = getHandleKeyDown(layouts, "bépo");

  return { renderLeaf, renderElement, onKeyDown };
};

export interface EtalsEditor extends BaseEditor {
  config: Config;
  getElement: (editor: EtalsEditor) => Element | undefined;
  getFormatValue: (
    editor: Editor,
    element: Element,
    key: keyof FormatProperties
  ) => CSSProperties;
  // getElementLength: (editor: Editor, element: Element) => number;
}

export const EtalsEditor = {
  getElement: (editor: Editor): [Element, Path] | undefined => {
    if (editor.selection) {
      const active_path = editor.selection.anchor.path;
      const nodes = Node.ancestors(editor, active_path);
      for (const [node, path] of nodes) {
        if (Element.isElement(node)) {
          return [node, path];
        }
      }
    }
  },
  getFormatValue: (
    editor: Editor,
    element: Element,
    key: keyof FormatProperties
  ) => {
    let level: FormatKeys = "default";
    if (element.type === "heading") {
      const lev = element.level;
      level = ("h" + lev.toString()) as FormatKeys;
    }
    return editor.config.formats[level][key as keyof FormatProperties];
  },
};

// getElementLength: (editor: Editor, element: Element) => {
//   const res = [...Node.texts(element)];

//   const strings = res.map((x) => x[0].text);
//   return "".concat(...strings).length;
// };

export const withEtals =
  (config: Config) =>
  <T extends EtalsEditor>(editor: T) => {
    const e = editor as T & EtalsEditor;

    e.config = config;
    return e;
  };
