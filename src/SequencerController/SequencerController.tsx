import React from "react";
import * as Tone from "tone";
import { Synth } from "tone";
import { GridRow, Step, StepPosition } from "../Components/Row/Row";
import { Sequencer } from "./Sequencer";

interface SequencerProps {
  isAudioStarted: boolean;
}

interface SequencerState {
  scale: string[];
  steps: number;
  rows: GridRow[];
  editingRow: GridRow | null;
}

export class SequencerController extends React.Component<
  SequencerProps,
  SequencerState
> {
  constructor(props: SequencerProps) {
    super(props);
    this.state = {
      rows: [],
      scale: ["G4", "E4", "D4", "C4", "A3"],
      steps: 8,
      editingRow: null,
    };
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

  private createRowSteps = (steps: number): Step[] => {
    const synth = new Synth({
      oscillator: { type: "square8" },
    }).toDestination();
    const defaultStep: Step = {
      isActive: false,
      synth,
    };
    let defaultSteps: Step[] = [];
    [...Array(steps)].map(() => defaultSteps.push(defaultStep));
    return defaultSteps;
  };

  private createRows = () => {
    let newRows: GridRow[] = [];
    this.state.scale.map((note, index) =>
      newRows.push({
        index,
        note,
        steps: this.createRowSteps(this.state.steps),
      })
    );
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

  public toggleInstrumentSelector = (row: GridRow) => {
    this.setState({
      editingRow: this.state.editingRow?.index === row.index ? null : row,
    });
  };

  render() {
    return <Sequencer controller={this} {...this.state} />;
  }
}
