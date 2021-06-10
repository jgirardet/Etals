import { Editor } from "slate";
import { getSetMarkValueCommand, setValueMarkFactoryPlugin } from "../core";
import { CommandParams, Config } from "../types";

//------------------------- types -------------------------//

export const MARK_COLOR = "color";

export type ColorText = {
  [MARK_COLOR]: string;
};

//------------------------- actions/commands -------------------------//

const setPrimaryColorAction = (_config: Config) => {
  return {
    name: "setPrimaryColor",
    command: getSetMarkValueCommand(MARK_COLOR, "#FF3860"),
    hotkeys: [
      { layout: "base", hotkey: "mod+j" },
      { layout: "bépo", hotkey: "mod+d" },
    ],
  };
};
const setSecondaryColorAction = (_config: Config) => {
  return {
    name: "setSecondaryColor",
    command: getSetMarkValueCommand(MARK_COLOR, "#044cd3"),
    hotkeys: [
      { layout: "base", hotkey: "mod+k" },
      { layout: "bépo", hotkey: "mod+l" },
    ],
  };
};
const setTertiaryColorAction = (_config: Config) => {
  return {
    name: "setTertiaryColor",
    command: getSetMarkValueCommand(MARK_COLOR, "#15b168"),
    hotkeys: [
      { layout: "base", hotkey: "mod+l" },
      { layout: "bépo", hotkey: "mod+n" },
    ],
  };
};
const clearColorAction = (_config: Config) => {
  return {
    name: "clearColor",
    command: ({ editor }: CommandParams) =>
      Editor.removeMark(editor, MARK_COLOR),
    hotkeys: [
      { layout: "base", hotkey: "mod+m" },
      { layout: "bépo", hotkey: "mod+m" },
    ],
  };
};

//------------------------- plugin -------------------------//

export const etalsColor = setValueMarkFactoryPlugin({
  mark: MARK_COLOR,
  actions: [
    setPrimaryColorAction,
    setSecondaryColorAction,
    setTertiaryColorAction,
    clearColorAction,
  ],
});
