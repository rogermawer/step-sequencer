import { useRef } from "react";
import { Selector } from "../../Common/Selector/Selector";
import { SvgIcon } from "../../Common/SvgIcon";
import { useClickOutside } from "../../Hooks/useClickOutside";
import {
  Instrument,
  InstrumentSelector,
} from "../InstrumentSelector/InstrumentSelector";
import { GridRow } from "../Row/Row";
import "./EditorStyle.scss";

export interface EditorController {
  onChangeInstrument: (instrument: string) => void;
  onChangeNote: (note: string) => void;
  onChangeOctave: (octave: string) => void;
  onToggleEditor: (row: GridRow | null) => void;
  onShiftRow: (r: GridRow) => void;
  onShiftSequence: () => void;
}

interface EditorProps {
  controller: EditorController;
  editingRow: GridRow | null;
  instruments: Instrument[];
  rows: GridRow[];
}

const possibleNotes = ["C", "D", "E", "F", "G", "A", "B"];
const possibleOctaves = [1, 2, 3, 4, 5];

export const Editor: React.FC<EditorProps> = ({
  controller,
  editingRow,
  instruments,
  rows,
}) => {
  const ref = useRef(null);
  useClickOutside(ref, () => controller.onToggleEditor(null));

  return (
    <div ref={ref}>
      <div className={`editing-menu${editingRow !== null ? " is-open" : ""}`}>
        <SvgIcon
          type="arrowDown"
          className="close"
          onClick={() => controller.onToggleEditor(null)}
        />
        {editingRow ? (
          <div className="selector-group">
            <div className="note-actions">
              <h3>Note Actions</h3>
              <Selector
                label="Row Note"
                value={editingRow.note}
                items={possibleNotes.map((note) => ({ name: note }))}
                onChange={controller.onChangeNote}
              />

              <Selector
                label="Octave"
                value={editingRow.octave}
                items={possibleOctaves.map((octave) => ({ name: octave }))}
                onChange={controller.onChangeOctave}
              />

              <Selector
                label="Current Instrument"
                value={editingRow.instrument.name}
                items={instruments.map((inst) => ({ name: inst.name }))}
                onChange={controller.onChangeInstrument}
              />
            </div>
            <div className="row-actions">
              <h3>Row Actions</h3>
              <button
                className="shift"
                onClick={() => controller.onShiftRow(editingRow)}
              >
                Shift Row
                <SvgIcon type="shift" />
              </button>
              <button className="shift" onClick={controller.onShiftSequence}>
                Shift Sequence
                <SvgIcon type="shift" />
              </button>
            </div>
          </div>
        ) : null}
      </div>

      <div className="selector-container">
        {rows.map((row, i) => (
          <InstrumentSelector
            key={i}
            controller={controller}
            row={row}
            isEditing={row.index === editingRow?.index}
          />
        ))}
      </div>
    </div>
  );
};
