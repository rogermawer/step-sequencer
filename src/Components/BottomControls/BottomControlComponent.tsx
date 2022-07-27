import React from "react";
import { Slider } from "../../Common/Slider/Slider";
import { SvgIcon } from "../../Common/SvgIcon";
import { GridController } from "../Grid/Grid";
import "./BottomControlsStyle.scss";

interface BottomControlContainerProps {
  controller: GridController;
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
    <div className="hints">
      Hint: right click on a square to split it in half
    </div>
  </div>
);
