import React, { SyntheticEvent } from "react";
import * as Tone from "tone";
import { Time } from "tone/build/esm/core/type/Units";
import { GridRow, StepPosition } from "../Row/Row";
import { SequencerController } from "../SequencerController/Sequencer";
import { Grid } from "./Grid";

interface GridContainerProps {
  controller: SequencerController;
  rows: GridRow[];
  steps: number;
  isAudioStarted: boolean;
}

interface GridContainerState {
  beat: number;
  bpm: number;
}

export class GridContainer extends React.Component<
  GridContainerProps,
  GridContainerState
> {
  constructor(props: GridContainerProps) {
    super(props);
    this.state = {
      beat: 0,
      bpm: 100,
    };
  }

  componentDidMount() {
    this.setSequencerData();
  }

  private setSequencerData = () => {
    Tone.Transport.bpm.value = this.state.bpm;
    Tone.Transport.setLoopPoints(0, "1m");
    Tone.Transport.loop = true;
    Tone.Transport.scheduleRepeat(this.getAndSetBeat, "8n");
  };

  public startSequencer = () => {
    if (this.props.isAudioStarted) {
      Tone.Transport.start();
    }
  };

  public stopSequencer = () => {
    Tone.Transport.stop();
  };

  private getAndSetBeat = (time: Time) => {
    const currentBeat = Math.floor(
      (Tone.Transport.getTicksAtTime(time) / 96) % 8
    );
    this.playRow(currentBeat, time);
    this.setState({ beat: currentBeat });
  };

  private playRow = (beat: number, time: Time) =>
    this.props.rows.map((row) => {
      const currBeat = row.steps[beat];
      if (currBeat.isActive) {
        if (!currBeat.isSplit) {
          row.instrument.type.triggerAttackRelease(
            row.note + row.octave,
            "8n",
            time
          );
        } else {
          row.instrument.type.triggerAttackRelease(
            row.note + row.octave,
            "16n",
            time
          );
          row.instrument.type.triggerAttackRelease(
            row.note + row.octave,
            "16n",
            Tone.Time(time).toSeconds() + Tone.Time("16n").toSeconds()
          );
        }
      }
    });

  public toggleIsActiveNote = (position: StepPosition): void => {
    const { steps, ...oldRow } = this.props.rows[position.rowIndex];
    const step = steps[position.stepIndex];
    steps[position.stepIndex] = {
      isActive: !step.isActive,
      isSplit: step.isActive && step.isSplit ? false : step.isSplit,
    };

    const newRow = {
      ...oldRow,
      steps,
    };

    this.props.controller.updateRows(newRow);
  };

  public onSplitSquare = (position: StepPosition, e: SyntheticEvent): void => {
    e.preventDefault();
    const { steps, ...oldRow } = this.props.rows[position.rowIndex];
    const step = steps[position.stepIndex];
    steps[position.stepIndex] = {
      isActive: !step.isActive && !step.isSplit ? true : step.isActive,
      isSplit: !step.isSplit,
    };

    const newRow = {
      ...oldRow,
      steps,
    };

    this.props.controller.updateRows(newRow);
  };

  public handleChangeTempo = (bpmString: string) => {
    const bpm = parseInt(bpmString);
    Tone.Transport.set({ bpm });
    this.setState({ bpm });
  };

  render() {
    return (
      <Grid
        controller={this}
        rows={this.props.rows}
        steps={this.props.steps}
        {...this.state}
      />
    );
  }
}
