import { ControlContainer } from "../Controls/ControlContainer";
import Grid, { GridRow } from "../Grid/Grid";
import { StepPosition } from "../Row/Row";
import "../SequencerController/SequencerStyle.scss";

interface SequencerController {
  toggleIsActiveNote: (p: StepPosition) => void;
  startAudio: () => void;
  toggleSequencer: () => void;
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
  controller,
  steps,
}: SequencerProps) => (
  <div className="sequencer-container">
    <Grid controller={controller} beat={beat} rows={rows} steps={steps} />
    <ControlContainer controller={controller} />
  </div>
);
