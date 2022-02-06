import { ControlButton } from "../ControlButtons/ControlButton";
import { Instrument } from "./InstrumentSelectorContainer";
import "./InstrumentSelectorStyle.scss";

interface InstrumentSelectorController {
  onToggleInstrument: (i: Instrument) => void;
  toggleInstrumentSelector: () => void;
}

interface InstrumentSelectorProps {
  controller: InstrumentSelectorController;
  instruments: Instrument[];
  selectedInstrument: Instrument;
  isOpen: boolean;
}

export const InstrumentSelector = ({
  controller,
  instruments,
  selectedInstrument,
  isOpen,
}: InstrumentSelectorProps) => (
  <div className="selector-container">
    <ControlButton
      title={selectedInstrument.nickName}
      onClick={controller.toggleInstrumentSelector}
    />
    <ul className={`instrument-list${isOpen ? " is-open" : ""}`}>
      {instruments.map((instrument, i) => (
        <li key={i}>
          <button
            className=""
            onClick={() => controller.onToggleInstrument(instrument)}
          >
            {instrument.name}
          </button>
        </li>
      ))}
    </ul>
  </div>
);
