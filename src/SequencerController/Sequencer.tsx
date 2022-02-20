import { BottomControlContainer } from "../Sections/BottomControls/BottomControlContainer";
import { Grid, GridRow } from "../Sections/Grid/Grid";
import { StepPosition } from "../Components/Row/Row";
import "../SequencerController/SequencerStyle.scss";
import { SideControlsContainer } from "../Sections/SideControls/SideControlsContainer";

export interface SequencerController {
  toggleIsActiveNote: (p: StepPosition) => void;
  toggleSequencer: () => void;
  updateRows: (index: number, row: GridRow) => void;
}

interface SequencerProps {
  beat: number;
  rows: GridRow[];
  steps: number;
  controller: SequencerController;
}

export const Sequencer = ({
  beat,
  rows,
  steps,
  controller,
}: SequencerProps) => (
  <div className="sequencer-container">
    <div className="grid-container">
      <SideControlsContainer rows={rows} seqencerController={controller} />
      <Grid controller={controller} beat={beat} rows={rows} steps={steps} />
    </div>
    <BottomControlContainer controller={controller} />
  </div>
);
