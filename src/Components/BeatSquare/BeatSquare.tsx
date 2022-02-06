import "./BeatSquareStyle.scss";

interface SquareProps {
  beat: number;
  isActive: boolean;
}

export const BeatSquare = ({ beat, isActive }: SquareProps) => {
  return <div className={`beat-square${isActive ? " active" : ""}`}></div>;
};
