import { useState } from "react";
import { GridRow } from "../Row/Row";
import { Editor } from "./Editor";
import { ToneInstrumentName } from "../InstrumentSelector/InstrumentSelector";

interface EditorContainerController {
  updateRows: (row: GridRow) => void;
}

interface EditorContainerProps {
  controller: EditorContainerController;
  rows: GridRow[];
  instrumentNames: ToneInstrumentName[];
}

export interface EditorContainerState {
  editingRow: GridRow | null;
}

export const EditorContainer: React.FC<EditorContainerProps> = ({
  controller,
  rows,
  instrumentNames,
}) => {
  const [editingRowIndex, setEditingRowIndex] = useState<number | null>(null);

  const onChangeInstrument = (instrumentName: string) => {
    updateRow(editingRowIndex, {
      instrumentName: instrumentName as ToneInstrumentName,
    });
  };

  const onChangeNote = (note: string) => {
    updateRow(editingRowIndex, { note });
  };

  const onChangeOctave = (octave: string) => {
    updateRow(editingRowIndex, { octave: parseInt(octave) });
  };

  const onShiftRow = (row: GridRow) => {
    const steps = row.steps;
    const lastStep = steps.pop();
    if (lastStep) {
      steps.unshift(lastStep);
    }
    updateRow(row.index, { steps });
  };

  const onShiftSequence = () => {
    rows.map((r) => onShiftRow(r));
  };

  const updateRow = (index: number | null, partial: Partial<GridRow>) => {
    if (index === null) {
      return;
    }
    const updatedRow: GridRow = { ...rows[index], ...partial };
    controller.updateRows(updatedRow);
  };

  const onToggleEditor = (row: GridRow | null) => {
    if (row === null) {
      return setEditingRowIndex(null);
    }
    const { index } = row;
    setEditingRowIndex(editingRowIndex === index ? null : index);
  };

  const getEditingRow = (): GridRow | null =>
    editingRowIndex !== null ? rows[editingRowIndex] : null;

  return (
    <Editor
      controller={{
        onChangeNote,
        onChangeOctave,
        onChangeInstrument,
        onToggleEditor,
        onShiftRow,
        onShiftSequence,
      }}
      instrumentNames={instrumentNames}
      editingRow={getEditingRow()}
      rows={rows}
    />
  );
};
