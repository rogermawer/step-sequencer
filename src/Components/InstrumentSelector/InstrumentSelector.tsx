import { MembraneSynth, MetalSynth, PolySynth, Sampler } from "tone";
import { SvgIcon } from "../../Common/SvgIcon";
import "./InstrumentSelectorStyle.scss";
import { GridRow } from "../Row/Row";
import { FunctionComponent } from "react";

export interface InstrumentSelectorController {
  toggleInstrumentSelector: (row: GridRow) => void;
}

interface InstrumentSelectorProps {
  controller: InstrumentSelectorController;
  row: GridRow;
}

export type ToneInstrument = MetalSynth | MembraneSynth | PolySynth | Sampler;

export interface Instrument {
  name: string;
  type: ToneInstrument;
}

export const InstrumentSelector: FunctionComponent<InstrumentSelectorProps> = ({
  controller,
  row,
}) => (
  <div className="selector-button">
    <SvgIcon
      onClick={() => controller.toggleInstrumentSelector(row)}
      type="piano"
    />
  </div>
);
