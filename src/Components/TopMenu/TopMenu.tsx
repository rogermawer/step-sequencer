import { Slider } from "../../Common/Slider/Slider";
import { SvgIcon } from "../../Common/SvgIcon";
import "../TopMenu/TopMenuStyle.scss";

interface TopMenuDelegate {
  startSequencer: () => void;
  pauseSequencer: () => void;
  stopSequencer: () => void;
  handleChangeTempo: (bpn: string) => void;
  handleChangeLoopLength: (n: number) => void;
}

interface TopMenuProps {
  delegate: TopMenuDelegate;
  bpm: number;
  isPlaying: boolean;
  loopLength: number;
}

export const TopMenu: React.FC<TopMenuProps> = ({
  delegate,
  bpm,
  isPlaying,
  loopLength,
}) => (
  <div className="top-menu">
    <div className="controls">
      {isPlaying ? (
        <SvgIcon type="pause" onClick={delegate.pauseSequencer} />
      ) : (
        <SvgIcon type="play" onClick={delegate.startSequencer} />
      )}
      <SvgIcon type="stop" onClick={delegate.stopSequencer} />
    </div>
    <div className="slider-container">
      <Slider
        value={bpm}
        range={{ min: 60, max: 190 }}
        onChange={(e) => delegate.handleChangeTempo(e.currentTarget.value)}
      />
    </div>
    <div className="loop-length-toggle">
      {[8, 16].map((n) => (
        <button
          key={n}
          className={`loop-btn${loopLength === n ? " active" : ""}`}
          onClick={() => delegate.handleChangeLoopLength(n)}
        >
          {n}
        </button>
      ))}
    </div>
  </div>
);
