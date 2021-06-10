import { styleMarkFactoryPlugin } from "../core";

export const MARK_BOLD = "bold";

export type BoldText = { [MARK_BOLD]: boolean };

export const etalsBold = styleMarkFactoryPlugin({
  mark: MARK_BOLD,
  style: { fontWeight: "bold" },
  hotkeys: [{ layout: "base", hotkey: "mod+b" }],
});
