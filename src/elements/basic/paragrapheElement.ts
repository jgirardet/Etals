import {
  Command,
  Config,
  ConfigurablePluginAction,
  EtalsElement,
} from "../../types";
import { Editor, Element, Transforms } from "slate";
import { getRenderDefault } from "../../core";
export const ParagraphName = "paragraph";
export type ParagraphType = typeof ParagraphName;

export interface ParagraphElement extends EtalsElement {
  type: ParagraphType;
}

export const etalsParagraph = (config: Config) => {
  return {
    type: ParagraphName,
    renderElement: getRenderDefault(config.formats),
    actions: [
      addParagraphAfterAction(config),
      addParagraphBeforeAction(config),
    ],
  };
};

export const toParagraph = (el: Element): ParagraphElement => {
  return { type: "paragraph", children: el.children };
};

const addParagraphAfter: Command = ({ editor }) => {
  const sel = editor.selection;
  if (!sel) return;
  Transforms.select(editor, Editor.end(editor, sel.anchor.path));
  Transforms.insertNodes(editor, newParagraph());
};

const addParagraphBefore: Command = ({ editor }) => {
  const sel = editor.selection;
  if (!sel) return;
  Transforms.select(editor, Editor.start(editor, sel.anchor.path));
  Transforms.insertNodes(editor, newParagraph());
};

const addParagraphAfterAction: ConfigurablePluginAction = (_config: Config) => {
  return {
    name: "addParagraphAfter",
    command: addParagraphAfter,
    hotkeys: [{ layout: "base", hotkey: "mod+Enter" }],
  };
};

const addParagraphBeforeAction: ConfigurablePluginAction = (
  _config: Config
) => {
  return {
    name: "addParagraphBefore",
    command: addParagraphBefore,
    hotkeys: [{ layout: "base", hotkey: "shift+Enter" }],
  };
};

export const newParagraph = (): ParagraphElement => {
  return {
    type: "paragraph",
    children: [{ text: "" }],
  };
};
