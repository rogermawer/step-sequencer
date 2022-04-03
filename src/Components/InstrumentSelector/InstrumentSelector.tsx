import { MembraneSynth, MetalSynth, Sampler, Synth } from "tone";
import { SvgIcon } from "../../Common/SvgIcon";
import "./InstrumentSelectorStyle.scss";
import clap from "../../Common/Samples/clap.mp3";
import { GridRow } from "../Row/Row";

export interface InstrumentSelectorController {
  toggleInstrumentSelector: (r: GridRow) => void;
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

export const instruments: Instrument[] = [
  { name: "Basic Synth", nickName: "syn", type: new Synth() },
  { name: "Membrane Synth", nickName: "memb", type: new MembraneSynth() },
  { name: "Metal Synth", nickName: "mtlSyn", type: new MetalSynth() },
  {
    name: "Clap",
    nickName: "clp",
    type: new Sampler({
      urls: {
        A3: clap,
      },
    }),
  },
];

export const InstrumentSelector = ({
  controller,
  row,
}: InstrumentSelectorProps) => (
  <div className="selector-button">
    <SvgIcon
      onClick={() => controller.toggleInstrumentSelector(row)}
      type="piano"
    />
  </div>
);
