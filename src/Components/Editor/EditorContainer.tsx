import { useRef, useState } from "react";
import { GridRow } from "../Row/Row";
import { Editor } from "./Editor";
import { Instrument } from "../InstrumentSelector/InstrumentSelector";
import { useClickOutside } from "../../Hooks/useClickOutside";

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
  const [editingRow, setEditingRow] = useState<GridRow | null>(null);

  const getInstrument = (instrumentName: string): Instrument | undefined =>
    instruments.find((inst) => inst.name === instrumentName);

  const onChangeInstrument = (instrumentName: string) => {
    if (editingRow === null) {
      return;
    }

    const instrument: Instrument =
      getInstrument(instrumentName) ?? instruments[0];

    updateRow({ instrument });
  };

  const onChangeNote = (note: string) => {
    updateRow({ note });
  };

  const onChangeOctave = (octave: string) => {
    updateRow({ octave: parseInt(octave) });
  };

  const onShiftRow = (row: GridRow) => {
    const steps = row.steps;
    const lastStep = steps.pop();
    if (lastStep) {
      steps.unshift(lastStep);
    }
    updateRow({ steps });
  };

  const onShiftSequence = () => {
    if (editingRow === null) {
      return;
    }
    rows.map((r) => onShiftRow(r));
  };

  const updateRow = (partial: Partial<GridRow>) => {
    if (editingRow === null) {
      return;
    }
    const updatedRow: GridRow = { ...editingRow, ...partial };
    setEditingRow(updatedRow);
    controller.updateRows(updatedRow);
  };

  const onToggleEditor = (row: GridRow | null) => {
    setEditingRow(row === null || editingRow?.index === row.index ? null : row);
  };

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
      editingRow={editingRow}
      rows={rows}
    />
  );
};
