import React, { CSSProperties } from "react";
import { RenderLeafProps } from "slate-react";
import { EtalsTextKeys, EtalsPlugin } from "../types";

/*
getRenderLeaf
Component to handle every leaf render from plugins
*/
export const getRenderLeaf = (plugins: EtalsPlugin[]) => {
  return (props: RenderLeafProps) => {
    const Leafed = plugins.reduce((prev, next) => {
      const children = next.renderLeaf ? next.renderLeaf(prev) : prev.children;
      return {
        ...prev,
        children: children,
      };
    }, props);
    return <span {...Leafed.attributes}>{Leafed.children}</span>;
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

/*
getValueMarkRenderLeaf
Leaf Factory which only update `style` attribute with mark value
*/
export const getValueMarkRenderLeaf =
  (mark: EtalsTextKeys, style?: keyof React.CSSProperties) =>
  (props: RenderLeafProps) => {
    const cssstyle = style ?? mark;
    const val = props.leaf[mark];
    return val ? (
      <span {...props.attributes} style={{ [cssstyle]: val }}>
        {props.children}
      </span>
    ) : (
      props.children
    );
  };
