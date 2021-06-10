import React from "react";
import { getToggleMarkValueCommands } from "../core";
import {
  Config,
  EtalsMarkPluginContent,
  EtalsPlugin,
  PluginAction,
  RenderLeaf,
} from "../types";

//------------------------- types -------------------------//

export const MARK_SUB_SUPERSCRIPT = "subsuperscript";

export type SubSuperscriptText = {
  [MARK_SUB_SUPERSCRIPT]: "sub" | "super";
};

//------------------------- plugin -------------------------//

export const etalsSubSuperscript: EtalsPlugin = (
  _config: Config
): EtalsMarkPluginContent => {
  return {
    kind: "mark",
    key: MARK_SUB_SUPERSCRIPT,
    render: subSuperscriptRenderLeaf,
    actions: [subscriptAction, superscriptAction],
  };
};

//------------------------- render -------------------------//

const subSuperscriptRenderLeaf: RenderLeaf = (props) => {
  const val = props.leaf[MARK_SUB_SUPERSCRIPT];
  if (val) {
    const style =
      val === "sub"
        ? { bottom: "-0.25em" }
        : val === "super"
        ? { top: "-0.5em" }
        : undefined;
    return (
      <span
        {...props.attributes}
        style={{
          ...style,
          fontSize: "75%",
          lineHeight: 0,
          position: "relative",
        }}
      >
        {props.children}
      </span>
    );
  } else return props.children;
};

///------------------------- actions/commands -------------------------//

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
