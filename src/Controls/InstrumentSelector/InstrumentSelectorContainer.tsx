import React from "react";
import { MembraneSynth, Synth } from "tone";
import { SequencerController } from "../../SequencerController/Sequencer";
import { InstrumentSelector } from "./InstrumentSelector";

interface InstrumentSelectorContainerProps {
  sequencerController: SequencerController;
  rowIndex: number;
}

export type ToneInstrument = Synth | MembraneSynth;

export interface Instrument {
  name: string;
  instrument: ToneInstrument;
}

interface InstrumentSelectorContainerState {
  instruments: Instrument[];
  isOpen: boolean;
}

export class InstrumentSelectorContainer extends React.Component<
  InstrumentSelectorContainerProps,
  InstrumentSelectorContainerState
> {
  constructor(props: InstrumentSelectorContainerProps) {
    super(props);
    this.state = {
      instruments: [
        { name: "Basic Synth", instrument: new Synth() },
        { name: "Membrane Synth", instrument: new MembraneSynth() },
      ],
      isOpen: false,
    };
  }

  public onToggleInstrument = (instrument: ToneInstrument) =>
    this.props.sequencerController.onChangeInstrument(
      this.props.rowIndex,
      instrument
    );

  public toggleInstrumentSelector = () =>
    this.setState({
      isOpen: !this.state.isOpen,
    });

  render() {
    return <InstrumentSelector controller={this} {...this.state} />;
  }
}
