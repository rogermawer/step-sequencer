import "./SequencerStyle.scss";
import { StepEditorContainer } from "../StepEditor/StepEditorContainer";
import { FunctionComponent } from "react";
import { TopMenu } from "../TopMenu/TopMenu";
import { InstrumentSelector } from "../InstrumentSelector/InstrumentSelector";
import { GridRow, GridRows, Step } from "../StepEditor/StepEditor";
import { RowEditorContainer } from "../RowEditor/RowEditorContainer";
import { ToneInstrumentName } from "../../audio/AudioEngine";
import { Direction } from "./SequencerContainer";
import { GenreChips } from "../GenreChips/GenreChips";

export interface SequencerDelegate {
  startSequencer: () => void;
  pauseSequencer: () => void;
  stopSequencer: () => void;
  handleChangeTempo: (bpn: string) => void;
  handleChangeLoopLength: (n: number) => void;
  updateRows: (rowIndex: number, row: GridRow) => void;
  updateSteps: (rowIndex: number, steps: Step[]) => void;
  onShiftSequence: (dir: Direction) => void;
  onToggleEditor: (rowIndex: number) => void;
  onSelectGenre: (genre: string) => void;
}

interface SequencerProps {
  loopLength: number;
  rows: GridRows;
  bpm: number;
  beat: number;
  isPlaying: boolean;
  instrumentNames: ToneInstrumentName[];
  delegate: SequencerDelegate;
  editingIndex: number;
  loadingGenre: string | null;
  isLoading: boolean;
}

export const Sequencer: FunctionComponent<SequencerProps> = ({
  delegate,
  loopLength,
  rows,
  bpm,
  beat,
  isPlaying,
  instrumentNames,
  editingIndex,
  loadingGenre,
  isLoading,
}) => (
  <div className="sequencer-container">
    <GenreChips
      onSelectGenre={delegate.onSelectGenre}
      loadingGenre={loadingGenre}
      isLoading={isLoading}
    />
    <TopMenu delegate={delegate} bpm={bpm} isPlaying={isPlaying} loopLength={loopLength} />
    <div className="hints">
      <div className="hint">
        <span className="hint-key">Tap</span> activate
      </div>
      <div className="hint">
        <span className="hint-key">Hold</span> split
      </div>
      <div className="hint">
        <span className="hint-key">&#9679;</span> edit
      </div>
    </div>
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
              loopLength={loopLength}
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
