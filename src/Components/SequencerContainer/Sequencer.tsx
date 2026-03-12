import "./SequencerStyle.scss";
import { StepEditorContainer } from "../StepEditor/StepEditorContainer";
import { FunctionComponent } from "react";
import { TopMenu } from "../TopMenu/TopMenu";
import { InstrumentSelector } from "../InstrumentSelector/InstrumentSelector";
import { GridRow, GridRows, Step } from "../StepEditor/StepEditor";
import { RowEditorContainer } from "../RowEditor/RowEditorContainer";
import { ToneInstrumentName } from "../../audio/AudioEngine";
import { Direction } from "./SequencerContainer";

export interface SequencerDelegate {
  startSequencer: () => void;
  pauseSequencer: () => void;
  stopSequencer: () => void;
  handleChangeTempo: (bpn: string) => void;
  updateRows: (rowIndex: number, row: GridRow) => void;
  updateSteps: (rowIndex: number, steps: Step[]) => void;
  onShiftSequence: (dir: Direction) => void;
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
    </div>
    <div className="shift-controls">
      <button
        className="shift-btn"
        onClick={() => delegate.onShiftSequence(Direction.LEFT)}
      >
        &#8592;
      </button>
      <button
        className="shift-btn"
        onClick={() => delegate.onShiftSequence(Direction.RIGHT)}
      >
        &#8594;
      </button>
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
