import { lastIndexOf } from "lodash";
import React from "react";
import { Editor } from "slate";
import { EtalsPluginContent, LayoutName, Layouts } from "../types";

const IS_MAC =
  typeof window != "undefined" &&
  /Mac|iPod|iPhone|iPad/.test(window.navigator.platform);

const _checkHotkey = () => {
  const mod = IS_MAC ? "metaKey" : "ctrlKey";
  return (key: string, event: React.KeyboardEvent) => {
    const splitted = key.split("+");

    //special case of "+""
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

    let shift: boolean;
    const shiftPressed = event.shiftKey === key.includes("shift");
    if (event.shiftKey && last.toUpperCase() === event.key) {
      shift = true;
      last = last.toUpperCase();
    } else shift = shiftPressed;

    return (
      event.altKey === key.includes("alt") &&
      event[mod] === key.includes("mod") &&
      shift &&
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
check hotkey by key (caseSensitive) evalutating shift, alt and ctrl (meta en mac)
use "mod" to handle ctrl or meta.
Evaluated key should always be the LAST character of the string
ex: 
checkHotkey("mod+a") => ctrl + a
checkHotkey("mod+A") => Fails since shift should be pressed to get uppercassectrl+shift+a
checkHotkey("mod+shift+A") => ok
checkHotkey("mod+alt+a") => ctrl+ alt  + a
checkHotkey("mod+shift+alt+a") =>
checkHotkey("a") => a
checkHotkey("mod+") => ctrl + +
checkHotkey("mod++") => ctrl + +
checkHotkey("mod+b+") => ctrl + +
*/
export const checkHotkey = _checkHotkey();

/*
isKbdKey
Return true and block event if event.key isHotkey else return false.
*/
export const isKbdKey = (
  seq: string,
  event: React.KeyboardEvent,
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
  return (editor: Editor, event: React.KeyboardEvent) => {
    Object.entries(layout).forEach(([hotkey, action]) => {
      if (isKbdKey(hotkey, event, action.hotkey?.block))
        action.command({ editor, options: event });
    });
  };
};

/*
Get all layouts defined in plugin
*/
export const getLayouts = (plugins: Array<EtalsPluginContent>): Layouts => {
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
