import { Editor } from "slate";
import { EtalsTextKeys } from "../types";

// export const isMarkActive = (editor: Editor, type: EtalsTextKeys): boolean => {
//   const marks = Editor.marks(editor);
//   return marks ? !!marks[type] : false;
// };

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
