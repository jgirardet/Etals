import React, { KeyboardEvent, KeyboardEventHandler, useState } from "react";
import { Descendant } from "slate";
import { withHistory } from "slate-history";
import { Editable, Slate, withReact } from "slate-react";
import { getLayouts, getHandleKeyDown, getRenderLeaf, mixEditor } from "../core";
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
export const Etals = (): JSX.Element => {
  const [value, setValue] = useState<Descendant[]>([
    {
      type: "paragraph",
      children: [{ text: "aa" }],
    },
    {
      type: "paragraph",
      children: [
        { text: " bold", bold: true },
        { text: " italic", italic: true },
        { text: " underline", underline: true },
        { text: " subscript", subsuperscript: "sub" },
        { text: " superscript", subsuperscript: "super" },
        {
          text: " italic, bold, underline ",
          bold: true,
          italic: true,
          underline: true,
        },
      ],
    },
  ]);
  const onChange = (val: Descendant[]) => setValue(val);
  const onKeyDown = (event: KeyboardEvent) => {
    handleKeyDown(editor, event as KeyboardEvent<any>);
  };
  return (
    <Slate editor={editor} onChange={onChange} value={value}>
      <Editable renderLeaf={RenderLeaf} onKeyDown={onKeyDown} />
    </Slate>
  );
};
