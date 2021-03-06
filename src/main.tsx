import React from "react";
import ReactDOM from "react-dom";
import { Descendant } from "slate";
import { Etals } from "./etals";

const initialv = [
  {
    type: "paragraph",
    children: [{ text: "aa", fontSize: "1.2rem" }],
  },
  {
    type: "paragraph",
    children: [
      { text: " bold", bold: true, fontSize: "1.2rem" },
      { text: " italic", italic: true, fontSize: "1.2rem" },
      {
        text: " underline",
        textDecorationLine__underline: true,
        fontSize: "1.2rem",
      },
      { text: " subscript", subsuperscript: "sub" },
      { text: " superscript", subsuperscript: "super" },
      {
        text: " italic, bold, underline ",
        bold: true,
        italic: true,
        textDecorationLine__underline: true,
        fontSize: "1.2rem",
      },
    ],
  },
  {
    type: "paragraph",
    children: [
      { text: " la 1 rem", fontSize: "1rem" },
      { text: " la 2 rem", fontSize: "2rem" },
    ],
  },
  {
    type: "paragraph",
    children: [
      { text: "red", color: "red" },
      { text: " #ligthgreen", color: "lightgreen" },
      { text: " #121d6d", color: "#121d6d" },
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
    children: [{ text: " le h 3" }],
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
