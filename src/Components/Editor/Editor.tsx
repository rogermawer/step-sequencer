import { FunctionComponent } from "react";
import { Instrument } from "../InstrumentSelector/InstrumentSelector";
import { GridRow } from "../Row/Row";
import "./EditorStyle.scss";

export interface EditorController {
  onChangeInstrument: (instrument: any) => void;
}

interface EditorProps {
  controller: EditorController;
  editingRow: GridRow;
  instruments: Instrument[];
}

export const Editor: FunctionComponent<EditorProps> = ({
  controller,
  editingRow,
  instruments,
}) => {
  return (
    <div className={`editing-menu${editingRow !== null ? " is-open" : ""}`}>
      <div>Row Note: {editingRow.note}</div>
      <div>
        Current Instrument:
        <select
          value={editingRow.instrument.name}
          onChange={(e) => controller.onChangeInstrument(e.target.value)}
        >
          {instruments.map((instrument, index) => (
            <option key={index} value={instrument.name}>
              {instrument.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
