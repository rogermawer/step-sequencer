import Row, { GridRow, StepPosition } from "../../Components/Row/Row";
import "./GridStyle.scss";
import { InstrumentSelectorController } from "../../Components/InstrumentSelector/InstrumentSelector";
import { BeatTrackerRow } from "../../Components/BeatTrackerRow/BeatTrackerRow";
import { FunctionComponent } from "react";

export interface GridController extends InstrumentSelectorController {
  toggleIsActiveNote: (p: StepPosition) => void;
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
    <div className="row-container">
      {rows.map((row, i) => (
        <Row key={i} controller={controller} beat={beat} row={row} />
      ))}
      <BeatTrackerRow beat={beat} steps={steps} />
    </div>
  </div>
);
