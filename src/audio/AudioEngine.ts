import {
  FeedbackDelay,
  Reverb,
  getDestination,
  getTransport,
  PolySynth,
  Sampler,
  start,
  Time,
} from "tone";
import bell from "../Common/Samples/bell.wav";
import clap from "../Common/Samples/clap.wav";
import hat from "../Common/Samples/hat.wav";
import kick from "../Common/Samples/kick.wav";
import {
  GridRow,
  GridRows,
  Subdivision,
} from "../Components/StepEditor/StepEditor";

export const DEFAULT_LOOP_LENGTH = 8;

export enum ToneInstrumentName {
  HAT = "Hat",
  CLAP = "Clap",
  KICK = "Kick",
  TONE = "Tone",
  BELL = "Bell",
}

type ToneInstrument = PolySynth | Sampler;

interface RowState {
  instrument: ToneInstrument;
  effects: {
    delay: FeedbackDelay;
    reverb: Reverb;
  };
  data: GridRow;
}

export class AudioEngine {
  private rowState: Map<number, RowState> = new Map();
  private transport = getTransport();
  private output = getDestination();
  private currentStep = 0;
  private loopLength = DEFAULT_LOOP_LENGTH;
  private onStep: (step: number) => void = () => {};

  constructor() {
    this.output.volume.value = -12;
    this.transport.loop = true;
    this.transport.setLoopPoints(0, "1m");
    this.transport.scheduleRepeat((time) => this.play(time), "8n");
  }

  private createInstrument(name: ToneInstrumentName): ToneInstrument {
    switch (name) {
      case ToneInstrumentName.CLAP:
        return new Sampler({ urls: { C3: clap } });
      case ToneInstrumentName.HAT:
        return new Sampler({ urls: { C3: hat } });
      case ToneInstrumentName.KICK:
        return new Sampler({ urls: { C3: kick } });
      case ToneInstrumentName.BELL:
        return new Sampler({ urls: { C3: bell } });
      case ToneInstrumentName.TONE:
        return new PolySynth();
    }
  }

  private initRowChain(rowIndex: number, row: GridRow): void {
    const existing = this.rowState.get(rowIndex);
    if (existing) {
      existing.instrument.disconnect();
      existing.instrument.dispose();
    }

    const effects =
      existing?.effects ??
      (() => {
        const delay = new FeedbackDelay({
          wet: 0,
          delayTime: "8n",
          feedback: 0.4,
        });
        const reverb = new Reverb({ wet: 0, decay: 2.5, preDelay: 0.01 });
        reverb.generate();
        delay.connect(reverb);
        reverb.connect(this.output);
        return { delay, reverb };
      })();

    const instrument = this.createInstrument(row.instrumentName);
    instrument.connect(effects.delay);

    this.rowState.set(rowIndex, {
      instrument,
      effects,
      data: row,
    });
  }

  public setRows(rows: GridRows): void {
    Object.entries(rows).forEach(([k, row]) => {
      const rowIndex = Number(k);
      const state = this.rowState.get(rowIndex);
      if (!state || state.data.instrumentName !== row.instrumentName) {
        this.initRowChain(rowIndex, row);
      } else {
        state.data = row;
        if (row.fx) state.effects.reverb.wet.value = row.fx.reverb.wet;
      }
    });
  }

  public setOnStep(onStep: (step: number) => void): void {
    this.onStep = onStep;
  }

  public getInstrumentNames(): ToneInstrumentName[] {
    return Object.values(ToneInstrumentName);
  }

  public startAudio(): Promise<void> {
    return start();
  }

  public startSequencer(): void {
    this.transport.start();
  }

  public pauseSequencer(): void {
    this.transport.pause();
  }

  public stopSequencer(): void {
    this.transport.stop();
    this.onStep(0);
    this.currentStep = 0;
  }

  public setTempo(bpm: number): void {
    this.transport.set({ bpm });
  }

  public setLoopLength(steps: number): void {
    this.loopLength = steps;
    this.currentStep = this.currentStep % steps;
    this.transport.setLoopPoints(0, steps === 16 ? "2m" : "1m");
  }

  private play(time: number): void {
    if (this.transport.state !== "started") return;
    this.rowState.forEach(({ instrument, data: { steps, note, octave } }) => {
      if (!instrument) return;

      const octaveNote = note + octave;
      const currBeat = steps[this.currentStep];
      if (currBeat?.isActive) {
        if (currBeat.subdivision === Subdivision.Split) {
          instrument.triggerAttackRelease(octaveNote, "16n", time);
          instrument.triggerAttackRelease(
            octaveNote,
            "16n",
            time + Time("16n").toSeconds(),
          );
        } else if (currBeat.subdivision === Subdivision.Triplet) {
          instrument.triggerAttackRelease(octaveNote, "32n", time);
          instrument.triggerAttackRelease(
            octaveNote,
            "32n",
            time + Time("16t").toSeconds(),
          );
          instrument.triggerAttackRelease(
            octaveNote,
            "32n",
            time + Time("16t").toSeconds() * 2,
          );
        } else {
          instrument.triggerAttackRelease(octaveNote, "8n", time);
        }
      }
    });
    this.onStep(this.currentStep);
    this.currentStep = (this.currentStep + 1) % this.loopLength;
  }
}
