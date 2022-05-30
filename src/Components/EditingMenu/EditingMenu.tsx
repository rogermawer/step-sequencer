import { FunctionComponent } from "react";
import { GridRow } from "../Row/Row";
import { EditingMenuContainerState } from "./EditingMenuContainer";
import "./EditingMenuStyle.scss";

export interface EditingMenuController {
  onChangeInstrument: (instrument: any) => void;
}

interface EditingMenuProps extends EditingMenuContainerState {
  controller: EditingMenuController;
  editingRow: GridRow;
}

export const EditingMenu: FunctionComponent<EditingMenuProps> = ({
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
