import React from "react";
import { Transport } from "tone";
import { Time } from "tone/build/esm/core/type/Units";
import { GridRow } from "../../Components/Row/Row";
import { SequencerController } from "../../SequencerController/Sequencer";
import { Grid } from "./Grid";

interface GridContainerProps {
  controller: SequencerController;
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
        row.steps[beat].synth.triggerAttackRelease(row.note, "8n", time);
      }
    });
  };

  render() {
    return <Grid {...this.props} beat={this.state.beat} />;
  }
}
