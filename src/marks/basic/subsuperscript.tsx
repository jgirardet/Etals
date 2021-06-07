import React from "react";
import { RenderLeafProps } from "slate-react";
import { getElement, getToggleMarkValueCommands } from "../../core";
import { EtalsPlugin, PluginAction } from "../../types";
import { Node } from "slate";

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
  // const [an, b] = [...Node.nodes(props.leaf)];
  // console.log([...Node.elements(props.leaf)]);
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
          //verticalAlign: val,
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

export const etalsSubSuperscript: EtalsPlugin = {
  key: MARK_SUB_SUPERSCRIPT,
  renderLeaf: subSuperscriptRenderLeaf,
  actions: [subscriptAction, superscriptAction],
};

// sub,
// sup {
//   font-size: 75%;
//   line-height: 0;
//   position: relative;
//   vertical-align: baseline;
// }

// sub {
//   bottom: -0.25em;
// }

// sup {
//   top: -0.5em;
// }
