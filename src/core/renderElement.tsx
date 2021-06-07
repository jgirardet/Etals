import React from "react";

import { RenderElementProps } from "slate-react";
import { EtalsElementPlugin, Formats, RenderElement } from "../types";

export const getRenderDefault =
  (formats: Formats): RenderElement =>
  ({ children, attributes, element }) => {

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
  plugins: EtalsElementPlugin[],
  formats: Formats
) => {
  return (props: RenderElementProps) => {
    for (const plug of plugins)
      if (plug.type === props.element.type) return plug.renderElement(props);
    const RenderDefault = getRenderDefault(formats);
    return <RenderDefault {...props} />;
  };
};
