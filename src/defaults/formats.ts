import { Formats } from "../types";

export const defaultFontFamily = "verdana";

export const defaultFormats: Formats = {
  h1: {
    color: "#FF3860",
    textDecorationLine: "underline",
    textDecorationStyle: "solid",
    textDecorationColor: "#FF3860",
    textTransform: "uppercase",
    fontSize: "2.5rem",
    fontWeight: 500,
    fontFamily: defaultFontFamily,
  },
  h2: {
    color: "#15b168",
    textDecorationLine: "underline",
    textDecorationStyle: "solid",
    textDecorationColor: "#15b168",
    textTransform: "capitalize",
    fontSize: "2.3rem",
    fontWeight: 500,
    fontFamily: defaultFontFamily,
  },
  h3: {
    color: "#044cd3",
    textDecorationLine: "underline",
    textDecorationStyle: "solid",
    textDecorationColor: "#044cd3",
    fontSize: "2.1rem",
    fontWeight: 500,
    fontFamily: defaultFontFamily,
  },
  h4: {
    color: "#faad1d",
    textDecorationLine: "underline",
    textDecorationStyle: "solid",
    textDecorationColor: "#faad1d",
    fontSize: "1.9rem",
    fontWeight: 500,
    fontFamily: defaultFontFamily,
  },
  default: {
    color: "#444444",
    fontSize: "1.3rem",
    fontWeight: 200,
    fontFamily: defaultFontFamily,
  },
};
