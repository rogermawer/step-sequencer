import "../ControlButtons/ControlButtonStyle.scss";

interface ControlButtonProps {
  title: string;
  onClick: () => void;
}

export interface SequencerControlButton {
  title: string;
  onClick: () => void;
}

export const ControlButton = ({ title, onClick }: ControlButtonProps) => (
  <button className="control-button" onClick={() => onClick()}>
    {title}
  </button>
);
