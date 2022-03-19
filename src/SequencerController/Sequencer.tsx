import { BottomControlContainer } from "../Sections/BottomControls/BottomControlContainer";
import { Grid, GridRow } from "../Sections/Grid/Grid";
import { StepPosition } from "../Components/Row/Row";
import "../SequencerController/SequencerStyle.scss";
import { SideControlsContainer } from "../Sections/SideControls/SideControlsContainer";

export interface SequencerController {
  toggleIsActiveNote: (p: StepPosition) => void;
  startSequencer: () => void;
  stopSequencer: () => void;
  updateRows: (index: number, row: GridRow) => void;
}

interface SequencerProps {
  controller: SequencerController;
  beat: number;
  rows: GridRow[];
  steps: number;
}

export const Sequencer = ({
  beat,
  rows,
  steps,
  controller,
}: SequencerProps) => (
  <div className="sequencer-container">
    <div className="grid-container">
      <SideControlsContainer rows={rows} controller={controller} />
      <Grid controller={controller} beat={beat} rows={rows} steps={steps} />
    </div>
    <BottomControlContainer controller={controller} />
  </div>
);
