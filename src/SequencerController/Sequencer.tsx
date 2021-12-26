import { BottomControlContainer } from "../Controls/BottomControlContainer";
import { Grid, GridRow } from "../Grid/Grid";
import { StepPosition } from "../Row/Row";
import "../SequencerController/SequencerStyle.scss";
import {
  InstrumentSelectorContainer,
  ToneInstrument,
} from "../Controls/InstrumentSelector/InstrumentSelectorContainer";

export interface SequencerController {
  toggleIsActiveNote: (p: StepPosition) => void;
  startAudio: () => void;
  toggleSequencer: () => void;
  onChangeInstrument: (index: number, instrument: ToneInstrument) => void;
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
          <div>
            <InstrumentSelectorContainer
              sequencerController={controller}
              rowIndex={i}
            />
          </div>
        ))}
      </div>
      <Grid controller={controller} beat={beat} rows={rows} steps={steps} />
    </div>
    <BottomControlContainer controller={controller} />
  </div>
);
