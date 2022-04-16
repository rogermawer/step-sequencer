import React from "react";
import { MembraneSynth, MetalSynth, Sampler, Synth } from "tone";
import { GridRow } from "../Row/Row";
import { EditingMenu, EditingMenuControllerState } from "./EditingMenu";
import clap from "../../Common/Samples/clap.mp3";
import { Instrument } from "../InstrumentSelector/InstrumentSelector";

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
    this.state = {
      instruments: [
        { name: "Basic Synth", nickName: "syn", type: new Synth() },
        { name: "Membrane Synth", nickName: "memb", type: new MembraneSynth() },
        { name: "Metal Synth", nickName: "mtlSyn", type: new MetalSynth() },
        {
          name: "Clap",
          nickName: "clp",
          type: new Sampler({
            urls: {
              A3: clap,
            },
          }),
        },
      ],
      selectedInstrument: {
        name: "Membrane Synth",
        nickName: "memb",
        type: new MembraneSynth(),
      },
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
      steps: selectedRow.steps.map(
        (step) =>
          (step = {
            ...step,
            synth: selectedInstrument.type.toDestination(),
          })
      ),
    };
    this.props.controller.updateRows(updatedRow);
    this.setState({ selectedInstrument });
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
