import { Editor } from "slate";
import { hasMarkValue } from ".";
import { EtalsTextKeys } from "../types";
import castArray from "lodash/castArray";

/*
toggleMark
Remove mark if already set to value else override active or add mark
*/
export const toggleMark = (
  editor: Editor,
  key: EtalsTextKeys,
  value: boolean | string = true,
  clear: EtalsTextKeys | EtalsTextKeys[] = []
) => {
  // if already the same, remove
  const hasValue = hasMarkValue(editor, key, value);
  if (hasValue) {
    editor.removeMark(key);
    return;
  }
  // clears needed
  const clears: string[] = castArray(clear);
  clears.forEach((item) => {
    editor.removeMark(item);
  });

  // add new or override existing
  editor.addMark(key, value);
};
