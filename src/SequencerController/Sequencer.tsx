import { BottomControlContainer } from "../Sections/BottomControls/BottomControlContainer";
import { Grid, GridRow } from "../Sections/Grid/Grid";
import { StepPosition } from "../Components/Row/Row";
import "../SequencerController/SequencerStyle.scss";
import { EditingMenuController } from "../Components/EditingMenu/EditingMenuController";

export interface SequencerController {
  toggleIsActiveNote: (p: StepPosition) => void;
  startSequencer: () => void;
  stopSequencer: () => void;
  updateRows: (row: GridRow) => void;
  toggleInstrumentSelector: (r: GridRow) => void;
}

interface SequencerProps {
  controller: SequencerController;
  beat: number;
  rows: GridRow[];
  steps: number;
  editingRow: GridRow | null;
}

export const Sequencer = ({
  controller,
  beat,
  rows,
  steps,
  editingRow,
}: SequencerProps) => (
  <div className="sequencer">
    {editingRow !== null ? (
      <EditingMenuController controller={controller} editingRow={editingRow} />
    ) : null}
    <Grid controller={controller} beat={beat} steps={steps} rows={rows} />
    <BottomControlContainer controller={controller} />
  </div>
);
