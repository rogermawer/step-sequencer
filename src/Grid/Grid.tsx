import Row, { Step, StepPosition } from "../Row/Row";
import BeatTrackerRow from "../Row/BeatTrackerRow";
import "../Grid/GridStyle.scss";

export interface GridController {
  toggleIsActiveNote: (p: StepPosition) => void;
}

interface GridProps {
  controller: GridController;
  beat: number;
  steps: number;
  rows: GridRow[];
}

export interface GridRow {
  note: string;
  steps: Step[];
}

export const Grid = ({ controller, beat, steps, rows }: GridProps) => (
  <div className="grid">
    {rows.map((row, i) => (
      <Row key={i} controller={controller} beat={beat} row={row} />
    ))}
    <BeatTrackerRow beat={beat} steps={steps} />
  </div>
);
