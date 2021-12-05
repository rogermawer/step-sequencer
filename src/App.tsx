import React from "react";
import "./App.css";
import { SequencerController } from "./SequencerController/SequencerController";

interface AppProps {}

interface AppState {}

export class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="App">
        <SequencerController />
      </div>
    );
  }
}
