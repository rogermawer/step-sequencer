import Square, { SquareController } from "../Square/Square";
import "./RowStyle.scss";
import {
  Instrument,
  InstrumentSelector,
  ToneInstrument,
} from "../InstrumentSelector/InstrumentSelector";
import { SequencerController } from "../../SequencerController/Sequencer";

interface RowProps {
  sequencerController: SequencerController;
  controller: SquareController;
  row: GridRow;
  beat: number;
}

export interface GridRow {
  index: number;
  note: string;
  instrument: Instrument;
  steps: Step[];
}

export interface Step {
  isActive: boolean;
  synth: ToneInstrument;
}

export type StepPosition = [rowIndex: number, stepIndex: number];

const Row = ({ sequencerController, controller, row, beat }: RowProps) => (
  <div className="row">
    <InstrumentSelector controller={sequencerController} row={row} />
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

export default Row;
