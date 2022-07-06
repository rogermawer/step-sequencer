import { GridRow } from "../Row/Row";
import "./SequencerStyle.scss";
import { GridContainer } from "../Grid/GridContainer";
import { FunctionComponent } from "react";
import { EditorContainer } from "../Editor/EditorContainer";
import { Instrument } from "../InstrumentSelector/InstrumentSelector";

export interface SequencerController {
  updateRows: (row: GridRow) => void;
}

interface SequencerProps {
  controller: SequencerController;
  rows: GridRow[];
  steps: number;
  instruments: Instrument[];
  isAudioStarted: boolean;
}

export const Sequencer: FunctionComponent<SequencerProps> = ({
  controller,
  rows,
  steps,
  instruments,
  isAudioStarted,
}) => (
  <div className="sequencer">
    <EditorContainer
      controller={controller}
      rows={rows}
      instruments={instruments}
    />
    <GridContainer
      controller={controller}
      steps={steps}
      rows={rows}
      isAudioStarted={isAudioStarted}
    />
  </div>
);
