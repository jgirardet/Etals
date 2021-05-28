import { styleMarkFactoryPlugin } from "../../core";

export const MARK_UNDERLINE = "underline";

export type UnderlineText = { [MARK_UNDERLINE]: boolean };

export const etalsUnderline = styleMarkFactoryPlugin({
  key: MARK_UNDERLINE,
  style: {
    textDecorationLine: "underline",
  },
  hotkeys: [{ layout: "base", hotkey: "mod+u" }],
});
