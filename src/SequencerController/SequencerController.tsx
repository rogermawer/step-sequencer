import React from "react";
import * as Tone from "tone";
import { Synth } from "tone";
import { Destination } from "tone/build/esm/core/context/Destination";
import {
  Instrument,
  ToneInstrument,
} from "../Components/InstrumentSelector/InstrumentSelector";
import { GridRow, Step, StepPosition } from "../Components/Row/Row";
import { Sequencer } from "./Sequencer";

interface SequencerProps {
  isAudioStarted: boolean;
}

interface SequencerState {
  steps: number;
  rows: GridRow[];
  editingRowIndex: number | null;
}

//move to state
const defaultScale: string[] = ["G4", "E4", "D4", "C4", "A3"];

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
      editingRowIndex: null,
    };

    this.output = Tone.getDestination();
    this.output.volume.value = -12;
  }

  componentDidMount() {
    this.createRows();
  }

  public startSequencer = () => {
    if (this.props.isAudioStarted) {
      Tone.Transport.start();
    }
  };

  public stopSequencer = () => {
    Tone.Transport.stop();
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
    defaultScale.map((note, index) => {
      const defaultInstrument: Instrument = {
        name: "Basic Synth",
        nickName: "syn",
        type: new Synth({
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

  public toggleIsActiveNote = (position: StepPosition): void => {
    const newRows = this.state.rows.map((row) =>
      row.note !== position[0]
        ? row
        : {
            ...row,
            steps: row.steps.map((step, i) =>
              i !== position[1] ? step : { ...step, isActive: !step.isActive }
            ),
          }
    );
    this.setState({ rows: newRows });
  };

  public updateRows = (row: GridRow) => {
    const rows: GridRow[] = [...this.state.rows];
    rows[row.index] = row;
    this.setState({ rows: rows });
  };

  public toggleInstrumentSelector = (rowIndex: number) => {
    this.setState({
      editingRowIndex:
        this.state.editingRowIndex === rowIndex ? null : rowIndex,
    });
  };

  render() {
    return <Sequencer controller={this} {...this.state} />;
  }
}
