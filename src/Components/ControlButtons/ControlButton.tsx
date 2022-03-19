import "./ControlButtonStyle.scss";

interface ControlButtonProps {
  title: string;
  onClick: () => void;
}

export interface SequencerControlButton {
  type: string;
  onClick: () => void;
}

export const ControlButton = ({ title, onClick }: ControlButtonProps) => (
  <button className="control-button" onClick={() => onClick()}>
    {title}
  </button>
);
