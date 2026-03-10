import "../StartAudioOverlay/StartAudioOverlayStyle.scss";

interface StartAudioOverlayDelegate {
  onStartAudio: () => void;
}

interface StartAudioOverlayProps {
  delegate: StartAudioOverlayDelegate;
}

export const StartAudioOverlay: React.FC<StartAudioOverlayProps> = ({
  delegate,
}) => (
  <div className="start-audio-overlay">
    <div className="start-button-container">
      <button onClick={delegate.onStartAudio}>START AUDIO ENGINE</button>
    </div>
  </div>
);
