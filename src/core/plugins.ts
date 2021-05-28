import { CSSProperties } from "react";
import { getStyleMarkRenderLeaf, getToggleMarkCommand } from ".";
import {
  EtalsTextKeys,
  EtalsPlugin,
  PluginHotkey,
  PluginAction,
} from "../types";

export interface StyleMarkFactoryPlugin {
  key: EtalsTextKeys;
  style: CSSProperties;
  hotkeys?: PluginHotkey[];
  actions?: PluginAction[];
}

/*
styleMarkFactoryPlugin
build a simple style plugin
*/
export const styleMarkFactoryPlugin = ({
  key,
  style,
  hotkeys,
  actions,
}: StyleMarkFactoryPlugin): EtalsPlugin => {
  const _actions = actions || [
    {
      name: key,
      command: getToggleMarkCommand(key),
      hotkeys: hotkeys,
    },
  ];

  return {
    key: key,
    renderLeaf: getStyleMarkRenderLeaf(key, style),
    actions: _actions,
  };
};
