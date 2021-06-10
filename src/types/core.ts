import { Editor } from "slate";
import { RenderElementProps, RenderLeafProps } from "slate-react";
import { EtalsElementTypes, EtalsTextKeys, TText } from "./customs";
import React from "react";

export interface Action {
  name: ActionName;
  command: Command;
  hotkey?: PluginHotkey;
}

export type ActionName = string;

export type ActionTable = Record<ActionName, Action>;

export type Command = (params: CommandParams) => void;

export interface CommandParams {
  editor: Editor;
  options?: any;
}

export interface Config {
  formats: Formats;
}

export type Configurable<T> = (config: Config) => T;

export type ConfigurablePluginAction = Configurable<PluginAction>;

export interface EtalsElement {
  type: string;
  children: TText[];
}

export type EtalsPluginKind = "mark" | "element";

export type EtalsPlugin = (config: Config) => EtalsPluginContent;

export interface EtalsPluginContent {
  kind: EtalsPluginKind;
  key: EtalsTextKeys | EtalsElementTypes;
  render: RenderLeaf | RenderElement;
  actions: PluginAction[];
}

export interface EtalsMarkPluginContent extends EtalsPluginContent {
  kind: "mark";
  key: EtalsTextKeys;
  render: RenderLeaf;
}

export interface EtalsElementPluginContent<T extends RenderElementProps>
  extends EtalsPluginContent {
  kind: "element";
  key: EtalsElementTypes;
  render: RenderElement;
}

export type FormatProperties = Pick<
  React.CSSProperties,
  | "fontSize"
  | "textDecorationLine"
  | "textDecorationStyle"
  | "textDecorationColor"
  | "color"
  | "textTransform"
  | "fontWeight"
  | "fontFamily"
>;

export type FormatKeys = "h1" | "h2" | "h3" | "h4" | "default";

export type Formats = Record<FormatKeys, FormatProperties>;

export type Hotkey = string;

export type EditorPlugin = <T extends Editor>(editor: T) => T;

export type Layout = Record<Hotkey, Action>;

export type LayoutName = string;

export type Layouts = Record<LayoutName, Layout>;

export interface PluginAction extends Omit<Action, "hotkey"> {
  hotkeys?: PluginHotkey[];
}

export interface PluginHotkey {
  layout: LayoutName;
  hotkey: Hotkey;
  block?: boolean;
}

export type RenderLeaf = (props: RenderLeafProps) => JSX.Element;
export type RenderElement = (props: RenderElementProps) => JSX.Element;
