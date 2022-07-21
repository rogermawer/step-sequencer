import { Selector } from "../../Common/Selector/Selector";
import { Instrument } from "../InstrumentSelector/InstrumentSelector";
import { GridRow } from "../Row/Row";
import "./EditorStyle.scss";

export interface EditorController {
  onChangeInstrument: (instrument: string) => void;
  onChangeNote: (note: string) => void;
  onChangeOctave: (octave: string) => void;
}

interface EditorProps {
  controller: EditorController;
  editingRow: GridRow;
  instruments: Instrument[];
}

const possibleNotes = ["C", "D", "E", "F", "G", "A", "B"];
const possibleOctaves = [1, 2, 3, 4, 5];

export const Editor: React.FC<EditorProps> = ({
  controller,
  editingRow,
  instruments,
}) => (
  <div className={`editing-menu${editingRow !== null ? " is-open" : ""}`}>
    <Selector
      label="Row Note"
      value={editingRow.note}
      items={possibleNotes.map((note) => ({ name: note }))}
      onChange={controller.onChangeNote}
    />

    <Selector
      label="Octave"
      value={editingRow.octave}
      items={possibleOctaves.map((octave) => ({ name: octave }))}
      onChange={controller.onChangeOctave}
    />

    <Selector
      label="Current Instrument"
      value={editingRow.instrument.name}
      items={instruments.map((inst) => ({ name: inst.name }))}
      onChange={controller.onChangeInstrument}
    />
  </div>
);
