import { SyntheticEvent } from "react";
import { StepPosition } from "../Row/Row";
import "./SquareStyle.scss";

export interface SquareController {
  toggleIsActiveNote: (p: StepPosition) => void;
  onSplitSquare: (p: StepPosition, e: SyntheticEvent) => void;
}

interface SquareProps {
  controller: SquareController;
  isActive: boolean;
  isSplit: boolean;
  isPlaying: boolean;
  stepPosition: StepPosition;
}

export const Square = ({
  controller,
  isActive,
  isSplit,
  isPlaying,
  stepPosition,
}: SquareProps) => (
  <div
    onClick={() => controller.toggleIsActiveNote(stepPosition)}
    onContextMenu={(e) => controller.onSplitSquare(stepPosition, e)}
    className={`square${isPlaying ? " playing" : ""}${
      isActive ? " active" : ""
    }${isSplit ? " split" : ""}`}
  />
);
