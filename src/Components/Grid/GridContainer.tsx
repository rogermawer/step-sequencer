import React, { SyntheticEvent } from "react";
import { Transport } from "tone";
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
    Transport.bpm.value = this.state.bpm;
    Transport.setLoopPoints(0, "1m");
    Transport.loop = true;
    Transport.scheduleRepeat(this.getAndSetBeat, "8n");
  };

  public startSequencer = () => {
    if (this.props.isAudioStarted) {
      Transport.start();
    }
  };

  public stopSequencer = () => {
    Transport.stop();
  };

  private getAndSetBeat = (time: Time) => {
    const currentBeat = Math.floor((Transport.getTicksAtTime(time) / 96) % 8);
    this.playRow(currentBeat, time);
    this.setState({ beat: currentBeat });
  };

  private playRow = (beat: number, time: Time) =>
    this.props.rows.map((row) => {
      if (row.steps[beat].isActive) {
        row.instrument.type.triggerAttackRelease(
          row.note + row.octave,
          "8n",
          time
        );
      }
    });

  public toggleIsActiveNote = (position: StepPosition): void => {
    const { steps, ...oldRow } = this.props.rows[position.rowIndex];
    steps[position.stepIndex] = {
      ...steps[position.stepIndex],
      isActive: !steps[position.stepIndex].isActive,
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
    steps[position.stepIndex] = {
      ...steps[position.stepIndex],
      isSplit: !steps[position.stepIndex].isSplit,
    };

    const newRow = {
      ...oldRow,
      steps,
    };

    this.props.controller.updateRows(newRow);
  };

  public handleChangeTempo = (bpmString: string) => {
    const bpm = parseInt(bpmString);
    Transport.set({ bpm });
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
