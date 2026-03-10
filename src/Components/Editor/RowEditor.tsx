import { useRef } from "react";
import { Selector } from "../../Common/Selector/Selector";
import { SvgIcon } from "../../Common/SvgIcon";
import { useClickOutside } from "../../Hooks/useClickOutside";
import { InstrumentSelector } from "../InstrumentSelector/InstrumentSelector";
import "./EditorStyle.scss";
import { GridRow, GridRows } from "../StepEditor/StepEditor";
import { ToneInstrumentName } from "../../audio/AudioEngine";

export interface EditorDelegate {
  onChangeInstrument: (instrument: string) => void;
  onChangeNote: (note: string) => void;
  onChangeOctave: (octave: string) => void;
  onToggleEditor: (rowIndex: number | null) => void;
  onShiftRow: (row: GridRow | null) => void;
  onShiftSequence: () => void;
}

interface EditorProps {
  delegate: EditorDelegate;
  editingRow: GridRow | null;
  editingRowIndex: number | null;
  instrumentNames: ToneInstrumentName[];
  rows: GridRows;
}

const possibleNotes = ["C", "D", "E", "F", "G", "A", "B"];
const possibleOctaves = [1, 2, 3, 4, 5];

export const Editor: React.FC<EditorProps> = ({
  delegate,
  editingRow,
  editingRowIndex,
  instrumentNames,
  rows,
}) => {
  const ref = useRef(null);
  useClickOutside(ref, () => delegate.onToggleEditor(null));

  return (
    <div ref={ref}>
      <div className={`editing-menu${editingRow !== null ? " is-open" : ""}`}>
        <SvgIcon
          type="arrowDown"
          className="close"
          onClick={() => delegate.onToggleEditor(null)}
        />
        {editingRow ? (
          <div className="selector-group">
            <div className="note-actions">
              <h3>Note Actions</h3>
              <Selector
                label="Row Note"
                value={editingRow.note}
                items={possibleNotes.map((note) => ({ name: note }))}
                onChange={delegate.onChangeNote}
              />

              <Selector
                label="Octave"
                value={editingRow.octave}
                items={possibleOctaves.map((octave) => ({ name: octave }))}
                onChange={delegate.onChangeOctave}
              />

              <Selector
                label="Current Instrument"
                value={editingRow.instrumentName}
                items={instrumentNames.map((name) => ({ name }))}
                onChange={delegate.onChangeInstrument}
              />
            </div>
            <div className="row-actions">
              <h3>Row Actions</h3>
              <button
                className="shift"
                onClick={() => delegate.onShiftRow(editingRow)}
              >
                Shift Row
                <SvgIcon type="shift" />
              </button>
              <button className="shift" onClick={delegate.onShiftSequence}>
                Shift Sequence
                <SvgIcon type="shift" />
              </button>
            </div>
          </div>
        ) : null}
      </div>

      <div className="selector-container">
        {Object.entries(rows).map(([i]) => (
          <InstrumentSelector
            key={i}
            delegate={delegate}
            rowIndex={Number(i)}
            isEditing={Number(i) === editingRowIndex}
          />
        ))}
      </div>
    </div>
  );
};
