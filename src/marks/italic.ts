import { styleMarkFactoryPlugin } from "../core";

export const MARK_ITALIC = "italic";

export type ItalicText = { [MARK_ITALIC]: boolean };

export const etalsItalic = styleMarkFactoryPlugin({
  key: MARK_ITALIC,
  style: { fontStyle: "italic" },
  hotkeys: [{ layout: "base", hotkey: "mod+i" }],
});
