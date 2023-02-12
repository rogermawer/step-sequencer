import React, { useEffect, useState } from "react";
import { getDestination, PolySynth, Sampler, Transport } from "tone";
import { Destination } from "tone/build/esm/core/context/Destination";
import {
  Instrument,
  ToneInstrumentName,
} from "../InstrumentSelector/InstrumentSelector";
import { GridRow, Step } from "../Row/Row";
import { Sequencer } from "./Sequencer";
import clap from "../../Common/Samples/clap.wav";
import hat from "../../Common/Samples/hat.wav";
import kick from "../../Common/Samples/kick.wav";

interface ExportedSequence {
  rows: GridRow[];
}

interface SequencerProps {
  isAudioStarted: boolean;
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
  isPlaying: boolean;
  instruments: Instrument[];
}

export interface Envelope {
  attack: number;
  decay: number;
  sustain: number;
  release: number;
}

const initialConfig: SequencerConfig[] = [
  { instrumentName: ToneInstrumentName.TONE, pitch: "G", octave: 1 },
  { instrumentName: ToneInstrumentName.HAT, pitch: "E", octave: 3 },
  { instrumentName: ToneInstrumentName.HAT, pitch: "D", octave: 3 },
  { instrumentName: ToneInstrumentName.CLAP, pitch: "C", octave: 3 },
  { instrumentName: ToneInstrumentName.KICK, pitch: "A", octave: 3 },
];

export const SequencerController: React.FC<SequencerProps> = ({
  isAudioStarted,
}) => {
  const output = getDestination();
  output.volume.value = -12;

  const [rows, setRows] = useState<GridRow[]>([]);
  const [steps, setSteps] = useState<number>(8);
  const [bpm, setBpm] = useState<number>(100);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [instruments, setInstruments] = useState<Instrument[]>([
    {
      name: ToneInstrumentName.CLAP,
      type: new Sampler({
        urls: {
          C3: clap,
        },
      }),
    },
    {
      name: ToneInstrumentName.HAT,
      type: new Sampler({
        urls: {
          C3: hat,
        },
      }),
    },
    {
      name: ToneInstrumentName.KICK,
      type: new Sampler({
        urls: {
          C3: kick,
        },
      }),
    },
    {
      name: ToneInstrumentName.TONE,
      type: new PolySynth(undefined, { oscillator: { type: "square8" } }),
    },
  ]);

  useEffect(() => {
    createRows();
    setSequencerData();
  }, []);

  const setSequencerData = () => {
    Transport.bpm.value = bpm;
    Transport.setLoopPoints(0, "1m");
    Transport.loop = true;
  };

  const startSequencer = () => {
    if (isAudioStarted) {
      Transport.start();
      setIsPlaying(true);
    }
  };

  const pauseSequencer = () => {
    if (isPlaying) {
      Transport.pause();
      setIsPlaying(false);
    }
  };

  const stopSequencer = () => {
    Transport.stop();
    setIsPlaying(false);
  };

  const handleChangeTempo = (bpmString: string) => {
    const bpm = parseInt(bpmString);
    Transport.set({ bpm });
    setBpm(bpm);
  };

  const createRowSteps = (): Step[] => {
    const defaultStep: Step = {
      isActive: false,
      isSplit: false,
    };
    let defaultSteps: Step[] = [];
    [...Array(steps)].map(() => defaultSteps.push(defaultStep));
    return defaultSteps;
  };

  const createRows = () => {
    let newRows: GridRow[] = [];
    initialConfig.map((value, index) => {
      const defaultInstrument: Instrument =
        instruments.find((inst) => inst.name === value.instrumentName) ??
        instruments[0];
      defaultInstrument.type.connect(output);
      return newRows.push({
        index,
        note: value.pitch,
        octave: value.octave,
        instrument: defaultInstrument,
        steps: createRowSteps(),
      });
    });
    setRows(newRows);
  };

  const updateRows = (row: GridRow) => {
    row.instrument.type.connect(output);
    const newRows: GridRow[] = [...rows];
    newRows[row.index] = row;
    setRows(newRows);
  };

  return (
    <Sequencer
      controller={{
        startSequencer,
        pauseSequencer,
        stopSequencer,
        handleChangeTempo,
        updateRows,
      }}
      steps={steps}
      rows={rows}
      bpm={bpm}
      instruments={instruments}
      isPlaying={isPlaying}
      isAudioStarted={isAudioStarted}
    />
  );
};
