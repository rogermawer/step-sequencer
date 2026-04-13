import { useRef } from "react";
import { Selector } from "../../Common/Selector/Selector";
import { SvgIcon } from "../../Common/SvgIcon";
import { useClickOutside } from "../../Hooks/useClickOutside";
import "./RowEditorStyle.scss";
import { FxSettings, GridRow } from "../StepEditor/StepEditor";
import { ToneInstrumentName } from "../../audio/AudioEngine";

export interface RowEditorDelegate {
  onChangeInstrument: (instrument: ToneInstrumentName) => void;
  onChangeNote: (note: string) => void;
  onChangeOctave: (octave: string) => void;
  onShiftRow: (row: GridRow) => void;
  onChangeFx: (fx: FxSettings) => void;
  closeEditor: () => void;
}

interface RowEditorProps {
  delegate: RowEditorDelegate;
  editingRow: GridRow | null;
  instrumentNames: ToneInstrumentName[];
}

const possibleNotes = ["C", "D", "E", "F", "G", "A", "B"];
const possibleOctaves = [1, 2, 3, 4, 5];

export const RowEditor: React.FC<RowEditorProps> = ({
  delegate,
  editingRow,
  instrumentNames,
}) => {
  const ref = useRef(null);
  useClickOutside(ref, () => delegate.closeEditor());

  return (
    <div ref={ref}>
      <div className={`editing-menu${editingRow !== null ? " is-open" : ""}`}>
        <SvgIcon
          type="arrowDown"
          className="close"
          onClick={() => delegate.closeEditor()}
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
                onChange={(v) =>
                  delegate.onChangeInstrument(v as ToneInstrumentName)
                }
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
            </div>
            <div className="fx-actions">
              <h3>FX</h3>
              <div className="fx-toggles">
                <div className="fx-slider-row">
                  <span className={`fx-label${editingRow.fx.reverb.wet > 0 ? " on" : ""}`}>
                    Reverb
                  </span>
                  <input
                    type="range"
                    className="fx-slider"
                    min={0}
                    max={1}
                    step={0.01}
                    value={editingRow.fx.reverb.wet}
                    onChange={(e) =>
                      delegate.onChangeFx({
                        ...editingRow.fx,
                        reverb: { wet: parseFloat(e.target.value) },
                      })
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};
