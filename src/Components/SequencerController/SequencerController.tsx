import React, { useEffect, useRef, useState } from "react";
import { ToneInstrumentName } from "../InstrumentSelector/InstrumentSelector";
import { GridRow, Step } from "../Row/Row";
import { Sequencer } from "./Sequencer";
import { AudioEngine } from "../../audio/AudioEngine";

interface SequencerProps {
  isAudioStarted: boolean;
  engine: AudioEngine;
}

interface SequencerConfig {
  instrumentName: ToneInstrumentName;
  pitch: string;
  octave: number;
}

export interface SequencerState {
  steps: number;
  rows: GridRow[];
  bpm: number;
  beat: number;
  isPlaying: boolean;
  instrumentNames: ToneInstrumentName[];
}

export interface Envelope {
  attack: number;
  decay: number;
  sustain: number;
  release: number;
}

const initialConfig: SequencerConfig[] = [
  { instrumentName: ToneInstrumentName.BELL, pitch: "C", octave: 3 },
  { instrumentName: ToneInstrumentName.HAT, pitch: "F", octave: 3 },
  { instrumentName: ToneInstrumentName.HAT, pitch: "D", octave: 3 },
  { instrumentName: ToneInstrumentName.CLAP, pitch: "C", octave: 3 },
  { instrumentName: ToneInstrumentName.KICK, pitch: "A", octave: 3 },
];

const createRowSteps = (count: number): Step[] =>
  Array.from({ length: count }, () => ({ isActive: false, isSplit: false }));

const buildInitialRows = (steps: number): GridRow[] =>
  initialConfig.map((config, index) => ({
    index,
    note: config.pitch,
    octave: config.octave,
    instrumentName: config.instrumentName,
    steps: createRowSteps(steps),
  }));

export const SequencerController: React.FC<SequencerProps> = ({
  isAudioStarted,
  engine,
}) => {
  const STEPS = 8;
  const [rows, setRows] = useState<GridRow[]>(buildInitialRows(STEPS));
  const [bpm, setBpm] = useState<number>(100);
  const [beat, setBeat] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  useEffect(() => {
    engine.setOnStep(setBeat);
    engine.setRows(rows);
    engine.setTempo(bpm);
  }, []);

  const startSequencer = () => {
    if (isAudioStarted) {
      engine.startSequencer();
      setIsPlaying(true);
    }
  };

  const pauseSequencer = () => {
    if (isPlaying) {
      engine.pauseSequencer();
      setIsPlaying(false);
    }
  };

  const stopSequencer = () => {
    engine.stopSequencer();
    setIsPlaying(false);
  };

  const handleChangeTempo = (bpmString: string) => {
    const newBpm = parseInt(bpmString);
    engine.setTempo(newBpm);
    setBpm(newBpm);
  };

  const updateRows = (row: GridRow) => {
    const newRows: GridRow[] = [...rows];
    newRows[row.index] = row;
    engine.setRows(newRows);
    setRows(newRows);
  };

  return (
    <Sequencer
      delegate={{
        startSequencer,
        pauseSequencer,
        stopSequencer,
        handleChangeTempo,
        updateRows,
      }}
      steps={STEPS}
      rows={rows}
      bpm={bpm}
      beat={beat}
      isPlaying={isPlaying}
      instrumentNames={Object.values(ToneInstrumentName)}
    />
  );
};
