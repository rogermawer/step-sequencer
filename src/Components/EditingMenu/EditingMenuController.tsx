import React from "react";
import { GridRow } from "../../Sections/Grid/Grid";
import { Instrument } from "../InstrumentSelector/InstrumentSelector";
import { EditingMenu, EditingMenuControllerState } from "./EditingMenu";

interface EditingMenuControllerMethods {
  updateRows: (row: GridRow) => void;
}

interface EditingMenuControllerProps {
  controller: EditingMenuControllerMethods;
  editingRow: GridRow;
}

export class EditingMenuController extends React.Component<
  EditingMenuControllerProps,
  EditingMenuControllerState
> {
  constructor(props: EditingMenuControllerProps) {
    super(props);
    this.state = {};
  }

  public onChangeInstrument = (rowIndex: number, instrument: Instrument) => {
    const selectedRow = this.props.editingRow;

    const updatedRow: GridRow = {
      ...selectedRow,
      steps: selectedRow.steps.map(
        (step) =>
          (step = {
            ...step,
            synth: instrument.type.toDestination(),
          })
      ),
    };
    this.props.controller.updateRows(updatedRow);
  };

  render() {
    return <EditingMenu controller={this} editingRow={this.props.editingRow} />;
  }
}
