import React, { CSSProperties } from "react";
import { RenderLeafProps } from "slate-react";
import {
  EtalsTextKeys,
  EtalsPlugin,
  EtalsText,
  RenderLeaf,
  TText,
} from "../types";

/*
MainRenderLeaf
Component to handle every leaf render from plugins
*/
export const getRenderLeaf = (plugins: EtalsPlugin[]) => {
  return (props: RenderLeafProps) => {
    const leafed = plugins.reduce((prev, next) => {
      const children = next.renderLeaf ? next.renderLeaf(prev) : prev.children;
      return {
        ...prev,
        children: children,
      };
    }, props);
    return leafed.children;
  };
};

/*
getStyleMarkRenderLeaf
Leaf Factory which only update `style` attribute
*/
export const getStyleMarkRenderLeaf =
  (key: EtalsTextKeys, style: CSSProperties) =>
  ({ leaf, attributes, children }: RenderLeafProps) => {
    if (leaf[key]) {
      return (
        <span {...attributes} style={style}>
          {children}
        </span>
      );
    }
    return children;
  };
