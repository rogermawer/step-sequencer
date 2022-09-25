import { GridRow, Row, StepPosition } from "../Row/Row";
import "./GridStyle.scss";
import { BeatTrackerRow } from "../BeatTrackerRow/BeatTrackerRow";
import { FunctionComponent, SyntheticEvent } from "react";
import { BottomControlsComponent } from "../BottomControls/BottomControlComponent";

export interface GridController {
  toggleIsActiveNote: (p: StepPosition) => void;
  onSplitSquare: (p: StepPosition, e: SyntheticEvent) => void;
}

interface GridProps {
  controller: GridController;
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
