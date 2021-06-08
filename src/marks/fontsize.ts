import { Editor } from "slate";
import { fontsize } from "../api/fontSize";
import { setValueMarkFactoryPlugin, toggleMark } from "../core";
import { CommandParams, PluginAction } from "../types";

export const MARK_FONT_SIZE = "fontSize";

export type FontSizeText = {
  [MARK_FONT_SIZE]: string;
};

const getChangeFontSize =
  (sens: "increase" | "decrease") =>
  ({ editor }: CommandParams) => {
    const marks = Editor.marks(editor);
    if (marks) {
      const actual = marks["fontSize"];
      if (actual) {
        const newFontSize = fontsize(actual)[sens]();
        toggleMark(editor, MARK_FONT_SIZE, newFontSize.fontSize?.toString());
      }
    }
  };

const increaseFontsizeAction: PluginAction = {
  name: "increaseFontSize",
  command: getChangeFontSize("increase"),
  hotkeys: [{ layout: "base", hotkey: "mod++" }],
};

const decreaseFontsizeAction: PluginAction = {
  name: "decreaseFontSize",
  command: getChangeFontSize("decrease"),
  hotkeys: [{ layout: "base", hotkey: "mod+-" }],
};

const _etalsFontSize = setValueMarkFactoryPlugin({
  mark: MARK_FONT_SIZE,
  hotkeys: [],
});

const actions = [
  ..._etalsFontSize.actions,
  increaseFontsizeAction,
  decreaseFontsizeAction,
];

export const etalsFontSize = {
  ..._etalsFontSize,
  actions,
};
