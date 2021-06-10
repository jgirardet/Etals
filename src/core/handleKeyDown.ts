import { lastIndexOf } from "lodash";
import React, { KeyboardEvent } from "react";
import { Editor } from "slate";
import {
  EtalsElementPluginContent,
  EtalsPluginContent,
  LayoutName,
  Layouts,
} from "../types";

const IS_MAC =
  typeof window != "undefined" &&
  /Mac|iPod|iPhone|iPad/.test(window.navigator.platform);

const getCheckHotkey = () => {
  const mod = IS_MAC ? "metaKey" : "ctrlKey";
  return (key: string, event: React.KeyboardEvent) => {
    const splitted = key.split("+");
    let last: string;
    if (key.includes("+")) {
      if (lastIndexOf(key, "+") !== key.length - 1) {
        last = splitted[splitted.length - 1];
      } else {
        last = "+";
      }
    } else {
      last = key;
    }

    return (
      event.altKey === key.includes("alt") &&
      event[mod] === key.includes("mod") &&
      event.shiftKey === key.includes("shift") &&
      event.key === last
    );
  };
};

// document.addEventListener("keydown", (ev: KeyboardEvent) => {
//   if (ev.ctrlKey) {
//     if (ev.key === "s") {
//       ev.preventDefault();
//       return true;
//     }
//   }
// });

/*
checkHotkey
check hotkey by key (caseSensitive) evalutating alt and ctrl (meta en mac)
use "mod" to handle ctrl or meta.
Evaluated key should always be the LAST character of the string
ex: 
checkHotkey("mod+a") => ctrl + a
checkHotkey("mod+A") => ctrl + maj + a
checkHotkey("mod+alt+A") => ctrl+ alt + maj + a
checkHotkey("a") => a
checkHotkey("mod+") => ctrl + +
checkHotkey("mod++") => ctrl + +
checkHotkey("mod+b+") => ctrl + +
*/
export const checkHotkey = getCheckHotkey();

/*
isKbdKey
Return true and block event if event.key isHotkey else return false.
*/
export const isKbdKey = (
  seq: string,
  event: KeyboardEvent,
  block?: boolean
): boolean => {
  console.log("block", block);
  if (block === undefined) block = true;
  if (checkHotkey(seq, event)) {
    block && event.preventDefault();
    return true;
  }
  return false;
};

/*
getHandleKeyDown
Given layouts and selected, return Editor's handleKeyDown handler
*/
export const getHandleKeyDown = (layouts: Layouts, selected: LayoutName) => {
  const layout = { ...layouts["base"], ...layouts[selected] };
  return (editor: Editor, event: KeyboardEvent) => {
    console.log(event);
    Object.entries(layout).forEach(([hotkey, action]) => {
      if (isKbdKey(hotkey, event, action.hotkey?.block))
        action.command({ editor, options: event });
    });
  };
};

/*
Get all layouts defined in plugin
*/
export const getLayouts = (
  plugins: Array<EtalsPluginContent | EtalsElementPluginContent>
): Layouts => {
  return plugins.reduce((res, plug) => {
    const { actions } = plug;
    if (!actions) return res;
    for (const action of actions) {
      const { hotkeys } = action;
      for (const { layout, hotkey } of hotkeys || []) {
        if (!res[layout]) res[layout] = {};
        res[layout][hotkey] = action;
      }
    }
    return res;
  }, {} as Layouts);
};
