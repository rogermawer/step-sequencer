import { MembraneSynth, MetalSynth, PolySynth, Sampler } from "tone";
import { SvgIcon } from "../../Common/SvgIcon";
import { GridRow } from "../Row/Row";
import { FunctionComponent } from "react";
import "./InstrumentSelectorStyle.scss";

export interface InstrumentSelectorController {
  toggleInstrumentSelector: (row: GridRow) => void;
}

interface InstrumentSelectorProps {
  controller: InstrumentSelectorController;
  row: GridRow;
  isEditing: boolean;
}

export type ToneInstrument = MetalSynth | MembraneSynth | PolySynth | Sampler;

export interface Instrument {
  name: string;
  type: ToneInstrument;
}

export const InstrumentSelector: FunctionComponent<InstrumentSelectorProps> = ({
  controller,
  row,
  isEditing,
}) => (
  <div className="selector-button">
    <span className="inst-name">{row.instrument.name}</span>
    <SvgIcon
      className={isEditing ? "active" : ""}
      onClick={() => controller.toggleInstrumentSelector(row)}
      type="piano"
    />
  </div>
);
