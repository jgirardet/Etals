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
  {
    type: "paragraph",
    children: [
      { text: " la 1 em", fontsize: "1em" },
      { text: " la 2 em", fontsize: "2em" },
    ],
  },
  {
    type: "paragraph",
    children: [{ text: "paragraph" }],
  },
  {
    type: "heading",
    level: 1,
    children: [{ text: " le h1" }],
  },
  {
    type: "heading",
    level: 2,
    children: [{ text: " le h2" }],
  },
  {
    type: "heading",
    level: 3,
    children: [{ text: " le h3" }],
  },
  {
    type: "heading",
    level: 4,
    children: [{ text: " le h4" }],
  },
  {
    type: "heading",
    level: 5,
    children: [{ text: " le h5" }],
  },
  {
    type: "heading",
    level: 6,
    children: [{ text: " le h6" }],
  },
];

ReactDOM.render(
  <React.StrictMode>
    <Etals initialValue={initialv as Descendant[]} />
  </React.StrictMode>,
  document.getElementById("root")
);
