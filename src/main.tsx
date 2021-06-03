import React from "react";
import ReactDOM from "react-dom";
import { Descendant } from "slate";
import { Etals } from "./etals";

const initialv = [
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
];

ReactDOM.render(
  <React.StrictMode>
    <Etals initialValue={initialv as Descendant[]} />
  </React.StrictMode>,
  document.getElementById("root")
);
