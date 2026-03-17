import { FC } from "react";
import { DEFAULT_LOOP_LENGTH } from "../../audio/AudioEngine";
import { SequencerDelegate } from "../SequencerContainer/Sequencer";
import { Step, StepEditor, StepPosition } from "./StepEditor";

interface StepEditorContainerProps {
  delegate: SequencerDelegate;
  rowIndex: number;
  steps: Step[];
  beat: number;
  loopLength: number;
}

export const StepEditorContainer: FC<StepEditorContainerProps> = ({
  delegate,
  rowIndex,
  steps,
  beat,
  loopLength,
}) => {
  const pageSize = loopLength / 2;
  const paginated = loopLength > DEFAULT_LOOP_LENGTH;
  const viewOffset = paginated && beat >= pageSize ? pageSize : 0;
  const visibleSteps = paginated ? steps.slice(viewOffset, viewOffset + pageSize) : steps.slice(0, loopLength);
  const visibleBeat = beat - viewOffset;

  const toggleIsActiveNote = (position: StepPosition): void => {
    const actualIndex = viewOffset + position.stepIndex;
    delegate.updateSteps(
      rowIndex,
      steps.map((s, i) =>
        i === actualIndex
          ? {
              isActive: !s.isActive || s.isSplit,
              isSplit: s.isActive && s.isSplit ? false : s.isSplit,
            }
          : s,
      ),
    );
  };

  const onSplitSquare = (position: StepPosition): void => {
    const actualIndex = viewOffset + position.stepIndex;
    delegate.updateSteps(
      rowIndex,
      steps.map((s, i) =>
        i === actualIndex
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
      steps={visibleSteps}
      beat={visibleBeat}
    />
  );
};
