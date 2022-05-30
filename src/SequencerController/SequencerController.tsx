import React from "react";
import { getDestination, PolySynth, Transport } from "tone";
import { Destination } from "tone/build/esm/core/context/Destination";
import {
  Instrument,
  ToneInstrument,
} from "../Components/InstrumentSelector/InstrumentSelector";
import { GridRow, Step } from "../Components/Row/Row";
import { Sequencer } from "./Sequencer";

interface SequencerProps {
  isAudioStarted: boolean;
}

interface SequencerState {
  steps: number;
  rows: GridRow[];
  scale: string[];
}

export class SequencerController extends React.Component<
  SequencerProps,
  SequencerState
> {
  private output: Destination;
  constructor(props: SequencerProps) {
    super(props);
    this.state = {
      rows: [],
      scale: ["G4", "E4", "D4", "C4", "A3"],
      steps: 8,
    };

    this.output = getDestination();
    this.output.volume.value = -12;
  }

  componentDidMount() {
    this.createRows();
  }

  public startSequencer = () => {
    if (this.props.isAudioStarted) {
      Transport.start();
    }
  };

  public stopSequencer = () => {
    Transport.stop();
  };

  private createRowSteps = (instrument: ToneInstrument): Step[] => {
    const defaultStep: Step = {
      isActive: false,
      synth: instrument.connect(this.output),
    };
    let defaultSteps: Step[] = [];
    [...Array(this.state.steps)].map(() => defaultSteps.push(defaultStep));
    return defaultSteps;
  };

  private createRows = () => {
    let newRows: GridRow[] = [];
    this.state.scale.map((note, index) => {
      const defaultInstrument: Instrument = {
        name: "Basic Synth",
        type: new PolySynth(undefined, {
          oscillator: { type: "square8" },
        }),
      };
      return newRows.push({
        index,
        note,
        instrument: defaultInstrument,
        steps: this.createRowSteps(defaultInstrument.type),
      });
    });
    this.setState({ rows: newRows });
  };

  public updateRows = (row: GridRow) => {
    const rows: GridRow[] = [...this.state.rows];
    rows[row.index] = row;
    this.setState({ rows: rows });
  };

  render() {
    return <Sequencer controller={this} {...this.state} />;
  }
}
