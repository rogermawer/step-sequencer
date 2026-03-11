import { FunctionComponent } from "react";
import "./InstrumentSelectorStyle.scss";

export interface InstrumentSelectorDelegate {
  onToggleEditor: (rowIndex: number) => void;
}

interface InstrumentSelectorProps {
  delegate: InstrumentSelectorDelegate;
  rowIndex: number;
  isEditing: boolean;
}

export const InstrumentSelector: FunctionComponent<InstrumentSelectorProps> = ({
  delegate,
  rowIndex,
  isEditing,
}) => (
  <div
    className={`selector-button${isEditing ? " active" : ""}`}
    onClick={() => delegate.onToggleEditor(rowIndex)}
  >
    <div className="row-dot" />
  </div>
);
