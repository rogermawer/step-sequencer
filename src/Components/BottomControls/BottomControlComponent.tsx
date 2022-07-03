import React from "react";
import { Slider } from "../../Common/Slider/Slider";
import { SvgIcon } from "../../Common/SvgIcon";
import "./BottomControlsStyle.scss";

export interface ControlButtonController {
  startSequencer: () => void;
  stopSequencer: () => void;
  handleChangeTempo: (tempo: string) => void;
}

interface BottomControlContainerProps {
  controller: ControlButtonController;
  bpm: number;
}

export const BottomControlsComponent: React.FC<BottomControlContainerProps> = ({
  controller,
  bpm,
}) => (
  <div className="bottom-controls">
    <div>
      <SvgIcon type="play" onClick={controller.startSequencer} />
      <SvgIcon type="stop" onClick={controller.stopSequencer} />
    </div>
    <Slider
      value={bpm}
      range={{ min: 60, max: 190 }}
      onChange={(e) => controller.handleChangeTempo(e.currentTarget.value)}
    />
  </div>
);
