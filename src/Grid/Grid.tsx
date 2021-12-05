import Row, { Step, StepPosition } from "../Row/Row";
import "../Grid/GridStyle.scss";
import BeatTrackerRow from "../Row/BeatTrackerRow";

export interface GridController {
  toggleIsActiveNote: (p: StepPosition) => void;
}

interface GridProps {
  controller: GridController;
  beat: number;
  rows: GridRow[];
  steps: number;
}

export interface GridRow {
  note: string;
  steps: Step[];
}

const Grid = ({ controller, beat, rows, steps }: GridProps) => (
  <div className="grid">
    {rows.map((row, i) => (
      <Row key={i} controller={controller} beat={beat} row={row} />
    ))}
    <BeatTrackerRow steps={steps} beat={beat} />
  </div>
);

export default Grid;
