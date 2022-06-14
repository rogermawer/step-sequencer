import { ChangeEvent, FunctionComponent } from "react";
import "./SliderStyle.scss";

interface SliderProps {
  label: string;
  value?: number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const Slider: FunctionComponent<SliderProps> = ({
  label,
  value,
  onChange,
}) => (
  <div className="slider">
    <label>{label}</label>
    <input type="range" value={value} min={0} max={50} onChange={onChange} />
  </div>
);
