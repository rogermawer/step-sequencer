import { GridRow, Row } from "../Row/Row";
import "./GridStyle.scss";
import { BeatTrackerRow } from "../BeatTrackerRow/BeatTrackerRow";
import { FunctionComponent } from "react";
import { SquareController } from "../Square/Square";

interface GridProps {
  controller: SquareController;
  beat: number;
  rows: GridRow[];
  steps: number;
}

export const Grid: FunctionComponent<GridProps> = ({
  controller,
  beat,
  rows,
  steps,
}) => (
  <div className="grid">
    {rows.map((row, i) => (
      <Row key={i} controller={controller} beat={beat} row={row} />
    ))}
    <BeatTrackerRow beat={beat} steps={steps} />
  </div>
);
