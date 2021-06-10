import { styleMarkFactoryPlugin } from "../core";

export const MARK_ITALIC = "italic";

export type ItalicText = { [MARK_ITALIC]: boolean };

export const etalsItalic = styleMarkFactoryPlugin({
  mark: MARK_ITALIC,
  style: { fontStyle: "italic" },
  hotkeys: [{ layout: "base", hotkey: "mod+i" }],
});
