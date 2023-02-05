import { ChangeEvent, FunctionComponent } from "react";
import "./SliderStyle.scss";

interface SliderRange {
  min: number;
  max: number;
}

interface SliderProps {
  value?: number;
  range: SliderRange;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const Slider: FunctionComponent<SliderProps> = ({
  range,
  value,
  onChange,
}) => (
  <div className="slider">
    <input
      className="input"
      type="range"
      value={value}
      min={range.min}
      max={range.max}
      onChange={onChange}
    />
    <label className="value-readout">{value}</label>
  </div>
);
