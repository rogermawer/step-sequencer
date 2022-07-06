import { GridRow, Row, StepPosition } from "../Row/Row";
import "./GridStyle.scss";
import { BeatTrackerRow } from "../BeatTrackerRow/BeatTrackerRow";
import { FunctionComponent } from "react";
import { BottomControlsComponent } from "../BottomControls/BottomControlComponent";

export interface GridController {
  startSequencer: () => void;
  stopSequencer: () => void;
  toggleIsActiveNote: (p: StepPosition) => void;
  handleChangeTempo: (bpm: string) => void;
}

interface GridProps {
  controller: GridController;
  beat: number;
  rows: GridRow[];
  steps: number;
  bpm: number;
}

export const Grid: FunctionComponent<GridProps> = ({
  controller,
  beat,
  rows,
  steps,
  bpm,
}) => (
  <div className="grid">
    {rows.map((row, i) => (
      <Row key={i} controller={controller} beat={beat} row={row} />
    ))}
    <BeatTrackerRow beat={beat} steps={steps} />
    <BottomControlsComponent controller={controller} bpm={bpm} />
  </div>
);
