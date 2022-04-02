import { GridRow } from "../../Sections/Grid/Grid";
import {
  Instrument,
  instruments,
} from "../InstrumentSelector/InstrumentSelector";
import "./EditingMenuStyle.scss";

export interface EditingMenuComponentMethods {
  onChangeInstrument: (rowIndex: number, instrument: Instrument) => void;
}

interface EditingMenuControllerProps extends EditingMenuControllerState {
  controller: EditingMenuComponentMethods;
  editingRow: GridRow | null;
}

export interface EditingMenuControllerState {}

export const EditingMenu = ({
  controller,
  editingRow,
}: EditingMenuControllerProps) => {
  return (
    <div className={`editing-menu${editingRow !== null ? " is-open" : ""}`}>
      <div>{editingRow?.note}</div>
      <ul className={`instrument-list`}>
        {instruments.map((instrument, i) => (
          <li key={i}>
            <button
              onClick={() => controller.onChangeInstrument(i, instrument)}
            >
              {instrument.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
