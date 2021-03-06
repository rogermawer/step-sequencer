import { StepPosition } from "../Row/Row";
import "./SquareStyle.scss";

export interface SquareController {
  toggleIsActiveNote: (p: StepPosition) => void;
}

interface SquareProps {
  controller: SquareController;
  isActive: boolean;
  isPlaying: boolean;
  stepPosition: StepPosition;
}

const Square = ({
  controller,
  isActive,
  isPlaying,
  stepPosition,
}: SquareProps) => {
  return (
    <div
      onClick={() => controller.toggleIsActiveNote(stepPosition)}
      className={`square${isPlaying ? " playing" : ""}${
        isActive ? " active" : ""
      }`}
    ></div>
  );
};

export default Square;
