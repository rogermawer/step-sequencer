import { Slider } from "../../Common/Slider/Slider";
import { SvgIcon } from "../../Common/SvgIcon";
import "../TopMenu/TopMenuStyle.scss";

interface TopMenuController {
  startSequencer: () => void;
  stopSequencer: () => void;
  handleChangeTempo: (bpn: string) => void;
}

interface TopMenuProps {
  controller: TopMenuController;
  bpm: number;
}

export const TopMenu: React.FC<TopMenuProps> = ({ controller, bpm }) => (
  <div className="top-menu">
    <div className="controls">
      <SvgIcon type="play" onClick={controller.startSequencer} />
      <SvgIcon type="stop" onClick={controller.stopSequencer} />
    </div>
    <div className="slider-container">
      <Slider
        value={bpm}
        range={{ min: 60, max: 190 }}
        onChange={(e) => controller.handleChangeTempo(e.currentTarget.value)}
      />
    </div>
  </div>
);
