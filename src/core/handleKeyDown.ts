import React, { KeyboardEvent } from "react";
import { Editor } from "slate";
import { EtalsPlugin, Layout, LayoutName, Layouts } from "../types";

const IS_MAC =
  typeof window != "undefined" &&
  /Mac|iPod|iPhone|iPad/.test(window.navigator.platform);

const getCheckHotkey = () => {
  const mod = IS_MAC ? "metaKey" : "ctrlKey";
  return (key: string, event: React.KeyboardEvent) => {
    return (
      event.altKey === key.includes("alt") &&
      event[mod] === key.includes("mod") &&
      event.key === key[key.length - 1]
    );
  };
};

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
  options = { block: true }
): boolean => {
  if (checkHotkey(seq, event)) {
    options && options.block && event.preventDefault();
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
    console.log(event.key);
    Object.entries(layout).forEach(([hotkey, action]) => {
      if (isKbdKey(hotkey, event)) action.command({ editor, options: event });
    });
  };
};

/*
Get all layouts defined in plugin
*/
export const getLayouts = (plugins: EtalsPlugin[]): Layouts => {
  return plugins.reduce((res, plug) => {
    const { actions } = plug;
    if (!actions) return res;
    for (const { name, command, hotkeys } of actions) {
      for (const { layout, hotkey } of hotkeys || []) {
        if (!res[layout]) res[layout] = {};
        res[layout][hotkey] = { name, command, hotkey };
      }
    }
    return res;
  }, {} as Layouts);
};
