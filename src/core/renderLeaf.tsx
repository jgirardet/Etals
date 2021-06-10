import React, { CSSProperties } from "react";
import { RenderLeafProps } from "slate-react";
import {
  EtalsTextKeys,
  EtalsPluginContent,
  EtalsMarkPluginContent,
} from "../types";

/*
getRenderLeaf
Component to handle every leaf render from plugins
*/
export const getRenderLeaf = (plugins: EtalsPluginContent[]) => {
  const leafPlugins = plugins.filter(
    (p) => p.kind === "mark"
  ) as EtalsMarkPluginContent[];
  return (props: RenderLeafProps) => {
    const Leafed = leafPlugins.reduce((prev, next) => {
      const children = next.render ? next.render(prev) : prev.children;
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
