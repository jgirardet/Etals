import React, { KeyboardEvent, KeyboardEventHandler, useState } from "react";
import { Descendant } from "slate";
import { withHistory } from "slate-history";
import { Editable, Slate, withReact } from "slate-react";
import {
  getLayouts,
  getHandleKeyDown,
  getRenderLeaf,
  mixEditor,
} from "../core";
import {
  etalsBold,
  etalsItalic,
  etalsUnderline,
  etalsStrikethrough,
  etalsSubSuperscript,
} from "../marks";

const editor = mixEditor([withReact, withHistory]);
const plugins = [
  etalsBold,
  etalsItalic,
  etalsUnderline,
  etalsStrikethrough,
  etalsSubSuperscript,
];
const RenderLeaf = getRenderLeaf(plugins);
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
        <Editable renderLeaf={RenderLeaf} onKeyDown={onKeyDown} />
      </Slate>
    </div>
  );
};
