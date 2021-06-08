import { BaseElement, Editor } from "slate";
import { RenderElementProps, RenderLeafProps } from "slate-react";
import { EtalsTextKeys, TText } from "./customs";
import React from "react";

export interface Action {
  name: ActionName;
  command: Command;
  hotkey?: Hotkey;
}

export type ActionName = string;

export type ActionTable = Record<ActionName, Action>;

export type Command = (params: CommandParams) => void;

export interface CommandParams {
  editor: Editor;
  options?: any;
}

export interface EtalsElement {
  type: string;
  children: TText[];
}

export interface EtalsPlugin {
  key: EtalsTextKeys;
  renderLeaf?: RenderLeaf;
  actions: PluginAction[];
}

export type Formats = Record<string, React.CSSProperties>;

export type Hotkey = string;

export type EditorPlugin = <T extends Editor>(editor: T) => T;

export type Layout = Record<Hotkey, Action>;

export type LayoutName = string;

export type Layouts = Record<LayoutName, Layout>;

export interface PluginAction extends Action {
  hotkeys?: PluginHotkey[];
}

export interface PluginHotkey {
  layout: LayoutName;
  hotkey: Hotkey;
}

export type RenderLeaf = (props: RenderLeafProps) => JSX.Element;
export type RenderElement = (props: RenderElementProps) => JSX.Element;
