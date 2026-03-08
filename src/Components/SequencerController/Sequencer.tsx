import { GridRow } from "../Row/Row";
import "./SequencerStyle.scss";
import { GridContainer } from "../Grid/GridContainer";
import { FunctionComponent } from "react";
import { EditorContainer } from "../Editor/EditorContainer";
import { TopMenu } from "../TopMenu/TopMenu";
import { SequencerState } from "./SequencerController";

export interface SequencerDelegate {
  startSequencer: () => void;
  pauseSequencer: () => void;
  stopSequencer: () => void;
  handleChangeTempo: (bpn: string) => void;
  updateRows: (row: GridRow) => void;
}

interface SequencerProps extends SequencerState {
  delegate: SequencerDelegate;
}

export const Sequencer: FunctionComponent<SequencerProps> = ({
  delegate,
  rows,
  steps,
  bpm,
  beat,
  isPlaying,
  instrumentNames,
}) => (
  <div className="sequencer-container">
    <TopMenu controller={delegate} bpm={bpm} isPlaying={isPlaying} />
    <div className="sequencer">
      <EditorContainer
        controller={delegate}
        rows={rows}
        instrumentNames={instrumentNames}
      />
      <GridContainer controller={delegate} steps={steps} rows={rows} beat={beat} />
    </div>
  </div>
);
