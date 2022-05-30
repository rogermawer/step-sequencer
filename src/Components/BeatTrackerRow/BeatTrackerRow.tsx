import { FunctionComponent } from "react";
import { BeatSquare } from "../BeatSquare/BeatSquare";
import "./BeatTrackerStyle.scss";

interface BeatTrackerProps {
  steps: number;
  beat: number;
}

export const BeatTrackerRow: FunctionComponent<BeatTrackerProps> = ({
  steps,
  beat,
}) => (
  <div className="beat-tracker">
    {[...Array(steps)].map((step, i) => (
      <BeatSquare key={i} beat={beat} isActive={i === beat} />
    ))}
  </div>
);
