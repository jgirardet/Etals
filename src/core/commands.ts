import { getElement, toggleMark } from ".";
import { Command, CommandParams, EtalsTextKeys } from "../types";
import { ReactEditor } from "slate-react";
import { hasMarkValue } from "./queries";

/*
getToggleMarkCommand
Given a key, returns a Command which toggle Mark true/none
*/
export const getToggleMarkCommand =
  (key: EtalsTextKeys): Command =>
  ({ editor }) => {
    toggleMark(editor, key);
  };

/*
getToggleMarkValueCommands
Given an array of string and a key, return every possible toggleMark command
*/
export const getToggleMarkValueCommands = (
  mark: EtalsTextKeys,
  values: string[]
): Command[] =>
  values.map((val) => ({ editor }: CommandParams) => {
    toggleMark(editor, mark, val);
  });

// /*
// getToggleMarkValueCommandsWithOptions
// Given an array of string and a key, return every possible toggleMark command
// */
// export const getToggleMarkValueCommandsWithOptions =
//   (mark: EtalsTextKeys, options: string[]): Command =>
//   ({ editor, options }: CommandParams) => {
//     toggleMark(editor, mark, val);
//   };
