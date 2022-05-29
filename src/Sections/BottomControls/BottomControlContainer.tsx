import React from "react";
import { SvgIcon } from "../../Common/SvgIcon";
import "./BottomControlsStyle.scss";

export interface ControlButtonController {
  startSequencer: () => void;
  stopSequencer: () => void;
}

interface BottomControlContainerProps {
  controller: ControlButtonController;
}

interface SequencerControlButton {
  type: string;
  onClick: () => void;
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
          type: "play",
          onClick: this.props.controller.startSequencer,
        },
        { type: "stop", onClick: this.props.controller.stopSequencer },
      ],
    };
  }

  render() {
    return (
      <div className="bottom-controls">
        {this.state.controlButtons.map((button, i) => (
          <SvgIcon key={i} type={button.type} onClick={button.onClick} />
        ))}
      </div>
    );
  }
}
