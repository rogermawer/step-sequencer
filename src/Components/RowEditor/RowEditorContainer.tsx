import { RowEditor } from "./RowEditor";
import { GridRow, GridRows } from "../StepEditor/StepEditor";
import { ToneInstrumentName } from "../../audio/AudioEngine";

interface RowEditorContainerDelegate {
  updateRows: (rowIndex: number, row: GridRow) => void;
  onToggleEditor: (rowIndex: number) => void;
}

interface RowEditorContainerProps {
  delegate: RowEditorContainerDelegate;
  instrumentNames: ToneInstrumentName[];
  rows: GridRows;
  editingIndex: number;
}

export const RowEditorContainer: React.FC<RowEditorContainerProps> = ({
  delegate,
  instrumentNames,
  rows,
  editingIndex,
}) => {
  const onChangeInstrument = (instrumentName: ToneInstrumentName) => {
    _updateRow(editingIndex, {
      instrumentName,
    });
  };

  const onChangeNote = (note: string) => {
    _updateRow(editingIndex, { note });
  };

  const onChangeOctave = (octave: string) => {
    _updateRow(editingIndex, { octave: parseInt(octave) });
  };

  const onShiftRow = (row: GridRow) => {
    const steps = [...row.steps];
    const lastStep = steps.pop();
    if (lastStep) steps.unshift(lastStep);
    _updateRow(editingIndex, { steps });
  };

  const closeEditor = () => delegate.onToggleEditor(-1);

  const _updateRow = (index: number, partial: Partial<GridRow>) => {
    if (index === null) return;
    const updatedRow: GridRow = { ...rows[index], ...partial };
    delegate.updateRows(index, updatedRow);
  };

  return (
    <RowEditor
      delegate={{
        onChangeNote,
        onChangeOctave,
        onChangeInstrument,
        onShiftRow,
        closeEditor,
      }}
      instrumentNames={instrumentNames}
      editingRow={rows[editingIndex]}
    />
  );
};
