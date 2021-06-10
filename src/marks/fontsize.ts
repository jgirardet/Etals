import { Editor } from "slate";
import { fontsize } from "../api/fontSize";
import {
  EtalsEditor,
  getMark,
  setValueMarkFactoryPlugin,
  toggleMark,
} from "../core";
import { CommandParams, Config, TEDITOR } from "../types";

export const MARK_FONT_SIZE = "fontSize";

export type FontSizeText = {
  [MARK_FONT_SIZE]: string;
};

const getChangeFontSize =
  (sens: "increase" | "decrease") =>
  ({ editor }: CommandParams) => {
    const actual = getMark(editor, MARK_FONT_SIZE);
    let newFontSize;
    if (actual) {
      newFontSize = fontsize(actual)[sens]();
    } else {
      const res = EtalsEditor.getElement(editor);
      if (!res) return;
      const [node, _] = res;
      if (node) {
        const res = EtalsEditor.getFormatValue(editor, node, "fontSize");
        if (res) {
          newFontSize = fontsize(res as string)[sens]();
        }
      }
    }
    if (newFontSize)
      toggleMark(editor, MARK_FONT_SIZE, newFontSize.fontSize!.toString());
  };

const increaseFontsizeAction = (_config: Config) => {
  return {
    name: "increaseFontSize",
    command: getChangeFontSize("increase"),
    hotkeys: [{ layout: "base", hotkey: "mod++" }],
  };
};

const decreaseFontsizeAction = (_config: Config) => {
  return {
    name: "decreaseFontSize",
    command: getChangeFontSize("decrease"),
    hotkeys: [{ layout: "base", hotkey: "mod+-" }],
  };
};

//------------------------- plugin -------------------------//

export const etalsFontSize = setValueMarkFactoryPlugin({
  mark: MARK_FONT_SIZE,
  actions: [increaseFontsizeAction, decreaseFontsizeAction],
});
