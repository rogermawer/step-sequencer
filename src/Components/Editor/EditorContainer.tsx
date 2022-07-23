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
  const [editingRow, setEditingRow] = useState<GridRow | null>(null);

  const getInstrument = (instrumentName: string): Instrument | undefined =>
    instruments.find((inst) => inst.name === instrumentName);

  const onChangeInstrument = (instrumentName: string) => {
    if (editingRow === null) {
      return;
    }

    const newInstrument: Instrument =
      getInstrument(instrumentName) ?? instruments[0];

    const updatedRow: GridRow = {
      ...editingRow,
      instrument: newInstrument,
    };
    setEditingRow(updatedRow);
    controller.updateRows(updatedRow);
  };

  const onChangeNote = (note: string) => {
    if (editingRow === null) {
      return;
    }

    const updatedRow: GridRow = {
      ...editingRow,
      note,
    };
    setEditingRow(updatedRow);
    controller.updateRows(updatedRow);
  };

  const onChangeOctave = (octave: string) => {
    if (editingRow === null) {
      return;
    }

    const updatedRow: GridRow = {
      ...editingRow,
      octave: parseInt(octave),
    };
    setEditingRow(updatedRow);
    controller.updateRows(updatedRow);
  };

  const onOpenEditor = (row: GridRow) => {
    setEditingRow(editingRow?.index === row.index ? null : row);
  };

  return (
    <Editor
      controller={{
        onChangeNote,
        onChangeOctave,
        onChangeInstrument,
        onOpenEditor,
      }}
      instruments={instruments}
      editingRow={editingRow}
      rows={rows}
    />
  );
};
