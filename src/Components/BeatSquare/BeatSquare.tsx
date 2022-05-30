import { FunctionComponent } from "react";
import "./BeatSquareStyle.scss";

interface SquareProps {
  beat: number;
  isActive: boolean;
}

export const BeatSquare: FunctionComponent<SquareProps> = ({
  beat,
  isActive,
}) => {
  return <div className={`beat-square${isActive ? " active" : ""}`}></div>;
};
