import { Select } from "react-nexusui";
import {
  Instrument,
  instruments,
} from "../InstrumentSelector/InstrumentSelector";
import { GridRow } from "../Row/Row";
import "./EditingMenuStyle.scss";

export interface EditingMenuComponentMethods {
  onChangeInstrument: (instrument: Instrument) => void;
}

interface EditingMenuControllerProps extends EditingMenuControllerState {
  controller: EditingMenuComponentMethods;
  editingRow: GridRow;
}

export interface EditingMenuControllerState {}

export const EditingMenu = ({
  controller,
  editingRow,
}: EditingMenuControllerProps) => {
  return (
    <div className={`editing-menu${editingRow !== null ? " is-open" : ""}`}>
      <div>Row Note: {editingRow?.note}</div>
      <div>Current Instrument: </div>
      <Select
        options={instruments.map((instrument, i) => instrument.name)}
        onChange={(selection: { value: string; index: number }) =>
          controller.onChangeInstrument(instruments[selection.index])
        }
      ></Select>
    </div>
  );
};
