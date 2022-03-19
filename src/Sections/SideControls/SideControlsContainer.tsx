import React from "react";
import { GridRow } from "../Grid/Grid";
import { SequencerController } from "../../SequencerController/Sequencer";
import {
  Instrument,
  InstrumentSelectorContainer,
} from "../../Components/InstrumentSelector/InstrumentSelectorContainer";
import "./SideControlsStyle.scss";

interface SideControlsProps {
  controller: SequencerController;
  rows: GridRow[];
}

interface SideControlsState {}

export class SideControlsContainer extends React.Component<
  SideControlsProps,
  SideControlsState
> {
  constructor(props: SideControlsProps) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  public onChangeInstrument = (rowIndex: number, instrument: Instrument) => {
    const selectedRow = this.props.rows[rowIndex];

    const updatedRow = {
      ...selectedRow,
      steps: selectedRow.steps.map(
        (step) =>
          (step = {
            ...step,
            synth: instrument.type.toDestination(),
          })
      ),
    };
    this.props.controller.updateRows(rowIndex, updatedRow);
  };

  render() {
    return (
      <div className="side-controls">
        {this.props.rows.map((row, i) => (
          <InstrumentSelectorContainer key={i} controller={this} rowIndex={i} />
        ))}
      </div>
    );
  }
}
