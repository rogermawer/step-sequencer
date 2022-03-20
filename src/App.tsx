import React from "react";
import "./App.scss";
import { SequencerController } from "./SequencerController/SequencerController";
import { start } from "tone";
import { StartAudioOverlay } from "./Components/StartAudioOverlay/StartAudioOverlay";

interface AppProps {}

interface AppState {
  isAudioStarted: boolean;
}

export class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {
      isAudioStarted: false,
    };
  }

  public onStartAudio = () => {
    start();
    this.setState({ isAudioStarted: true });
  };

  render() {
    return (
      <div className="App">
        {!this.state.isAudioStarted ? (
          <StartAudioOverlay controller={this} />
        ) : null}
        <SequencerController {...this.state} />
      </div>
    );
  }
}
