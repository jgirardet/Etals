import isHotkey from "is-hotkey";
import { KeyboardEvent } from "react";
import { Editor } from "slate";
import { EtalsPlugin, Layout, LayoutName, Layouts } from "../types";

/*
isKbdKey
Return true and block event if event.key isHotkey else return false.
*/
export const isKbdKey = (
  seq: string,
  event: KeyboardEvent,
  options = { block: true }
): boolean => {
  if (
    isHotkey(seq, { byKey: true })(event as unknown as globalThis.KeyboardEvent)
  ) {
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
  console.log(layout);

  return (editor: Editor, event: KeyboardEvent) => {
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
