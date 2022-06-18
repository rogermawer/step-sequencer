import { ChangeEvent, FunctionComponent } from "react";
import { Slider } from "../../Common/Slider/Slider";
import { Instrument } from "../InstrumentSelector/InstrumentSelector";
import { GridRow } from "../Row/Row";
import "./EditorStyle.scss";

export interface EditorController {
  onChangeInstrument: (instrument: any) => void;
  setEnvelopeForRow: (v: string) => void;
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
}) => (
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
