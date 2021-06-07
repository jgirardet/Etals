import { Action, Hotkey, LayoutName, RenderLeaf, RenderElement } from "./core";
import { EtalsTextKeys } from "./customs";

export interface EtalsPlugin {
  key: EtalsTextKeys;
  renderLeaf?: RenderLeaf;
  actions?: PluginAction[];
}

export interface EtalsElementPlugin {
  type: string;
  renderElement: RenderElement;
  actions?: PluginAction[];
}

export interface PluginHotkey {
  layout: LayoutName;
  hotkey: Hotkey;
}

export interface PluginAction extends Action {
  hotkeys?: PluginHotkey[];
}
