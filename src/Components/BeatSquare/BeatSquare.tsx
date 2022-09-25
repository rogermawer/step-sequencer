import { FunctionComponent } from "react";
import "./BeatSquareStyle.scss";

interface SquareProps {
  isActive: boolean;
}

export const BeatSquare: FunctionComponent<SquareProps> = ({ isActive }) => {
  return <div className={`beat-square${isActive ? " active" : ""}`}></div>;
};
