import { BottomControlContainer } from "../Sections/BottomControls/BottomControlContainer";
import { GridRow } from "../Components/Row/Row";
import "../SequencerController/SequencerStyle.scss";
import { GridContainer } from "../Sections/Grid/GridContainer";
import { FunctionComponent } from "react";
import { EditingMenuContainer } from "../Components/EditingMenu/EditingMenuContainer";

export interface SequencerController {
  startSequencer: () => void;
  stopSequencer: () => void;
  updateRows: (row: GridRow) => void;
  toggleInstrumentSelector: (indexOfRow: number) => void;
}

interface SequencerProps {
  controller: SequencerController;
  rows: GridRow[];
  steps: number;
  editingRowIndex: number | null;
}

export const Sequencer: FunctionComponent<SequencerProps> = ({
  controller,
  rows,
  steps,
  editingRowIndex,
}) => (
  <div className="sequencer">
    {editingRowIndex !== null ? (
      <EditingMenuContainer
        controller={controller}
        editingRow={rows[editingRowIndex]}
      />
    ) : null}
    <GridContainer sequencerController={controller} steps={steps} rows={rows} />
    <BottomControlContainer controller={controller} />
  </div>
);
