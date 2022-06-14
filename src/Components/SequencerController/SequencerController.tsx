import React from "react";
import { getDestination, PolySynth, Transport } from "tone";
import { Destination } from "tone/build/esm/core/context/Destination";
import { Instrument } from "../InstrumentSelector/InstrumentSelector";
import { GridRow, Step } from "../Row/Row";
import { Sequencer } from "./Sequencer";

interface SequencerProps {
  isAudioStarted: boolean;
}

interface SequencerState {
  steps: number;
  rows: GridRow[];
  scale: string[];
}

export interface Envelope {
  attack: number;
  decay: number;
  sustain: number;
  release: number;
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

  private createRowSteps = (): Step[] => {
    const defaultStep: Step = {
      isActive: false,
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
        }).connect(this.output),
      };
      return newRows.push({
        index,
        note,
        instrument: defaultInstrument,
        envelope: {
          attack: 0.005,
          decay: 0.1,
          sustain: 0.3,
          release: 1,
        },
        steps: this.createRowSteps(),
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
