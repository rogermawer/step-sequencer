import { BottomControlContainer } from "../BottomControls/BottomControlContainer";
import { GridRow } from "../Row/Row";
import "./SequencerStyle.scss";
import { GridContainer } from "../Grid/GridContainer";
import { FunctionComponent } from "react";
import { EditorContainer } from "../Editor/EditorContainer";
import { Instrument } from "../InstrumentSelector/InstrumentSelector";

export interface SequencerController {
  startSequencer: () => void;
  stopSequencer: () => void;
  updateRows: (row: GridRow) => void;
}

interface SequencerProps {
  controller: SequencerController;
  rows: GridRow[];
  steps: number;
  instruments: Instrument[];
}

export const Sequencer: FunctionComponent<SequencerProps> = ({
  controller,
  rows,
  steps,
  instruments,
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
    <BottomControlContainer controller={controller} />
  </div>
);
