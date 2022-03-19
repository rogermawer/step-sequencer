import React from "react";
import { SvgIcon } from "../../Common/SvgIcon";
import { SequencerControlButton } from "../../Components/ControlButtons/ControlButton";
import "./BottomControlsStyle.scss";

export interface ControlButtonController {
  startSequencer: () => void;
  stopSequencer: () => void;
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
          <div onClick={button.onClick}>
            <SvgIcon type={button.type} />
          </div>
        ))}
      </div>
    );
  }
}
