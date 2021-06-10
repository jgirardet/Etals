import React from "react";

import { RenderElementProps } from "slate-react";
import {
  EtalsElementPluginContent,
  EtalsPluginContent,
  Formats,
  RenderElement,
} from "../types";

export const getRenderDefault =
  (formats: Formats): RenderElement =>
  ({ children, attributes }) => {
    return (
      <p {...attributes} style={formats["default"]}>
        {children}
      </p>
    );
  };

/*
getRenderElement
handle every elements
*/
export const getRenderElement = (
  plugins: EtalsPluginContent[],
  formats: Formats
) => {
  const elementPlugins = plugins.filter(
    (p) => p.kind === "element"
  ) as EtalsElementPluginContent<any>[];
  return (props: RenderElementProps) => {
    for (const plug of elementPlugins)
      if (plug.key === props.element.type) return plug.render(props);
    const RenderDefault = getRenderDefault(formats);
    return <RenderDefault {...props} />;
  };
};
