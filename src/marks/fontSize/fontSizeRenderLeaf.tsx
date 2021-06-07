import React from "react";

import { RenderLeafProps } from "slate-react";
export const fontSizeRenderLeaf = (props: RenderLeafProps) => {
  const val = props.leaf["fontsize"];
  return val ? (
    <span {...props.attributes} style={{ fontSize: val }}>
      {props.children}
    </span>
  ) : (
    props.children
  );
};
