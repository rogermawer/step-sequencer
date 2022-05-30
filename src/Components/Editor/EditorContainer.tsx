import React from "react";
import { MembraneSynth, MetalSynth, PolySynth, Sampler } from "tone";
import { GridRow } from "../Row/Row";
import { Editor } from "./Editor";
import clap from "../../Common/Samples/clap.mp3";
import {
  Instrument,
  InstrumentSelector,
} from "../InstrumentSelector/InstrumentSelector";

interface EditorContainerController {
  updateRows: (row: GridRow) => void;
}

interface EditorContainerProps {
  controller: EditorContainerController;
  rows: GridRow[];
}

export interface EditorContainerState {
  editingRowIndex: number | null;
}

const instruments: Instrument[] = [
  { name: "Basic Synth", type: new PolySynth() },
  { name: "Membrane Synth", type: new MembraneSynth() },
  { name: "Metal Synth", type: new MetalSynth() },
  {
    name: "Clap",
    type: new Sampler({
      urls: {
        A3: clap,
      },
    }),
  },
];

export class EditorContainer extends React.Component<
  EditorContainerProps,
  EditorContainerState
> {
  constructor(props: EditorContainerProps) {
    super(props);
    this.state = {
      editingRowIndex: null,
    };
  }

  public onChangeInstrument = (instrument: string) => {
    const { editingRowIndex } = this.state;
    const { rows, controller } = this.props;

    if (editingRowIndex === null) {
      return;
    }

    const selectedInstrument: Instrument = instruments.filter(
      (inst) => inst.name === instrument
    )[0];
    const selectedRow = rows[editingRowIndex];

    const updatedRow: GridRow = {
      ...selectedRow,
      instrument: selectedInstrument,
      steps: selectedRow.steps.map(
        (step) =>
          (step = {
            ...step,
            synth: selectedInstrument.type.toDestination(),
          })
      ),
    };
    controller.updateRows(updatedRow);
  };

  public toggleInstrumentSelector = (rowIndex: number) => {
    this.setState({
      editingRowIndex:
        this.state.editingRowIndex === rowIndex ? null : rowIndex,
    });
  };

  render() {
    const { editingRowIndex } = this.state;
    const { rows } = this.props;
    return (
      <>
        {editingRowIndex !== null ? (
          <Editor
            controller={this}
            instruments={instruments}
            editingRow={rows[editingRowIndex]}
          />
        ) : null}
        <div className="selector-container">
          {rows.map((row) => (
            <InstrumentSelector controller={this} row={row} />
          ))}
        </div>
      </>
    );
  }
}
