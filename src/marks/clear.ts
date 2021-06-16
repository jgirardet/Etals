import { lastIndexOf } from "lodash";
import { Children } from "react";
import { Editor, Element, Node, Operation, Path, Transforms } from "slate";
import { EtalsEditor } from "../core";
import { splitInThree } from "../api";
import {
  Command,
  Config,
  ConfigurablePluginAction,
  EtalsActionPluginContent,
  PluginAction,
  TElement,
} from "../types";

const clearMarksCommand: Command = ({ editor }) => {
  //console.log(Editor.marks(editor));
  //   for (const m in Editor.marks(editor)) {
  //     Editor.removeMark(editor, m);
  //   }
  if (!editor.selection) return;
  const sel = editor.selection;
  //   const start = sel.anchor;
  //   const end = sel.focus;
  const fragments = Node.fragment(editor, sel) as Element[];
  const cleared = fragments.reduce((prev, next) => {
    console.log(next);
    return [...prev, { ...next, children: [{ text: Node.string(next) }] }];
  }, [] as Element[]);

  //   const firstBlock = Node.get(editor, start.path);
  //   const endBlock = Node.get(editor, end.path);

  //   const firstC = cleared[0];
  //   let middleC: TElement[];
  //   let lastC;
  //   if (cleared.length === 2) {
  //     lastC = cleared[1];
  //   } else {
  //     lastC = cleared[cleared.length - 1];
  //   }
  //   if (cleared.length > 2) {
  //     middleC = cleared.slice(1, cleared.length - 1);
  //   } else {
  //     middleC = [];
  //   }
  const [start, middle, end] = splitInThree(cleared);

  if (start) Transforms.insertFragment(editor, [start]);
  else return;
  middle.forEach((el) => {
    Editor.insertNode(editor, el);
  });
  if (end) {
    Editor.insertNode(editor, end);
    Editor.deleteForward(editor);
  }
  //   Editor.insertBreak(editor);
  //   Editor.insertFragment(editor, [cleared[1]]);

  //   Transforms.delete(editor, {
  //     at: sel.anchor.path,
  //     distance: 1,
  //     unit: "block",
  //   });
  //   Transforms.select(editor, parentStart);
  //   Transforms.setNodes(editor, {
  //     from: start.path,
  //     to: end.path,
  //     pass: (entry) => {
  //       console.log(entry);
  //       return true;
  //     },
  //   });
  //t(start.path) });
  //Transforms.splitNodes(editor);
  //Transforms.delete(editor, { at: editor.selection! });
  //Transforms.collapse(editor);
  //cleared.forEach((p) => Transforms.insertFragment(editor, [p]));
  //   Transforms.insertFragment(editor, cleared);
};
const clearMarksAction: PluginAction = {
  name: "clearMarks",
  command: clearMarksCommand,
  hotkeys: [{ layout: "base", hotkey: "mod+," }],
};

export const etalsClearMarks = (_config: Config): EtalsActionPluginContent => {
  return {
    kind: "action",
    actions: [clearMarksAction],
  };
};
