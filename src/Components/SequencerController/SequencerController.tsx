import React from "react";
import { getDestination, PolySynth, Sampler, Transport } from "tone";
import { Destination } from "tone/build/esm/core/context/Destination";
import {
  Instrument,
  ToneInstrumentName,
} from "../InstrumentSelector/InstrumentSelector";
import { GridRow, Step } from "../Row/Row";
import { Sequencer } from "./Sequencer";
import clap from "../../Common/Samples/clap.wav";
import hat from "../../Common/Samples/hat.wav";
import kick from "../../Common/Samples/kick.wav";

interface SequencerProps {
  isAudioStarted: boolean;
}

interface SequencerConfig {
  instrumentName: ToneInstrumentName;
  pitch: string;
  octave: number;
}

interface SequencerState {
  steps: number;
  rows: GridRow[];
  bpm: number;
  instruments: Instrument[];
}

export interface Envelope {
  attack: number;
  decay: number;
  sustain: number;
  release: number;
}

const initialConfig: SequencerConfig[] = [
  { instrumentName: ToneInstrumentName.TONE, pitch: "G", octave: 1 },
  { instrumentName: ToneInstrumentName.HAT, pitch: "E", octave: 3 },
  { instrumentName: ToneInstrumentName.HAT, pitch: "D", octave: 3 },
  { instrumentName: ToneInstrumentName.CLAP, pitch: "C", octave: 3 },
  { instrumentName: ToneInstrumentName.KICK, pitch: "A", octave: 3 },
];

export class SequencerController extends React.Component<
  SequencerProps,
  SequencerState
> {
  private output: Destination;
  constructor(props: SequencerProps) {
    super(props);
    this.state = {
      rows: [],
      steps: 8,
      bpm: 100,
      instruments: [
        {
          name: ToneInstrumentName.CLAP,
          type: new Sampler({
            urls: {
              C3: clap,
            },
          }),
        },
        {
          name: ToneInstrumentName.HAT,
          type: new Sampler({
            urls: {
              C3: hat,
            },
          }),
        },
        {
          name: ToneInstrumentName.KICK,
          type: new Sampler({
            urls: {
              C3: kick,
            },
          }),
        },
        {
          name: ToneInstrumentName.TONE,
          type: new PolySynth(undefined, { oscillator: { type: "square8" } }),
        },
      ],
    };

    this.output = getDestination();
    this.output.volume.value = -12;
  }

  componentDidMount() {
    this.createRows();
    this.setSequencerData();
  }

  private setSequencerData = () => {
    Transport.bpm.value = this.state.bpm;
    Transport.setLoopPoints(0, "1m");
    Transport.loop = true;
  };

  public startSequencer = () => {
    if (this.props.isAudioStarted) {
      Transport.start();
    }
  };

  public stopSequencer = () => {
    Transport.stop();
  };

  public handleChangeTempo = (bpmString: string) => {
    const bpm = parseInt(bpmString);
    Transport.set({ bpm });
    this.setState({ bpm });
  };

  private createRowSteps = (): Step[] => {
    const defaultStep: Step = {
      isActive: false,
      isSplit: false,
    };
    let defaultSteps: Step[] = [];
    [...Array(this.state.steps)].map(() => defaultSteps.push(defaultStep));
    return defaultSteps;
  };

  private createRows = () => {
    let newRows: GridRow[] = [];
    initialConfig.map((value, index) => {
      const defaultInstrument: Instrument =
        this.state.instruments.find(
          (inst) => inst.name === value.instrumentName
        ) ?? this.state.instruments[0];
      defaultInstrument.type.connect(this.output);
      return newRows.push({
        index,
        note: value.pitch,
        octave: value.octave,
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
    return (
      <Sequencer
        controller={this}
        {...this.state}
        isAudioStarted={this.props.isAudioStarted}
      />
    );
  }
}
