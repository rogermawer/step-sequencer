import { BeatSquare } from "../BeatSquare/BeatSquare";
import "./BeatTrackerStyle.scss";

interface BeatTrackerProps {
  steps: number;
  beat: number;
}

export const BeatTrackerRow = ({ steps, beat }: BeatTrackerProps) => (
  <div className="beat-tracker">
    <div className="beat-square"></div>
    {[...Array(steps)].map((step, i) => (
      <BeatSquare key={i} beat={beat} isActive={i === beat} />
    ))}
  </div>
);
