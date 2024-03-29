import "../StartAudioOverlay/StartAudioOverlayStyle.scss";

interface StartAudioOverlayController {
  onStartAudio: () => void;
}

interface StartAudioOverlayProps {
  controller: StartAudioOverlayController;
}

export const StartAudioOverlay: React.FC<StartAudioOverlayProps> = ({
  controller,
}) => (
  <div className="start-audio-overlay">
    <div className="start-button-container">
      <button onClick={controller.onStartAudio}>START AUDIO ENGINE</button>
    </div>
  </div>
);
