import React from "react";
import {
  ControlButton,
  SequencerControlButton,
} from "../../Components/ControlButtons/ControlButton";
import "./BottomControlsStyle.scss";

export interface ControlButtonController {
  toggleSequencer: () => void;
}

interface BottomControlContainerProps {
  controller: ControlButtonController;
}

interface BottomControlContainerState {
  controlButtons: SequencerControlButton[];
}

export class BottomControlContainer extends React.Component<
  BottomControlContainerProps,
  BottomControlContainerState
> {
  constructor(props: BottomControlContainerProps) {
    super(props);
    this.state = {
      controlButtons: [
        {
          title: "start/stop sequencer",
          onClick: this.props.controller.toggleSequencer,
        },
      ],
    };
  }

  render() {
    return (
      <div className="bottom-controls">
        {this.state.controlButtons.map((button, i) => (
          <ControlButton
            key={i}
            title={button.title}
            onClick={button.onClick}
          />
        ))}
      </div>
    );
  }
}
