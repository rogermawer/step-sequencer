import { ControlButton } from "../Controls/ControlButtons/ControlButton";
import { BottomControlContainer } from "../Controls/BottomControlContainer";
import { Grid, GridRow } from "../Grid/Grid";
import { StepPosition } from "../Row/Row";
import "../SequencerController/SequencerStyle.scss";

interface SequencerController {
  toggleIsActiveNote: (p: StepPosition) => void;
  startAudio: () => void;
  toggleSequencer: () => void;
  onChangeInstrument: (i: number) => void;
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
      <div className="side-controls">
        {rows.map((row, i) => (
          <ControlButton
            title={"inst"}
            onClick={() => controller.onChangeInstrument(i)}
          />
        ))}
      </div>
      <Grid controller={controller} beat={beat} rows={rows} steps={steps} />
    </div>
    <BottomControlContainer controller={controller} />
  </div>
);
