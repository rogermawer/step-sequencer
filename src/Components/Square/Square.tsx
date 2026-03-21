import "./SquareStyle.scss";
import { Subdivision, StepPosition } from "../StepEditor/StepEditor";

export interface SquareDelegate {
  toggleIsActiveNote: (p: StepPosition) => void;
}

interface SquareProps {
  delegate: SquareDelegate;
  isActive: boolean;
  subdivision: Subdivision;
  isPlaying: boolean;
  stepPosition: StepPosition;
}

export const Square = ({
  delegate,
  isActive,
  subdivision,
  isPlaying,
  stepPosition,
}: SquareProps) => (
  <div
    onClick={() => delegate.toggleIsActiveNote(stepPosition)}
    onContextMenu={(e) => e.preventDefault()}
    className={`square${isPlaying ? " playing" : ""}${
      isActive ? " active" : ""
    }${subdivision !== Subdivision.None ? ` ${subdivision}` : ""}`}
  />
);
