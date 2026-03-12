import { FC, SyntheticEvent } from "react";
import { SequencerDelegate } from "../SequencerContainer/Sequencer";
import { Step, StepEditor, StepPosition } from "./StepEditor";

interface StepEditorContainerProps {
  delegate: SequencerDelegate;
  rowIndex: number;
  steps: Step[];
  beat: number;
}

export const StepEditorContainer: FC<StepEditorContainerProps> = ({
  delegate,
  rowIndex,
  steps,
  beat,
}) => {
  const toggleIsActiveNote = (position: StepPosition): void => {
    delegate.updateSteps(
      rowIndex,
      steps.map((s, i) =>
        i === position.stepIndex
          ? {
              isActive: !s.isActive || s.isSplit,
              isSplit: s.isActive && s.isSplit ? false : s.isSplit,
            }
          : s,
      ),
    );
  };

  const onSplitSquare = (position: StepPosition, e: SyntheticEvent): void => {
    e.preventDefault();
    delegate.updateSteps(
      rowIndex,
      steps.map((s, i) =>
        i === position.stepIndex
          ? {
              isActive: !s.isActive && !s.isSplit ? true : s.isActive,
              isSplit: !s.isSplit,
            }
          : s,
      ),
    );
  };

  return (
    <StepEditor
      delegate={{ toggleIsActiveNote, onSplitSquare }}
      rowIndex={rowIndex}
      steps={steps}
      beat={beat}
    />
  );
};
