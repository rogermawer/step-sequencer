import React from "react";
import * as Tone from "tone";
import { MembraneSynth, Synth, Transport } from "tone";
import { Time } from "tone/build/esm/core/type/Units";
import { GridRow } from "../Grid/Grid";
import { Step, StepPosition } from "../Row/Row";
import { Sequencer } from "./Sequencer";

interface SequencerProps {}

interface SequencerState {
  beat: number;
  bpm: number;
  scale: string[];
  steps: number;
  rows: GridRow[];
}

export class SequencerController extends React.Component<
  SequencerProps,
  SequencerState
> {
  constructor(props: SequencerProps) {
    super(props);
    this.state = {
      beat: 0,
      bpm: 100,
      rows: [],
      scale: ["G4", "E4", "D4", "C4", "A3"],
      steps: 8,
    };
  }

  componentDidMount() {
    this.createRows();
    this.setSequencerData();
  }

  public startAudio = (): void => {
    Tone.start();
  };

  public toggleSequencer = () => {
    Tone.Transport.toggle();
  };

  private setSequencerData = () => {
    Transport.bpm.value = this.state.bpm;
    Transport.setLoopPoints(0, "1m");
    Transport.loop = true;
    Transport.scheduleRepeat(this.getAndSetBeat, "8n");
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

  private getAndSetBeat = (time: Time) => {
    const currentBeat = Math.floor((Transport.getTicksAtTime(time) / 96) % 8);
    this.playRow(currentBeat, time);
    this.setState({ beat: currentBeat });
  };

  private createRows = () => {
    let newRows: GridRow[] = [];
    this.state.scale.map((note) =>
      newRows.push({ note, steps: this.createRowSteps(this.state.steps) })
    );
    this.setState({ rows: newRows });
  };

  private playRow = (beat: number, time: Time) => {
    this.state.rows.map((row) =>
      row.steps[beat].isActive
        ? row.steps[beat].synth.triggerAttackRelease(row.note, "8n", time)
        : null
    );
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

  public onChangeInstrument = (rowIndex: number) => {
    const updatedRows = this.state.rows.map((row, i) =>
      i === rowIndex
        ? {
            ...row,
            steps: row.steps.map(
              (step) =>
                (step = { ...step, synth: new MembraneSynth().toDestination() })
            ),
          }
        : row
    );
    this.setState({ rows: updatedRows });
  };

  render() {
    return <Sequencer controller={this} {...this.state} />;
  }
}
