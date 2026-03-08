import { FC, SyntheticEvent } from "react";
import { GridRow, StepPosition } from "../Row/Row";
import { SequencerDelegate } from "../SequencerController/Sequencer";
import { Grid } from "./Grid";

interface GridContainerProps {
  controller: SequencerDelegate;
  rows: GridRow[];
  steps: number;
  beat: number;
}

export const GridContainer: FC<GridContainerProps> = ({
  controller,
  rows,
  steps,
  beat,
}) => {
  const toggleIsActiveNote = (position: StepPosition): void => {
    const { steps, ...oldRow } = rows[position.rowIndex];
    const step = steps[position.stepIndex];
    steps[position.stepIndex] = {
      isActive: !step.isActive || step.isSplit,
      isSplit: step.isActive && step.isSplit ? false : step.isSplit,
    };
    controller.updateRows({ ...oldRow, steps });
  };

  const onSplitSquare = (position: StepPosition, e: SyntheticEvent): void => {
    e.preventDefault();
    const { steps, ...oldRow } = rows[position.rowIndex];
    const step = steps[position.stepIndex];
    steps[position.stepIndex] = {
      isActive: !step.isActive && !step.isSplit ? true : step.isActive,
      isSplit: !step.isSplit,
    };
    controller.updateRows({ ...oldRow, steps });
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
