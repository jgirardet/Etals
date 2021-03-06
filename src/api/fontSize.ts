import React from "react";
export const fontsize = (val: string[number]) => new FontSize(val);

/*

Simple Font API

- stores as float and return rem
- public `float` getter
- all methods return {fontSize: XXrem} 

*/

export class FontSize {
  _float: number = 0;
  constructor(val: string | number) {
    this._float = this.parseStyle(val);
  }

  public get float(): number {
    return this._float;
  }
  public increase(): React.CSSProperties {
    return new FontSize(this._float + this.getStep()).toStyle();
  }

  public decrease(): React.CSSProperties {
    return new FontSize(this._float - this.getStep()).toStyle();
  }

  public toStyle(val?: number): React.CSSProperties {
    return this._toStyle(val ? val : this._float);
  }

  public mul(x: number): React.CSSProperties {
    return FontSize.fromFloat(this._float * x).toStyle();
  }

  public static fromRem(rem: string | number): FontSize {
    if (typeof rem === "string")
      return new FontSize("fontSize__" + rem.trim().replace("rem", ""));
    else return FontSize.fromFloat(rem);
  }

  public static fromFloat(float: number): FontSize {
    return new FontSize("fontSize__" + float.toFixed(1));
  }

  /* ---------- Private ------------- */

  private parseStyle(val: string | number): number {
    return parseFloat(val.toString().replace("rem", ""));
  }

  private _toStyle(val: number): React.CSSProperties {
    return { fontSize: val.toFixed(1) + "rem" };
  }

  private getStep() {
    // on ajoute "0,entier" ex : si 2.3 on ajoute 0.2, sir 3.5 on ajoute 0.3 mais minimum 0.1
    return Math.max(0.1, Math.trunc(this._float) / 10);
  }
}
