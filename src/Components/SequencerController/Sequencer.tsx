import { GridRow } from "../Row/Row";
import "./SequencerStyle.scss";
import { GridContainer } from "../Grid/GridContainer";
import { FunctionComponent } from "react";
import { EditorContainer } from "../Editor/EditorContainer";
import { Instrument } from "../InstrumentSelector/InstrumentSelector";
import { BottomControlsComponent } from "../BottomControls/BottomControlComponent";

export interface SequencerController {
  startSequencer: () => void;
  stopSequencer: () => void;
  updateRows: (row: GridRow) => void;
  handleChangeTempo: (bpm: string) => void;
}

interface SequencerProps {
  controller: SequencerController;
  rows: GridRow[];
  steps: number;
  instruments: Instrument[];
  bpm: number;
}

export const Sequencer: FunctionComponent<SequencerProps> = ({
  controller,
  rows,
  steps,
  instruments,
  bpm,
}) => (
  <div className="sequencer">
    <div className="main">
      <EditorContainer
        controller={controller}
        rows={rows}
        instruments={instruments}
      />
      <GridContainer
        sequencerController={controller}
        steps={steps}
        rows={rows}
      />
    </div>
    <BottomControlsComponent controller={controller} bpm={bpm} />
  </div>
);
