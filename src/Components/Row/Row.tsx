import Square from "../Square/Square";
import "./RowStyle.scss";
import { GridController, GridRow } from "../../Sections/Grid/Grid";
import { MembraneSynth, Synth } from "tone";

interface RowProps {
  controller: GridController;
  row: GridRow;
  beat: number;
}

export interface Step {
  isActive: boolean;
  synth: Synth | MembraneSynth;
}

export type StepPosition = [string, number];

const Row = ({ controller, row, beat }: RowProps) => (
  <div className="row">
    {row.steps.map((step, i) => (
      <Square
        controller={controller}
        isPlaying={beat === i}
        key={i}
        isActive={step.isActive}
        stepPosition={[row.note, i]}
      />
    ))}
  </div>
);

export default Row;
