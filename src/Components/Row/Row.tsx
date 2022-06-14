import Square, { SquareController } from "../Square/Square";
import "./RowStyle.scss";
import { Instrument } from "../InstrumentSelector/InstrumentSelector";
import { FunctionComponent } from "react";
import { Envelope } from "../SequencerController/SequencerController";

interface RowProps {
  controller: SquareController;
  row: GridRow;
  beat: number;
}

export interface GridRow {
  index: number;
  note: string;
  instrument: Instrument;
  envelope: Envelope;
  steps: Step[];
}

export interface Step {
  isActive: boolean;
}

export type StepPosition = [rowIndex: number, stepIndex: number];

export const Row: FunctionComponent<RowProps> = ({ controller, row, beat }) => (
  <div className="row">
    {row.steps.map((step, i) => (
      <Square
        key={i}
        controller={controller}
        isPlaying={beat === i}
        isActive={step.isActive}
        stepPosition={[row.index, i]}
      />
    ))}
  </div>
);
