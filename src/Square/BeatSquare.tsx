import "../Square/BeatSquareStyle.scss";

interface SquareProps {
  beat: number;
  isActive: boolean;
}

const BeatSquare = ({ beat, isActive }: SquareProps) => {
  return <div className={`beat-square${isActive ? " active" : ""}`}></div>;
};

export default BeatSquare;
