import "./SequencerStyle.scss";
import { StepEditorContainer } from "../StepEditor/StepEditorContainer";
import { FunctionComponent } from "react";
import { TopMenu } from "../TopMenu/TopMenu";
import { InstrumentSelector } from "../InstrumentSelector/InstrumentSelector";
import { GridRow, GridRows, Step } from "../StepEditor/StepEditor";
import { RowEditorContainer } from "../RowEditor/RowEditorContainer";
import { ToneInstrumentName } from "../../audio/AudioEngine";
import { BeatTrackerRow } from "../BeatTrackerRow/BeatTrackerRow";

export interface SequencerDelegate {
  startSequencer: () => void;
  pauseSequencer: () => void;
  stopSequencer: () => void;
  handleChangeTempo: (bpn: string) => void;
  updateRows: (rowIndex: number, row: GridRow) => void;
  updateSteps: (rowIndex: number, steps: Step[]) => void;
  onToggleEditor: (rowIndex: number) => void;
}

interface SequencerProps {
  steps: number;
  rows: GridRows;
  bpm: number;
  beat: number;
  isPlaying: boolean;
  instrumentNames: ToneInstrumentName[];
  delegate: SequencerDelegate;
  editingIndex: number;
}

export const Sequencer: FunctionComponent<SequencerProps> = ({
  delegate,
  rows,
  bpm,
  beat,
  isPlaying,
  instrumentNames,
  editingIndex,
  steps,
}) => (
  <div className="sequencer-container">
    <TopMenu delegate={delegate} bpm={bpm} isPlaying={isPlaying} />
    <div className="sequencer">
      {Object.keys(rows).map((k) => {
        const rowIndex = Number(k);
        return (
          <div key={rowIndex} className="row">
            <InstrumentSelector
              delegate={delegate}
              rowIndex={rowIndex}
              isEditing={rowIndex === editingIndex}
            />
            <StepEditorContainer
              delegate={delegate}
              rowIndex={rowIndex}
              steps={rows[rowIndex].steps}
              beat={beat}
            />
          </div>
        );
      })}
      <BeatTrackerRow steps={steps} beat={beat} />
    </div>
    {editingIndex >= 0 ? (
      <RowEditorContainer
        delegate={delegate}
        instrumentNames={instrumentNames}
        editingIndex={editingIndex}
        rows={rows}
      />
    ) : null}
  </div>
);
