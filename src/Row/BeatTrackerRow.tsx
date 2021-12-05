import BeatSquare from "../Square/BeatSquare";
import "../Row/BeatTrackerStyle.scss";

interface BeatTrackerProps {
  steps: number;
  beat: number;
}

const BeatTrackerRow = ({ steps, beat }: BeatTrackerProps) => (
  <div className="beat-tracker">
    {[...Array(steps)].map((step, i) => (
      <BeatSquare key={i} beat={beat} isActive={i === beat} />
    ))}
  </div>
);

export default BeatTrackerRow;
