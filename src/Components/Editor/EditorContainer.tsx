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
  editingRow: GridRow | null;
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
      editingRow: null,
    };
  }

  private getInstrument = (instrumentName: string): Instrument => {
    const index = instruments.findIndex((inst) => inst.name === instrumentName);
    return instruments[index];
  };

  public onChangeInstrument = (instrumentName: string) => {
    const { editingRow } = this.state;
    const { controller } = this.props;

    if (editingRow === null) {
      return;
    }

    const newInstrument: Instrument = this.getInstrument(instrumentName);

    const updatedRow: GridRow = {
      ...editingRow,
      instrument: newInstrument,
    };
    this.setState({ editingRow: updatedRow });
    controller.updateRows(updatedRow);
  };

  public setEnvelopeForRow = (value: string) => {
    const { editingRow } = this.state;
    if (editingRow === null) {
      return;
    }

    editingRow.instrument.type.set({
      envelope: { release: parseInt(value) / 10 },
    });
    this.setState({ editingRow });
    this.props.controller.updateRows(editingRow);
  };

  public toggleInstrumentSelector = (row: GridRow) => {
    this.setState({
      editingRow: this.state.editingRow?.index === row.index ? null : row,
    });
  };

  render() {
    const { editingRow } = this.state;
    const { rows } = this.props;
    return (
      <>
        {editingRow !== null ? (
          <Editor
            controller={this}
            instruments={instruments}
            editingRow={editingRow}
          />
        ) : null}
        <div className="selector-container">
          {rows.map((row, i) => (
            <InstrumentSelector key={i} controller={this} row={row} />
          ))}
        </div>
      </>
    );
  }
}
