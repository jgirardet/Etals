import { mount, unmount } from "@cypress/react";
import React, { Children } from "react";
import { Descendant } from "slate";
import { withReact } from "slate-react";

import { Etals } from "..";
import {
  MARK_BOLD,
  MARK_ITALIC,
  MARK_UNDERLINE,
  MARK_STRIKETHROUGH,
  MARK_SUB_SUPERSCRIPT,
} from "../../marks";

const marked = [
  {
    children: [
      { text: MARK_BOLD + "\n", [MARK_BOLD]: true },
      { text: MARK_ITALIC + "\n", [MARK_ITALIC]: true },
      { text: MARK_UNDERLINE + "\n", [MARK_UNDERLINE]: true },
      { text: MARK_STRIKETHROUGH + "\n", [MARK_STRIKETHROUGH]: true },
      {
        text: MARK_SUB_SUPERSCRIPT + "sub ",
        [MARK_SUB_SUPERSCRIPT]: "sub",
      },
      { text: "normal " },
      {
        text: MARK_SUB_SUPERSCRIPT + "super" + "\n",
        [MARK_SUB_SUPERSCRIPT]: "super",
      },
    ],
  },
];

describe("test show marks", () => {
  beforeEach(() => {
    mount(<Etals initialValue={marked as Descendant[]} />);
  });
  it("should be bold", () => {
    cy.contains(MARK_BOLD).parent().should("have.css", "fontWeight", "700");
  });
  it("should be italic", () => {
    cy.contains(MARK_ITALIC).parent().should("have.css", "fontStyle", "italic");
  });
  it("should be underline", () => {
    cy.contains(MARK_UNDERLINE)
      .parent()
      .should("have.css", "textDecorationLine", "underline");
  });
  it("should be strikethrough", () => {
    cy.contains(MARK_STRIKETHROUGH)
      .parent()
      .should("have.css", "textDecorationLine", "line-through");
  });
  it("should be subscript", () => {
    cy.contains(MARK_SUB_SUPERSCRIPT + "sub")
      .parent()
      .should("have.css", "verticalAlign", "sub");
  });
  it("should be superscript", () => {
    cy.contains(MARK_SUB_SUPERSCRIPT + "super")
      .parent()
      .should("have.css", "verticalAlign", "super");
  });
});

describe("test keymap", () => {
  beforeEach(() => {
    mount(
      <Etals initialValue={[{ children: [{ text: "aa" }] }] as Descendant[]} />
    );
  });

  const test_click = (key: string, css: string[]) => {
    return cy
      .get(".etals")
      .click()
      .type("{selectAll}" + key, { delay: 100 })
      .find('[data-slate-leaf="true"]')
      .last()
      .should("have.css", ...css);
  };

  it("key bold", () => {
    test_click("{ctrl+b}", ["fontWeight", "700"]);
  });
  it("key italic", () => {
    test_click("{ctrl+i}", ["fontStyle", "italic"]);
  });
  it("key underline", () => {
    test_click("{ctrl+u}", ["textDecorationLine", "underline"]);
  });
  it("key strikethrough", () => {
    test_click("{ctrl+é}", ["textDecorationLine", "line-through"]);
  });
  it("key subscript", () => {
    test_click("{ctrl+o}", ["verticalAlign", "sub"]);
  });
  it("key superscript", () => {
    test_click("{ctrl+d}", ["verticalAlign", "super"]);
  });
});
