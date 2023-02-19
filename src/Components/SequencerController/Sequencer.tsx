import { GridRow } from "../Row/Row";
import "./SequencerStyle.scss";
import { GridContainer } from "../Grid/GridContainer";
import { FunctionComponent } from "react";
import { EditorContainer } from "../Editor/EditorContainer";
import { BottomControlsComponent } from "../BottomControls/BottomControlComponent";
import { TopMenu } from "../TopMenu/TopMenu";
import { SequencerState } from "./SequencerController";

export interface SequencerController {
  startSequencer: () => void;
  pauseSequencer: () => void;
  stopSequencer: () => void;
  handleChangeTempo: (bpn: string) => void;
  updateRows: (row: GridRow) => void;
}

interface SequencerProps extends SequencerState {
  controller: SequencerController;
}

export const Sequencer: FunctionComponent<SequencerProps> = ({
  controller,
  rows,
  steps,
  bpm,
  isPlaying,
  instruments,
}) => (
  <div className="sequencer-container">
    <TopMenu controller={controller} bpm={bpm} isPlaying={isPlaying} />
    <div className="sequencer">
      <EditorContainer
        controller={controller}
        rows={rows}
        instruments={instruments}
      />
      <GridContainer controller={controller} steps={steps} rows={rows} />
    </div>
    <BottomControlsComponent />
  </div>
);
