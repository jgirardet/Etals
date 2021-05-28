import React from "react";
import { RenderLeafProps } from "slate-react";
import { getToggleMarkValueCommands} from "../../core";
import { EtalsPlugin, PluginAction } from "../../types";

export const MARK_SUB_SUPERSCRIPT = "subsuperscript";

export type SubSuperscriptText = {
  [MARK_SUB_SUPERSCRIPT]: "sub" | "super";
};

export const [subscriptCommand, superscriptCommand] =
  getToggleMarkValueCommands(MARK_SUB_SUPERSCRIPT, ["sub", "super"]);

export const subscriptAction: PluginAction = {
  name: "subscript",
  command: subscriptCommand,
  hotkeys: [{ layout: "base", hotkey: "mod+o" }],
};

export const superscriptAction: PluginAction = {
  name: "subperscript",
  command: superscriptCommand,
  hotkeys: [{ layout: "base", hotkey: "mod+d" }],
};

const subSuperscriptRenderLeaf = (props: RenderLeafProps) => {
  const val = props.leaf[MARK_SUB_SUPERSCRIPT];
  return (
    <span {...props.attributes} style={{ verticalAlign: val }}>
      {props.children}
    </span>
  );
};

export const etalsSubSuperscript: EtalsPlugin = {
  key: MARK_SUB_SUPERSCRIPT,
  renderLeaf: subSuperscriptRenderLeaf,
  actions: [subscriptAction, superscriptAction],
};
