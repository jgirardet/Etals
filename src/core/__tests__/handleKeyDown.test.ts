import { expect } from "chai";
import React from "react";
import { checkHotkey } from "../handleKeyDown";
describe("checkHotKey", () => {
  it("check result", () => {
    const cases = [
      {
        tomatch: "mod+a",
        event: { key: "a", ctrlKey: true, shiftKey: false, altKey: false },
        res: true,
      },
      {
        tomatch: "mod+a+",
        event: { key: "a", ctrlKey: true, shiftKey: false, altKey: false },
        res: false,
      },
      {
        tomatch: "mod+A",
        event: { key: "a", ctrlKey: true, shiftKey: false, altKey: false },
        res: false,
      },
      {
        tomatch: "mod+A",
        event: { key: "A", ctrlKey: true, shiftKey: true, altKey: false },
        res: true,
      },
      {
        tomatch: "mod+shift+A",
        event: { key: "A", ctrlKey: true, shiftKey: true, altKey: false },
        res: true,
      },
      {
        tomatch: "mod+shift+a",
        event: { key: "A", ctrlKey: true, shiftKey: true, altKey: false },
        res: true,
      },
      {
        tomatch: "mod+alt+a",
        event: { key: "a", ctrlKey: true, shiftKey: false, altKey: true },
        res: true,
      },
      {
        tomatch: "mod+alt+a",
        event: { key: "a", ctrlKey: true, shiftKey: false, altKey: false },
        res: false,
      },
      {
        tomatch: "mod+alt+",
        event: { key: "+", ctrlKey: true, shiftKey: false, altKey: true },
        res: true,
      },
      {
        tomatch: "mod++",
        event: { key: "+", ctrlKey: true, shiftKey: false, altKey: false },
        res: true,
      },
      {
        tomatch: "+",
        event: { key: "+", ctrlKey: false, shiftKey: false, altKey: false },
        res: true,
      },
      {
        tomatch: "mod++",
        event: { key: "+", ctrlKey: true, shiftKey: true, altKey: false },
        res: true,
      },
      {
        tomatch: "mod+shift+",
        event: { key: "+", ctrlKey: true, shiftKey: true, altKey: false },
        res: true,
      },
      {
        tomatch: "Enter",
        event: { key: "Enter", ctrlKey: false, shiftKey: false, altKey: false },
        res: true,
      },
      {
        tomatch: "Enter",
        event: { key: "Enter", ctrlKey: false, shiftKey: true, altKey: false },
        res: false,
      },
      {
        tomatch: "shift+Enter",
        event: { key: "Enter", ctrlKey: false, shiftKey: true, altKey: false },
        res: true,
      },
    ];
    cases.forEach((el) => {
      console.log(el);
      expect(checkHotkey(el.tomatch, el.event as React.KeyboardEvent)).equal(
        el.res
      );
    });
  });
});
