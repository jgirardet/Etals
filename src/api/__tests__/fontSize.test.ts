import { fontsize } from "../fontSize";
import { expect } from "chai";
describe("fontsize", () => {
  it("tests init strnig or number", () => {
    const f = fontsize("3.2rem");
    expect(f.toStyle()).deep.equal({ fontSize: "3.2rem" });
    const g = fontsize("3.4");
    expect(g.toStyle()).deep.equal({ fontSize: "3.4rem" });
  });

  it("test increase decrease", () => {
    const f = fontsize("2.3");
    expect(f.increase()).deep.equal({ fontSize: "2.5rem" });
    expect(f.decrease()).deep.equal({ fontSize: "2.1rem" });
    //expect(f.decrease()).equal("fontSize__2.1em");
  });
});
export {};
