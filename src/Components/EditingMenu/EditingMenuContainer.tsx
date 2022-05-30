import React from "react";
import { MembraneSynth, MetalSynth, PolySynth, Sampler } from "tone";
import { GridRow } from "../Row/Row";
import { EditingMenu } from "./EditingMenu";
import clap from "../../Common/Samples/clap.mp3";
import { Instrument } from "../InstrumentSelector/InstrumentSelector";

interface EditingMenuContainerController {
  updateRows: (row: GridRow) => void;
}

interface EditingMenuContainerProps {
  controller: EditingMenuContainerController;
  editingRow: GridRow;
}

export interface EditingMenuContainerState {
  instruments: Instrument[];
  editingRowIndex: number | null;
}

export class EditingMenuContainer extends React.Component<
  EditingMenuContainerProps,
  EditingMenuContainerState
> {
  constructor(props: EditingMenuContainerProps) {
    super(props);
    this.state = {
      instruments: [
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
      ],
      editingRowIndex: null,
    };
  }

  public onChangeInstrument = (instrument: string) => {
    const { instruments } = this.state;
    const selectedInstrument: Instrument = instruments.filter(
      (inst) => inst.name === instrument
    )[0];
    const selectedRow = this.props.editingRow;

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
    this.props.controller.updateRows(updatedRow);
  };

  public toggleInstrumentSelector = (rowIndex: number) => {
    this.setState({
      editingRowIndex:
        this.state.editingRowIndex === rowIndex ? null : rowIndex,
    });
  };

  render() {
    return (
      <EditingMenu
        controller={this}
        {...this.state}
        editingRow={this.props.editingRow}
      />
    );
  }
}
