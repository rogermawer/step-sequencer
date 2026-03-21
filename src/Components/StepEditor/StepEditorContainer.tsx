import { FC } from "react";
import { DEFAULT_LOOP_LENGTH } from "../../audio/AudioEngine";
import { SequencerDelegate } from "../SequencerContainer/Sequencer";
import { Step, StepEditor, StepPosition, Subdivision } from "./StepEditor";

interface StepEditorContainerProps {
  delegate: SequencerDelegate;
  rowIndex: number;
  steps: Step[];
  beat: number;
  loopLength: number;
  page: number;
}

export const StepEditorContainer: FC<StepEditorContainerProps> = ({
  delegate,
  rowIndex,
  steps,
  beat,
  loopLength,
  page,
}) => {
  const pageSize = loopLength / 2;
  const paginated = loopLength > DEFAULT_LOOP_LENGTH;
  const viewOffset = paginated ? page * pageSize : 0;
  const visibleSteps = paginated
    ? steps.slice(viewOffset, viewOffset + pageSize)
    : steps.slice(0, loopLength);
  const visibleBeat = beat - viewOffset;

  const toggleIsActiveNote = (position: StepPosition): void => {
    const actualIndex = viewOffset + position.stepIndex;
    delegate.updateSteps(
      rowIndex,
      steps.map((s, i) => {
        if (i !== actualIndex) return s;
        if (!s.isActive) return { isActive: true, subdivision: Subdivision.None };
        if (s.subdivision === Subdivision.None) return { ...s, subdivision: Subdivision.Split };
        if (s.subdivision === Subdivision.Split) return { ...s, subdivision: Subdivision.Triplet };
        return { isActive: false, subdivision: Subdivision.None };
      }),
    );
  };

  return (
    <StepEditor
      delegate={{ toggleIsActiveNote }}
      rowIndex={rowIndex}
      steps={visibleSteps}
      beat={visibleBeat}
    />
  );
};
