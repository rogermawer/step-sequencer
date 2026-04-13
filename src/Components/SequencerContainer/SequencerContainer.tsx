import React, { useEffect, useState } from "react";
import { Sequencer } from "./Sequencer";
import {
  AudioEngine,
  DEFAULT_LOOP_LENGTH,
  ToneInstrumentName,
} from "../../audio/AudioEngine";
import { DEFAULT_FX, GridRow, GridRows, Step, Subdivision } from "../StepEditor/StepEditor";
import { generateGenrePattern } from "../../Clients/AnthropicClient";

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

const createRowSteps = (length = DEFAULT_LOOP_LENGTH): Step[] =>
  Array.from({ length }, () => ({ isActive: false, subdivision: Subdivision.None }));

const rowConfig: GridRows = {
  0: {
    instrumentName: ToneInstrumentName.BELL,
    note: "C",
    octave: 3,
    steps: createRowSteps(),
    fx: DEFAULT_FX,
  },
  1: {
    instrumentName: ToneInstrumentName.HAT,
    note: "F",
    octave: 3,
    steps: createRowSteps(),
    fx: DEFAULT_FX,
  },
  2: {
    instrumentName: ToneInstrumentName.HAT,
    note: "D",
    octave: 3,
    steps: createRowSteps(),
    fx: DEFAULT_FX,
  },
  3: {
    instrumentName: ToneInstrumentName.CLAP,
    note: "C",
    octave: 3,
    steps: createRowSteps(),
    fx: DEFAULT_FX,
  },
  4: {
    instrumentName: ToneInstrumentName.KICK,
    note: "A",
    octave: 3,
    steps: createRowSteps(),
    fx: DEFAULT_FX,
  },
};

export const SequencerContainer: React.FC<SequencerProps> = ({
  isAudioStarted,
  engine,
}) => {
  const [rows, setRows] = useState<GridRows>(rowConfig);
  const [loopLength, setLoopLength] = useState<number>(DEFAULT_LOOP_LENGTH);
  const [bpm, setBpm] = useState<number>(100);
  const [beat, setBeat] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [editingIndex, setEditingIndex] = useState<number>(-1);
  const [loadingGenre, setLoadingGenre] = useState<string | null>(null);
  const [page, setPage] = useState<number>(0);

  const isLoading = loadingGenre !== null;

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

  const handleChangeLoopLength = (n: number) => {
    const newRows: GridRows = {};
    Object.entries(rows).forEach(([k, row]) => {
      const steps =
        n > row.steps.length
          ? [...row.steps, ...createRowSteps(n - row.steps.length)]
          : row.steps;
      newRows[Number(k)] = { ...row, steps };
    });
    engine.setLoopLength(n);
    engine.setRows(newRows);
    setRows(newRows);
    setLoopLength(n);
    setPage(0);
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

  const onSetPage = (p: number) => setPage(p);

  const applyPatternWithAnimation = (newRows: GridRows, newBpm?: number) => {
    if (newBpm !== undefined) {
      engine.setTempo(newBpm);
      setBpm(newBpm);
    }
    const mergedRows: GridRows = {};
    Object.entries(newRows).forEach(([k, row]) => {
      const rowIndex = Number(k);
      mergedRows[rowIndex] = { ...row, fx: rows[rowIndex]?.fx ?? DEFAULT_FX };
    });
    engine.setRows(mergedRows);
    Object.keys(mergedRows).forEach((k, i) => {
      const rowIndex = Number(k);
      setTimeout(() => {
        setRows((prev) => ({ ...prev, [rowIndex]: mergedRows[rowIndex] }));
      }, i * 100);
    });
  };

  const onSelectGenre = async (genre: string) => {
    setLoadingGenre(genre);
    try {
      const { bpm: newBpm, rows: newRows } = await generateGenrePattern(
        genre,
        loopLength,
      );
      applyPatternWithAnimation(newRows, newBpm);
    } catch (e) {
      console.error("Genre generation failed:", e);
    } finally {
      setLoadingGenre(null);
    }
  };

  return (
    <Sequencer
      delegate={{
        startSequencer,
        pauseSequencer,
        stopSequencer,
        handleChangeTempo,
        handleChangeLoopLength,
        updateRows,
        updateSteps,
        onShiftSequence,
        onToggleEditor,
        onSelectGenre,
        onSetPage,
      }}
      loopLength={loopLength}
      rows={rows}
      bpm={bpm}
      beat={beat}
      page={page}
      isPlaying={isPlaying}
      instrumentNames={Object.values(ToneInstrumentName)}
      editingIndex={editingIndex}
      loadingGenre={loadingGenre}
      isLoading={isLoading}
    />
  );
};
