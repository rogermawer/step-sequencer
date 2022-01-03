import { BottomControlContainer } from "../Controls/BottomControls/BottomControlContainer";
import { Grid, GridRow } from "../Grid/Grid";
import { StepPosition } from "../Row/Row";
import "../SequencerController/SequencerStyle.scss";
import { SideControlsContainer } from "../Controls/SideControls/SideControlsContainer";

export interface SequencerController {
  toggleIsActiveNote: (p: StepPosition) => void;
  startAudio: () => void;
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
