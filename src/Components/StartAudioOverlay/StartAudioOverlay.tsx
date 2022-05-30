import { FunctionComponent } from "react";
import "../StartAudioOverlay/StartAudioOverlayStyle.scss";

interface StartAudioOverlayController {
  onStartAudio: () => void;
}

interface StartAudioOverlayProps {
  controller: StartAudioOverlayController;
}

export const StartAudioOverlay: FunctionComponent<StartAudioOverlayProps> = ({
  controller,
}) => (
  <div className="start-audio-overlay">
    <div className="start-button-container">
      <button onClick={controller.onStartAudio}>START AUDIO ENGINE</button>
    </div>
  </div>
);
