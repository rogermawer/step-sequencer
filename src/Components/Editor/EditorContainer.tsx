import React from "react";
import { GridRow } from "../Row/Row";
import { Editor } from "./Editor";
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
  instruments: Instrument[];
}

export interface EditorContainerState {
  editingRow: GridRow | null;
}

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

  private getInstrument = (instrumentName: string): Instrument | undefined =>
    this.props.instruments.find((inst) => inst.name === instrumentName);

  public onChangeInstrument = (instrumentName: string) => {
    const { editingRow } = this.state;
    const { controller } = this.props;

    if (editingRow === null) {
      return;
    }

    const newInstrument: Instrument =
      this.getInstrument(instrumentName) ?? this.props.instruments[0];

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
            instruments={this.props.instruments}
            editingRow={editingRow}
          />
        ) : null}
        <div className="selector-container">
          {rows.map((row, i) => (
            <InstrumentSelector
              key={i}
              controller={this}
              row={row}
              isEditing={row.index === this.state.editingRow?.index}
            />
          ))}
        </div>
      </>
    );
  }
}
