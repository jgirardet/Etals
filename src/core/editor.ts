import { createEditor } from "slate";
import { EditorPlugin } from "../types";

/*
mixEditor: create Slate Editor from specified plugins
*/
export const mixEditor = (editors: EditorPlugin[]) => {
  return editors.reduce((prev, next) => next(prev), createEditor());
};
