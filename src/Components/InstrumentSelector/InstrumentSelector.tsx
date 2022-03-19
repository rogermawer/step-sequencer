import { SvgIcon } from "../../Common/SvgIcon";
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
    <div onClick={controller.toggleInstrumentSelector}>
      <SvgIcon type="piano" />
    </div>
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
