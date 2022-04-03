import Square from "../Square/Square";
import "./RowStyle.scss";
import { GridController } from "../../Sections/Grid/Grid";
import {
  InstrumentSelector,
  ToneInstrument,
} from "../InstrumentSelector/InstrumentSelector";

interface RowProps {
  controller: GridController;
  row: GridRow;
  beat: number;
}

export interface GridRow {
  index: number;
  note: string;
  steps: Step[];
}

export interface Step {
  isActive: boolean;
  synth: ToneInstrument;
}

export type StepPosition = [string, number];

const Row = ({ controller, row, beat }: RowProps) => (
  <div className="row">
    <InstrumentSelector controller={controller} row={row} />
    {row.steps.map((step, i) => (
      <Square
        key={i}
        controller={controller}
        isPlaying={beat === i}
        isActive={step.isActive}
        stepPosition={[row.note, i]}
      />
    ))}
  </div>
);

export default Row;
