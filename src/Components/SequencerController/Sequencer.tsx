import { GridRow } from "../Row/Row";
import "./SequencerStyle.scss";
import { GridContainer } from "../Grid/GridContainer";
import { FunctionComponent } from "react";
import { EditorContainer } from "../Editor/EditorContainer";
import { Instrument } from "../InstrumentSelector/InstrumentSelector";
import { BottomControlsComponent } from "../BottomControls/BottomControlComponent";
import { TopMenu } from "../TopMenu/TopMenu";

export interface SequencerController {
  startSequencer: () => void;
  stopSequencer: () => void;
  handleChangeTempo: (bpn: string) => void;
  updateRows: (row: GridRow) => void;
}

interface SequencerProps {
  controller: SequencerController;
  rows: GridRow[];
  steps: number;
  bpm: number;
  instruments: Instrument[];
  isAudioStarted: boolean;
}

export const Sequencer: FunctionComponent<SequencerProps> = ({
  controller,
  rows,
  steps,
  bpm,
  instruments,
  isAudioStarted,
}) => (
  <div className="sequencer-container">
    <TopMenu controller={controller} bpm={bpm} />
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
    <BottomControlsComponent />
  </div>
);
