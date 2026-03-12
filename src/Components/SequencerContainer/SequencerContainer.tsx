import React, { useEffect, useState } from "react";
import { Sequencer } from "./Sequencer";
import { AudioEngine, ToneInstrumentName } from "../../audio/AudioEngine";
import { GridRow, GridRows, Step } from "../StepEditor/StepEditor";

interface SequencerProps {
  isAudioStarted: boolean;
  engine: AudioEngine;
}

export interface Envelope {
  attack: number;
  decay: number;
  sustain: number;
  release: number;
}

export enum Direction {
  LEFT,
  RIGHT,
}

const STEPS = 8;
const createRowSteps = (): Step[] =>
  Array.from({ length: STEPS }, () => ({ isActive: false, isSplit: false }));

const rowConfig: GridRows = {
  0: {
    instrumentName: ToneInstrumentName.BELL,
    note: "C",
    octave: 3,
    steps: createRowSteps(),
  },
  1: {
    instrumentName: ToneInstrumentName.HAT,
    note: "F",
    octave: 3,
    steps: createRowSteps(),
  },
  2: {
    instrumentName: ToneInstrumentName.HAT,
    note: "D",
    octave: 3,
    steps: createRowSteps(),
  },
  3: {
    instrumentName: ToneInstrumentName.CLAP,
    note: "C",
    octave: 3,
    steps: createRowSteps(),
  },
  4: {
    instrumentName: ToneInstrumentName.KICK,
    note: "A",
    octave: 3,
    steps: createRowSteps(),
  },
};

export const SequencerContainer: React.FC<SequencerProps> = ({
  isAudioStarted,
  engine,
}) => {
  const [rows, setRows] = useState<GridRows>(rowConfig);
  const [bpm, setBpm] = useState<number>(100);
  const [beat, setBeat] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [editingIndex, setEditingIndex] = useState<number>(-1);

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

  const updateRows = (rowIndex: number, row: GridRow) => {
    const newRows = { ...rows, [rowIndex]: row };
    engine.setRows(newRows);
    setRows(newRows);
  };

  const updateSteps = (rowIndex: number, steps: Step[]) => {
    const currRow = rows[rowIndex];
    updateRows(rowIndex, { ...currRow, steps });
  };

  const onShiftSequence = (dir: Direction) => {
    const newRows: GridRows = {};
    Object.entries(rows).forEach(([i, r]) => {
      const steps = [...r.steps];
      if (dir === Direction.RIGHT) {
        const lastStep = steps.pop();
        if (lastStep) steps.unshift(lastStep);
      }
      if (dir === Direction.LEFT) {
        const firstStep = steps.shift();
        if (firstStep) steps.push(firstStep);
      }
      newRows[Number(i)] = { ...r, steps };
    });
    engine.setRows(newRows);
    setRows(newRows);
  };

  const onToggleEditor = (rowIndex: number) => {
    setEditingIndex(rowIndex);
  };

  return (
    <Sequencer
      delegate={{
        startSequencer,
        pauseSequencer,
        stopSequencer,
        handleChangeTempo,
        updateRows,
        updateSteps,
        onShiftSequence,
        onToggleEditor,
      }}
      steps={STEPS}
      rows={rows}
      bpm={bpm}
      beat={beat}
      isPlaying={isPlaying}
      instrumentNames={Object.values(ToneInstrumentName)}
      editingIndex={editingIndex}
    />
  );
};
