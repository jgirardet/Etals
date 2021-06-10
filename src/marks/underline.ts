import { styleMarkFactoryPlugin } from "../core";

export const MARK_UNDERLINE = "textDecorationLine__underline";

export type UnderlineText = { [MARK_UNDERLINE]: boolean };

export const etalsUnderline = styleMarkFactoryPlugin({
  mark: MARK_UNDERLINE,
  style: {
    textDecorationLine: "underline",
  },
  hotkeys: [{ layout: "base", hotkey: "mod+u" }],
});
