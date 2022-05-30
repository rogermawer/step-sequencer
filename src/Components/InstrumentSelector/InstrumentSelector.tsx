import { MembraneSynth, MetalSynth, PolySynth, Sampler } from "tone";
import { SvgIcon } from "../../Common/SvgIcon";
import "./InstrumentSelectorStyle.scss";
import { GridRow } from "../Row/Row";
import { FunctionComponent } from "react";

export interface InstrumentSelectorController {
  toggleInstrumentSelector: (indexOfRow: number) => void;
}

interface InstrumentSelectorProps {
  controller: InstrumentSelectorController;
  row: GridRow;
}

export type ToneInstrument = PolySynth | MembraneSynth | MetalSynth | Sampler;

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
      onClick={() => controller.toggleInstrumentSelector(row.index)}
      type="piano"
    />
  </div>
);
