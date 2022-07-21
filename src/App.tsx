import { useState } from "react";
import { start } from "tone";
import { StartAudioOverlay } from "./Components/StartAudioOverlay/StartAudioOverlay";
import { SequencerController } from "./Components/SequencerController/SequencerController";
import "./App.scss";

export const App: React.FC = () => {
  const [isAudioStarted, setIsAudioStarted] = useState<boolean>(false);

  const onStartAudio = () => {
    start();
    setIsAudioStarted(true);
  };

  return (
    <div className="App">
      {!isAudioStarted ? (
        <StartAudioOverlay controller={{ onStartAudio }} />
      ) : null}
      <SequencerController isAudioStarted={isAudioStarted} />
    </div>
  );
};
