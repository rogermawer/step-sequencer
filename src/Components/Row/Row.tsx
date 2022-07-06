import Square, { SquareController } from "../Square/Square";
import "./RowStyle.scss";
import { Instrument } from "../InstrumentSelector/InstrumentSelector";
import { FunctionComponent } from "react";
import { GridController } from "../Grid/Grid";

interface RowProps {
  controller: GridController;
  row: GridRow;
  beat: number;
}

export interface GridRow {
  index: number;
  note: string;
  octave: number;
  instrument: Instrument;
  steps: Step[];
}

export interface Step {
  isActive: boolean;
}

export type StepPosition = { rowIndex: number; stepIndex: number };

export const Row: FunctionComponent<RowProps> = ({ controller, row, beat }) => (
  <div className="row">
    {row.steps.map((step, i) => (
      <Square
        key={i}
        controller={controller}
        isPlaying={beat === i}
        isActive={step.isActive}
        stepPosition={{ rowIndex: row.index, stepIndex: i }}
      />
    ))}
  </div>
);
