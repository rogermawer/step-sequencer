import React from "react";
import { MembraneSynth, MetalSynth, Sampler, Synth } from "tone";
import { InstrumentSelector } from "./InstrumentSelector";
import clap from "../../Common/Samples/clap.mp3";

export interface SideControlsController {
  onChangeInstrument: (index: number, instrument: Instrument) => void;
}

interface InstrumentSelectorContainerProps {
  controller: SideControlsController;
  rowIndex: number;
}

export type ToneInstrument = Synth | MembraneSynth | MetalSynth | Sampler;

export interface Instrument {
  name: string;
  nickName: string;
  type: ToneInstrument;
}

interface InstrumentSelectorContainerState {
  isOpen: boolean;
  selectedInstrument: Instrument;
}

const instruments: Instrument[] = [
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

export class InstrumentSelectorContainer extends React.Component<
  InstrumentSelectorContainerProps,
  InstrumentSelectorContainerState
> {
  constructor(props: InstrumentSelectorContainerProps) {
    super(props);
    this.state = {
      selectedInstrument: instruments[0],
      isOpen: false,
    };
  }

  public onToggleInstrument = (instrument: Instrument) => {
    this.props.controller.onChangeInstrument(this.props.rowIndex, instrument);
    this.setState({ selectedInstrument: instrument, isOpen: false });
  };

  public toggleInstrumentSelector = () =>
    this.setState({
      isOpen: !this.state.isOpen,
    });

  render() {
    return (
      <InstrumentSelector
        controller={this}
        instruments={instruments}
        {...this.state}
      />
    );
  }
}
