import { SyntheticEvent } from "react";
import "./SquareStyle.scss";
import { StepPosition } from "../StepEditor/StepEditor";

export interface SquareDelegate {
  toggleIsActiveNote: (p: StepPosition) => void;
  onSplitSquare: (p: StepPosition, e: SyntheticEvent) => void;
}

interface SquareProps {
  delegate: SquareDelegate;
  isActive: boolean;
  isSplit: boolean;
  isPlaying: boolean;
  stepPosition: StepPosition;
}

export const Square = ({
  delegate,
  isActive,
  isSplit,
  isPlaying,
  stepPosition,
}: SquareProps) => (
  <div
    onClick={() => delegate.toggleIsActiveNote(stepPosition)}
    onContextMenu={(e) => delegate.onSplitSquare(stepPosition, e)}
    className={`square${isPlaying ? " playing" : ""}${
      isActive ? " active" : ""
    }${isSplit ? " split" : ""}`}
  />
);
