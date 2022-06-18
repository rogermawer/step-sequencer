import React from "react";
import { Transport } from "tone";
import { Time } from "tone/build/esm/core/type/Units";
import { GridRow, StepPosition } from "../Row/Row";
import { SequencerController } from "../SequencerController/Sequencer";
import { Grid } from "./Grid";

interface GridContainerProps {
  sequencerController: SequencerController;
  rows: GridRow[];
  steps: number;
}

interface GridContainerState {
  beat: number;
}

export class GridContainer extends React.Component<
  GridContainerProps,
  GridContainerState
> {
  constructor(props: GridContainerProps) {
    super(props);
    this.state = {
      beat: 0,
    };
  }

  componentDidMount() {
    this.setSequencerData();
  }

  private setSequencerData = () => {
    Transport.bpm.value = 100;
    Transport.setLoopPoints(0, "1m");
    Transport.loop = true;
    Transport.scheduleRepeat(this.getAndSetBeat, "8n");
  };

  private getAndSetBeat = (time: Time) => {
    const currentBeat = Math.floor((Transport.getTicksAtTime(time) / 96) % 8);
    this.playRow(currentBeat, time);
    this.setState({ beat: currentBeat });
  };

  private playRow = (beat: number, time: Time) => {
    // eslint-disable-next-line array-callback-return
    this.props.rows.map((row) => {
      if (row.steps[beat].isActive) {
        row.instrument.type.triggerAttackRelease(row.note, "8n", time);
      }
    });
  };

  public toggleIsActiveNote = (position: StepPosition): void => {
    const { steps, ...oldRow } = this.props.rows[position[0]];
    const oldStep = steps[position[1]];
    steps[position[1]] = { ...oldStep, isActive: !oldStep.isActive };

    const newRow = {
      ...oldRow,
      steps,
    };

    this.props.sequencerController.updateRows(newRow);
  };

  render() {
    return (
      <Grid
        controller={this}
        rows={this.props.rows}
        steps={this.props.steps}
        beat={this.state.beat}
      />
    );
  }
}
