import React from "react";
import { Slider } from "../../Common/Slider/Slider";
import { SvgIcon } from "../../Common/SvgIcon";
import "./BottomControlsStyle.scss";

interface BottomControlsController {
  startSequencer: () => void;
  stopSequencer: () => void;
  handleChangeTempo: (bpn: string) => void;
}

const hints = ["Right click on a square to split it in half"];

interface BottomControlsComponentProps {
  controller: BottomControlsController;
  bpm: number;
}

export const BottomControlsComponent: React.FC<
  BottomControlsComponentProps
> = ({ controller, bpm }) => (
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
      <h3>Hints:</h3>
      <ul>
        {hints.map((hint) => (
          <li>{hint}</li>
        ))}
      </ul>
    </div>
  </div>
);
