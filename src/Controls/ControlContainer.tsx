import React from "react";
import {
  ControlButton,
  SequencerControlButton,
} from "./ControlButtons/ControlButton";

export interface ControlButtonController {
  startAudio: () => void;
  toggleSequencer: () => void;
}

interface ControlContainerProps {
  controller: ControlButtonController;
}

interface ControlContainerState {
  controlButtons: SequencerControlButton[];
}

export class ControlContainer extends React.Component<
  ControlContainerProps,
  ControlContainerState
> {
  constructor(props: ControlContainerProps) {
    super(props);
    this.state = {
      controlButtons: [
        { title: "start audio", onClick: this.props.controller.startAudio },
        {
          title: "start/stop sequencer",
          onClick: this.props.controller.toggleSequencer,
        },
      ],
    };
  }

  render() {
    return (
      <div>
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
