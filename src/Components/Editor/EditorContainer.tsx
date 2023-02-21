import { useState } from "react";
import { GridRow } from "../Row/Row";
import { Editor } from "./Editor";
import { Instrument } from "../InstrumentSelector/InstrumentSelector";

interface EditorContainerController {
  updateRows: (row: GridRow) => void;
}

interface EditorContainerProps {
  controller: EditorContainerController;
  rows: GridRow[];
  instruments: Instrument[];
}

export interface EditorContainerState {
  editingRow: GridRow | null;
}

export const EditorContainer: React.FC<EditorContainerProps> = ({
  controller,
  rows,
  instruments,
}) => {
  const [editingRowIndex, setEditingRowIndex] = useState<number | null>(null);

  const getInstrument = (instrumentName: string): Instrument | undefined =>
    instruments.find((inst) => inst.name === instrumentName);

  const onChangeInstrument = (instrumentName: string) => {
    const instrument: Instrument =
      getInstrument(instrumentName) ?? instruments[0];

    updateRow(editingRowIndex, { instrument });
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
      instruments={instruments}
      editingRow={getEditingRow()}
      rows={rows}
    />
  );
};
