import { CSSProperties } from "react";
import { getStyleMarkRenderLeaf, getToggleMarkCommand, toggleMark } from ".";
import {
  EtalsTextKeys,
  EtalsPlugin,
  PluginHotkey,
  PluginAction,
  CommandParams,
  Config,
  Configurable,
} from "../types";

import capitalize from "capitalize";
import { getValueMarkRenderLeaf } from "./renderLeaf";

export interface FactoryPluginInterface {
  mark: EtalsTextKeys;
  actions: Configurable<PluginAction>[];
  style?: keyof CSSProperties;
  hotkeys?: PluginHotkey[];
}

export interface ToggleMarkFactoryPlugin {
  mark: EtalsTextKeys;
  actions?: Configurable<PluginAction>[];
  style: React.CSSProperties;
  hotkeys?: PluginHotkey[];
}

/*
styleMarkFactoryPlugin
build a simple style plugin
*/
export const styleMarkFactoryPlugin = ({
  mark,
  style,
  hotkeys,
  actions,
}: ToggleMarkFactoryPlugin): EtalsPlugin => {
  const _actions: Configurable<PluginAction>[] = actions || [
    (config: Config) => {
      return {
        name: mark,
        command: getToggleMarkCommand(mark),
        hotkeys: hotkeys,
      };
    },
  ];

  return (config: Config) => {
    return {
      mark,
      renderLeaf: getStyleMarkRenderLeaf(mark, style),
      actions: [..._actions.map((x) => x(config))],
    };
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
  actions,
}: FactoryPluginInterface): EtalsPlugin => {
  const setMarkCommand = ({ editor, options }: CommandParams) => {
    toggleMark(editor, mark, options);
  };
  const setMarkAction: PluginAction = {
    name: "set" + capitalize(mark.toString()),
    command: setMarkCommand,
    hotkeys: hotkeys,
  };

  return (config: Config) => {
    return {
      mark: mark,
      renderLeaf: getValueMarkRenderLeaf(mark, style),
      actions: [setMarkAction, ...actions.map((x) => x(config))],
    };
  };
};
