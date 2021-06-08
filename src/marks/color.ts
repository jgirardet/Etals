import { Editor } from "slate";
import { getSetMarkValueCommand, setValueMarkFactoryPlugin } from "../core";
import { CommandParams, PluginAction } from "../types";

export const MARK_COLOR = "color";

export type ColorText = {
  [MARK_COLOR]: string;
};

const _etalsColor = setValueMarkFactoryPlugin({
  mark: MARK_COLOR,
});

const setPrimaryColorAction: PluginAction = {
  name: "setPrimaryColor",
  command: getSetMarkValueCommand(MARK_COLOR, "#FF3860"),
  hotkeys: [
    { layout: "base", hotkey: "mod+j" },
    { layout: "bépo", hotkey: "mod+d" },
  ],
};
const setSecondaryColorAction: PluginAction = {
  name: "setSecondaryColor",
  command: getSetMarkValueCommand(MARK_COLOR, "#044cd3"),
  hotkeys: [
    { layout: "base", hotkey: "mod+k" },
    { layout: "bépo", hotkey: "mod+l" },
  ],
};
const setTertiaryColorAction: PluginAction = {
  name: "setTertiaryColor",
  command: getSetMarkValueCommand(MARK_COLOR, "#15b168"),
  hotkeys: [
    { layout: "base", hotkey: "mod+l" },
    { layout: "bépo", hotkey: "mod+n" },
  ],
};
const clearColorAction: PluginAction = {
  name: "clearColor",
  command: ({ editor }: CommandParams) => Editor.removeMark(editor, MARK_COLOR),
  hotkeys: [
    { layout: "base", hotkey: "mod+m" },
    { layout: "bépo", hotkey: "mod+m" },
  ],
};

const actions = [
  ..._etalsColor.actions,
  setPrimaryColorAction,
  setSecondaryColorAction,
  setTertiaryColorAction,
  clearColorAction,
];

export const etalsColor = { ..._etalsColor, actions };
