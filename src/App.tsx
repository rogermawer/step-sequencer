import { useEffect, useRef, useState } from "react";
import { StartAudioOverlay } from "./Components/StartAudioOverlay/StartAudioOverlay";
import { SequencerController } from "./Components/SequencerController/SequencerController";
import "./App.scss";
import { AudioEngine } from "./audio/AudioEngine";

export const App: React.FC = () => {
  const [isAudioStarted, setIsAudioStarted] = useState<boolean>(false);
  const audioEngineRef = useRef<AudioEngine | null>(null);

  useEffect(() => {
    const engine = new AudioEngine();
    audioEngineRef.current = engine;
  }, []);

  const onStartAudio = async () => {
    const engine = audioEngineRef.current;
    if (engine) {
      await engine.startAudio();
      setIsAudioStarted(true);
    }
  };

  return (
    <div className="App">
      {!isAudioStarted ? (
        <StartAudioOverlay controller={{ onStartAudio }} />
      ) : audioEngineRef.current ? (
        <SequencerController
          isAudioStarted={isAudioStarted}
          engine={audioEngineRef.current}
        />
      ) : null}
    </div>
  );
};
