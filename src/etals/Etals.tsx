import React, { KeyboardEvent, useCallback, useMemo, useState } from "react";
import { Descendant } from "slate";
import { withHistory } from "slate-history";
import { Editable, Slate, withReact } from "slate-react";
import {
  getLayouts,
  getHandleKeyDown,
  getRenderLeaf,
  mixEditor,
  getRenderElement,
  withEtals,
} from "../core";
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
import { Config, EtalsElementPlugin, EtalsPlugin } from "../types";
import { defaultFormats } from "../defaults";
import "../assets/reset-editor-css.css";

export interface EtalsProps {
  initialValue?: Descendant[];
  etalsPlugins: EtalsPlugin[];
  etalsElementPlugins: EtalsElementPlugin[];
}

export const EtalsBase = ({
  initialValue,
  etalsPlugins,
  etalsElementPlugins,
}: EtalsProps): JSX.Element => {
  const config: Config = { formats: defaultFormats };
  const editor = useMemo(
    () => mixEditor([withReact, withHistory, withEtals(config)]),
    []
  );

  const plugins = useMemo(() => etalsPlugins.map((x) => x(config)), []);

  const elementPlugins = useMemo(
    () => etalsElementPlugins.map((x) => x(config)),
    []
  );
  const layouts = useMemo(
    () => getLayouts([...plugins, ...elementPlugins]),
    []
  );

  const MainRenderElement = useCallback(
    getRenderElement(elementPlugins, defaultFormats),
    []
  );

  const [value, setValue] = useState<Descendant[]>(initialValue || []);
  const onChange = useCallback((val: Descendant[]) => setValue(val), []);
  const onKeyDown = useCallback((event: KeyboardEvent) => {
    getHandleKeyDown(layouts, "bépo")(editor, event as KeyboardEvent<any>);
  }, []);
  const renderLeaf = useCallback(getRenderLeaf(plugins), []);
  return (
    <div className="etals">
      <Slate editor={editor} onChange={onChange} value={value}>
        <Editable
          className="editable-area"
          renderLeaf={renderLeaf}
          renderElement={MainRenderElement}
          onKeyDown={onKeyDown}
        />
      </Slate>
    </div>
  );
};

export const Etals = ({ initialValue }: Pick<EtalsProps, "initialValue">) => {
  const plugins = [
    etalsBold,
    etalsItalic,
    etalsUnderline,
    etalsStrikethrough,
    etalsSubSuperscript,
    etalsFontSize,
    etalsColor,
  ];
  const elementPlugins = [etalsParagraph, etalsHeading];
  return (
    <EtalsBase
      {...{
        initialValue,
        etalsPlugins: plugins,
        etalsElementPlugins: elementPlugins,
      }}
    />
  );
};
