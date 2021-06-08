import { CSSProperties } from "react";
import { getStyleMarkRenderLeaf, getToggleMarkCommand, toggleMark } from ".";
import {
  EtalsTextKeys,
  EtalsPlugin,
  PluginHotkey,
  PluginAction,
  CommandParams,
} from "../types";
import Editor from "slate";

import capitalize from "capitalize";
import { RenderLeafProps } from "slate-react";
import { getValueMarkRenderLeaf } from "./renderLeaf";
import { getSetMarkValueCommand } from "./commands";

export interface StyleMarkFactoryPlugin {
  key: EtalsTextKeys;
  style: CSSProperties;
  hotkeys?: PluginHotkey[];
  actions?: PluginAction[];
}

export interface ValueMarkFactoryPlugin {
  mark: EtalsTextKeys;
  style?: keyof CSSProperties;
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

/*
valueMarkFactoryPlugin
build a plugin with various values
*/
export const setValueMarkFactoryPlugin = ({
  mark,
  style,
  hotkeys,
}: ValueMarkFactoryPlugin): EtalsPlugin => {
  const setMarkCommand = ({ editor, options }: CommandParams) => {
    toggleMark(editor, mark, options);
  };
  const setMarkAction: PluginAction = {
    name: "set" + capitalize(mark.toString()),
    command: setMarkCommand,
    hotkeys: hotkeys,
  };

  return {
    key: mark,
    renderLeaf: getValueMarkRenderLeaf(mark, style),
    actions: [setMarkAction],
  };
};
