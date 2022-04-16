import { BottomControlContainer } from "../Sections/BottomControls/BottomControlContainer";
import { GridRow, StepPosition } from "../Components/Row/Row";
import "../SequencerController/SequencerStyle.scss";
import { EditingMenuController } from "../Components/EditingMenu/EditingMenuController";
import { GridContainer } from "../Sections/Grid/GridContainer";

export interface SequencerController {
  toggleIsActiveNote: (p: StepPosition) => void;
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

export const Sequencer: React.FunctionComponent<SequencerProps> = ({
  controller,
  rows,
  steps,
  editingRowIndex,
}) => (
  <div className="sequencer">
    {editingRowIndex !== null ? (
      <EditingMenuController
        controller={controller}
        editingRow={rows[editingRowIndex]}
      />
    ) : null}
    <GridContainer controller={controller} steps={steps} rows={rows} />
    <BottomControlContainer controller={controller} />
  </div>
);
