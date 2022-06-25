import React from "react";
import {
  getDestination,
  MembraneSynth,
  MetalSynth,
  PolySynth,
  Sampler,
  Transport,
} from "tone";
import { Destination } from "tone/build/esm/core/context/Destination";
import { Instrument } from "../InstrumentSelector/InstrumentSelector";
import { GridRow, Step } from "../Row/Row";
import { Sequencer } from "./Sequencer";
import clap from "../../Common/Samples/clap.wav";
import hat from "../../Common/Samples/hat.wav";
import kick from "../../Common/Samples/kick.wav";

interface SequencerProps {
  isAudioStarted: boolean;
}

interface SequencerState {
  steps: number;
  rows: GridRow[];
  scale: string[];
  instruments: Instrument[];
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
      instruments: [
        {
          name: "Clap",
          type: new Sampler({
            urls: {
              A3: clap,
            },
          }),
        },
        {
          name: "Hat",
          type: new Sampler({
            urls: {
              A3: hat,
            },
          }),
        },
        {
          name: "Kick",
          type: new Sampler({
            urls: {
              A3: kick,
            },
          }),
        },
        {
          name: "Tone",
          type: new PolySynth(undefined, { oscillator: { type: "square8" } }),
        },
      ],
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
      const defaultInstrument: Instrument = this.state.instruments[0];
      defaultInstrument.type.connect(this.output);
      return newRows.push({
        index,
        note,
        instrument: defaultInstrument,
        steps: this.createRowSteps(),
      });
    });
    this.setState({ rows: newRows });
  };

  public updateRows = (row: GridRow) => {
    row.instrument.type.connect(this.output);
    const rows: GridRow[] = [...this.state.rows];
    rows[row.index] = row;
    this.setState({ rows: rows });
  };

  render() {
    return <Sequencer controller={this} {...this.state} />;
  }
}
