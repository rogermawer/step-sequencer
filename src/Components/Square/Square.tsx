import { useRef } from "react";
import "./SquareStyle.scss";
import { StepPosition } from "../StepEditor/StepEditor";

export interface SquareDelegate {
  toggleIsActiveNote: (p: StepPosition) => void;
  onSplitSquare: (p: StepPosition) => void;
}

interface SquareProps {
  delegate: SquareDelegate;
  isActive: boolean;
  isSplit: boolean;
  isPlaying: boolean;
  stepPosition: StepPosition;
}

const HOLD_DURATION = 400;

export const Square = ({
  delegate,
  isActive,
  isSplit,
  isPlaying,
  stepPosition,
}: SquareProps) => {
  const holdTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const didHold = useRef(false);

  const startHold = () => {
    didHold.current = false;
    holdTimer.current = setTimeout(() => {
      didHold.current = true;
      delegate.onSplitSquare(stepPosition);
    }, HOLD_DURATION);
  };

  const cancelHold = () => {
    if (holdTimer.current !== null) {
      clearTimeout(holdTimer.current);
      holdTimer.current = null;
    }
  };

  const handleClick = () => {
    if (didHold.current) {
      didHold.current = false;
      return;
    }
    delegate.toggleIsActiveNote(stepPosition);
  };

  return (
    <div
      onClick={handleClick}
      onPointerDown={startHold}
      onPointerUp={cancelHold}
      onPointerLeave={cancelHold}
      onPointerCancel={cancelHold}
      onContextMenu={(e) => e.preventDefault()}
      className={`square${isPlaying ? " playing" : ""}${
        isActive ? " active" : ""
      }${isSplit ? " split" : ""}`}
    />
  );
};
