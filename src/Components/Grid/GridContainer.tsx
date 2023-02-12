import { FC, SyntheticEvent, useEffect, useRef, useState } from "react";
import { Time, Transport } from "tone";
import { Seconds } from "tone/build/esm/core/type/Units";
import { GridRow, StepPosition } from "../Row/Row";
import { SequencerController } from "../SequencerController/Sequencer";
import { Grid } from "./Grid";

interface GridContainerProps {
  controller: SequencerController;
  rows: GridRow[];
  steps: number;
}

type TransportCallback = (time: Seconds) => void;

export const GridContainer: FC<GridContainerProps> = ({
  controller,
  rows,
  steps,
}) => {
  const [beat, setBeat] = useState<number>(0);
  const playRef = useRef<TransportCallback>(() => {});

  useEffect(() => {
    playRef.current = play;
    Transport.scheduleRepeat((time) => playRef.current(time), "8n");
  }, []);

  useEffect(() => {
    playRef.current = play;
  }, [rows]);

  const play = (time: Seconds) => {
    const beat = Math.floor((Transport.getTicksAtTime(time) / 96) % 8);
    rows.map((row) => {
      const {
        steps,
        instrument: { type },
        note,
        octave,
      } = row;
      const octaveNote = note + octave;
      const currBeat = steps[beat];
      if (currBeat.isActive) {
        if (currBeat.isSplit) {
          type.triggerAttackRelease(octaveNote, "16n", time);
          type.triggerAttackRelease(
            octaveNote,
            "16n",
            time + Time("16n").toSeconds()
          );
        } else {
          type.triggerAttackRelease(octaveNote, "8n", time);
        }
      }
    });
    setBeat(beat);
  };

  const toggleIsActiveNote = (position: StepPosition): void => {
    const { steps, ...oldRow } = rows[position.rowIndex];
    const step = steps[position.stepIndex];
    steps[position.stepIndex] = {
      isActive: !step.isActive || step.isSplit,
      isSplit: step.isActive && step.isSplit ? false : step.isSplit,
    };
    controller.updateRows({
      ...oldRow,
      steps,
    });
  };

  const onSplitSquare = (position: StepPosition, e: SyntheticEvent): void => {
    e.preventDefault();
    const { steps, ...oldRow } = rows[position.rowIndex];
    const step = steps[position.stepIndex];
    steps[position.stepIndex] = {
      isActive: !step.isActive && !step.isSplit ? true : step.isActive,
      isSplit: !step.isSplit,
    };

    controller.updateRows({
      ...oldRow,
      steps,
    });
  };

  return (
    <Grid
      controller={{ toggleIsActiveNote, onSplitSquare }}
      rows={rows}
      steps={steps}
      beat={beat}
    />
  );
};
