import { Instrument } from "../InstrumentSelector/InstrumentSelector";
import { GridRow } from "../Row/Row";
import "./EditingMenuStyle.scss";

export interface EditingMenuComponentMethods {
  onChangeInstrument: (instrument: any) => void;
}

interface EditingMenuControllerProps extends EditingMenuControllerState {
  controller: EditingMenuComponentMethods;
  editingRow: GridRow;
}

export interface EditingMenuControllerState {
  instruments: Instrument[];
  selectedInstrument: Instrument;
}

export const EditingMenu = ({
  controller,
  editingRow,
  instruments,
  selectedInstrument,
}: EditingMenuControllerProps) => {
  return (
    <div className={`editing-menu${editingRow !== null ? " is-open" : ""}`}>
      <div>Row Note: {editingRow.note}</div>
      <div>
        {console.log("rendre")}
        Current Instrument:
        <select
          value={selectedInstrument.name}
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
