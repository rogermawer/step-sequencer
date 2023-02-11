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
    {[...Array(steps)].map((s, i) => (
      <BeatSquare key={i} isActive={i === beat} />
    ))}
  </div>
);
