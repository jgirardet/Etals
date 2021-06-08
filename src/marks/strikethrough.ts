import { styleMarkFactoryPlugin } from "../core";

export const MARK_STRIKETHROUGH = "strikethrough";

export type StrikethroughText = { [MARK_STRIKETHROUGH]: boolean };

export const etalsStrikethrough = styleMarkFactoryPlugin({
  key: MARK_STRIKETHROUGH,
  style: { textDecorationLine: "line-through" },
  hotkeys: [{ layout: "base", hotkey: "mod+é" }],
});
