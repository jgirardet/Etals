import React, { KeyboardEvent, KeyboardEventHandler, useState } from "react";
import { Descendant } from "slate";
import { withHistory } from "slate-history";
import { Editable, Slate, withReact } from "slate-react";
import {
  getLayouts,
  getHandleKeyDown,
  getRenderLeaf,
  mixEditor,
  getRenderElement,
} from "../core";
import { etalsHeading, etalsParagraph } from "../elements";
import {
  etalsBold,
  etalsItalic,
  etalsUnderline,
  etalsStrikethrough,
  etalsSubSuperscript,
  etalsFontSize,
} from "../marks";
import { EtalsElementPlugin } from "../types";
import { defaultFormats } from "../defaults";
import "../assets/reset-editor-css.css";

const editor = mixEditor([withReact, withHistory]);
const plugins = [
  etalsBold,
  etalsItalic,
  etalsUnderline,
  etalsStrikethrough,
  etalsSubSuperscript,
  etalsFontSize,
];

const elementPlugins: EtalsElementPlugin[] = [
  etalsParagraph(defaultFormats),
  etalsHeading(defaultFormats),
];
const MainRenderLeaf = getRenderLeaf(plugins);
const MainRenderElement = getRenderElement(elementPlugins, defaultFormats);
const layouts = getLayouts(plugins);
const handleKeyDown = getHandleKeyDown(layouts, "bepo");

export interface EtalsPros {
  initialValue?: Descendant[];
}

export const Etals = ({ initialValue }: EtalsPros): JSX.Element => {
  const [value, setValue] = useState<Descendant[]>(initialValue || []);
  const onChange = (val: Descendant[]) => setValue(val);
  const onKeyDown = (event: KeyboardEvent) => {
    handleKeyDown(editor, event as KeyboardEvent<any>);
  };
  return (
    <div className="etals">
      <Slate editor={editor} onChange={onChange} value={value}>
        <Editable
          className="editable-area"
          renderLeaf={MainRenderLeaf}
          renderElement={MainRenderElement}
          onKeyDown={onKeyDown}
        />
      </Slate>
    </div>
  );
};
