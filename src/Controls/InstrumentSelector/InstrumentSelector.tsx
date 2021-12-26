import { ControlButton } from "../ControlButtons/ControlButton";
import { Instrument, ToneInstrument } from "./InstrumentSelectorContainer";
import "../InstrumentSelector/InstrumentSelectorStyle.scss";

interface InstrumentSelectorController {
  onToggleInstrument: (i: ToneInstrument) => void;
  toggleInstrumentSelector: () => void;
}

interface InstrumentSelectorProps {
  controller: InstrumentSelectorController;
  instruments: Instrument[];
  isOpen: boolean;
}

export const InstrumentSelector = ({
  controller,
  instruments,
  isOpen,
}: InstrumentSelectorProps) => (
  <div className="selector-container">
    <ControlButton
      title={"inst"}
      onClick={controller.toggleInstrumentSelector}
    />
    <ul className={`instrument-list${isOpen ? " is-open" : ""}`}>
      {instruments.map((instrument, i) => (
        <li
          key={i}
          onClick={() => controller.onToggleInstrument(instrument.instrument)}
        >
          <button className="">{instrument.name}</button>
        </li>
      ))}
    </ul>
  </div>
);
