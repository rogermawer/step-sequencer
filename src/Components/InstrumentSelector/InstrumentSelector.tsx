import { MembraneSynth, MetalSynth, Sampler, Synth } from "tone";
import { SvgIcon } from "../../Common/SvgIcon";
import "./InstrumentSelectorStyle.scss";
import { GridRow } from "../Row/Row";

export interface InstrumentSelectorController {
  toggleInstrumentSelector: (indexOfRow: number) => void;
}

interface InstrumentSelectorProps {
  controller: InstrumentSelectorController;
  row: GridRow;
}

export type ToneInstrument = Synth | MembraneSynth | MetalSynth | Sampler;

export interface Instrument {
  name: string;
  nickName: string;
  type: ToneInstrument;
}

export const InstrumentSelector = ({
  controller,
  row,
}: InstrumentSelectorProps) => (
  <div className="selector-button">
    <SvgIcon
      onClick={() => controller.toggleInstrumentSelector(row.index)}
      type="piano"
    />
  </div>
);
