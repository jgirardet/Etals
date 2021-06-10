import { Editor } from "slate";
import { EtalsTextKeys } from "../types";

export const getMark = (editor: Editor, mark: EtalsTextKeys): any => {
  const marks = Editor.marks(editor);
  if (marks) {
    if (mark in marks) {
      return marks[mark];
    }
  }
};

/*
hasMarkValue
Check if active marks have the exact value
*/
export const hasMarkValue = (
  editor: Editor,
  type: EtalsTextKeys,
  value: any
): boolean => {
  const marks = Editor.marks(editor);
  return marks ? marks[type] === value : false;
};
