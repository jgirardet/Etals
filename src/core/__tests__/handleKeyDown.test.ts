import { expect } from "chai";
import React from "react";
import { checkHotkey } from "../handleKeyDown";
describe("checkHotKey", () => {
  it("check result", () => {
    const cases = [
      {
        tomatch: "mod+a",
        event: { key: "a", ctrlKey: true, altKey: false },
        res: true,
      },
      {
        tomatch: "mod+a+",
        event: { key: "a", ctrlKey: true, altKey: false },
        res: false,
      },
      {
        tomatch: "mod+A",
        event: { key: "a", ctrlKey: true, altKey: false },
        res: false,
      },
      {
        tomatch: "mod+A",
        event: { key: "A", ctrlKey: true, altKey: false },
        res: true,
      },
      {
        tomatch: "mod+alt+a",
        event: { key: "a", ctrlKey: true, altKey: true },
        res: true,
      },
      {
        tomatch: "mod+alt+a",
        event: { key: "a", ctrlKey: true, altKey: false },
        res: false,
      },
      {
        tomatch: "mod+alt+",
        event: { key: "+", ctrlKey: true, altKey: true },
        res: true,
      },
      {
        tomatch: "mod++",
        event: { key: "+", ctrlKey: true, altKey: false },
        res: true,
      },
    ];
    cases.forEach((el) => {
      expect(checkHotkey(el.tomatch, el.event as React.KeyboardEvent)).equal(
        el.res
      );
    });
  });
});
