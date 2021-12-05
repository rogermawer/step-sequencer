import { GridController } from "../Grid/Grid";
import { StepPosition } from "../Row/Row";
import "../Square/SquareStyle.scss";

interface SquareProps {
  controller: GridController;
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
