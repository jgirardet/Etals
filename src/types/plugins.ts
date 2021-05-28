import { Editor } from "slate";
import {
  Action,
  Command,
  Hotkey,
  Layout,
  LayoutName,
  RenderLeaf,
} from "./core";
import { EtalsTextKeys } from "./customs";

export interface EtalsPlugin {
  key: EtalsTextKeys;
  renderLeaf?: RenderLeaf;
  actions?: PluginAction[];
}


export interface PluginHotkey {
  layout: LayoutName;
  hotkey: Hotkey;
}

export interface PluginAction extends Action {
  hotkeys?: PluginHotkey[];
}
