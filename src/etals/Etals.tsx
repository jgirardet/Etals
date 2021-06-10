import React, { useCallback, useMemo, useState } from "react";
import { Descendant } from "slate";
import { withHistory } from "slate-history";
import { Editable, Slate, withReact } from "slate-react";
import { mixEditor, withEtals, initializePlugins } from "../core";
import { etalsHeading, etalsParagraph } from "../elements";
import {
  etalsBold,
  etalsItalic,
  etalsUnderline,
  etalsStrikethrough,
  etalsSubSuperscript,
  etalsFontSize,
  etalsColor,
} from "../marks";
import { Config, EtalsPlugin } from "../types";
import { defaultFormats } from "../defaults";
import "../assets/reset-editor-css.css";

export interface EtalsProps {
  initialValue?: Descendant[];
  etalsPlugins: EtalsPlugin[];
}

export const EtalsBase = ({
  initialValue,
  etalsPlugins,
}: EtalsProps): JSX.Element => {
  const config: Config = { formats: defaultFormats };
  const editor = useMemo(
    () => mixEditor([withReact, withHistory, withEtals(config)]),
    []
  );

  const { renderLeaf, renderElement, onKeyDown } = useMemo(
    () => initializePlugins(etalsPlugins, config),
    []
  );

  const [value, setValue] = useState<Descendant[]>(initialValue || []);
  const onChange = useCallback((val: Descendant[]) => setValue(val), []);
  return (
    <div className="etals">
      <Slate editor={editor} onChange={onChange} value={value}>
        <Editable
          className="editable-area"
          renderLeaf={renderLeaf}
          renderElement={renderElement}
          onKeyDown={(event) => onKeyDown(editor, event)}
        />
      </Slate>
    </div>
  );
};

export const Etals = ({ initialValue }: Pick<EtalsProps, "initialValue">) => {
  const elementPlugins = [etalsParagraph, etalsHeading];
  const plugins = [
    etalsBold,
    etalsItalic,
    etalsUnderline,
    etalsStrikethrough,
    etalsSubSuperscript,
    etalsFontSize,
    etalsColor,
    ...elementPlugins,
  ];
  return <EtalsBase initialValue={initialValue} etalsPlugins={plugins} />;
};
