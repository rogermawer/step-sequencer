import { ChangeEvent, FunctionComponent } from "react";
import "./SliderStyle.scss";

interface SliderRange {
  min: number;
  max: number;
}

interface SliderProps {
  label?: string;
  value?: number;
  range: SliderRange;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const Slider: FunctionComponent<SliderProps> = ({
  label,
  range,
  value,
  onChange,
}) => (
  <div className="slider">
    <label>{label}</label>
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
