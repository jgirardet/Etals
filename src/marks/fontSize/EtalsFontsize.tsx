import React from "react";
import { RenderLeafProps } from "slate-react";
import { fontsize } from "../../api/fontSize";
import { getToggleMarkValueCommands, toggleMark } from "../../core";
import { CommandParams, EtalsPlugin, PluginAction } from "../../types";
//import { fontSizeRenderLeaf } from ".";

export const MARK_FONT_SIZE = "fontsize";

export type FontSizeText = {
  [MARK_FONT_SIZE]: string;
};

export const setFontSizeCommand = ({ editor, options }: CommandParams) => {
  const { fontSize } = options;
  toggleMark(editor, MARK_FONT_SIZE, "30em");
};


export const setFontSizeAction: PluginAction = {
  name: "fontsize",
  command: setFontSizeCommand,
  hotkeys: [{ layout: "base", hotkey: "mod+n" }],
};

const fontSizeRenderLeaf = (props: RenderLeafProps) => {
  const val = props.leaf[MARK_FONT_SIZE];
  return val ? (
    <span {...props.attributes} style={{ fontSize: val }}>
      {props.children}
    </span>
  ) : (
    props.children
  );
};
export const etalsFontSize: EtalsPlugin = {
  key: MARK_FONT_SIZE,
  renderLeaf: fontSizeRenderLeaf,
  actions: [setFontSizeAction],
};
