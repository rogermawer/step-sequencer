import {
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
import { GridRows } from "../Components/StepEditor/StepEditor";

export enum ToneInstrumentName {
  HAT = "Hat",
  CLAP = "Clap",
  KICK = "Kick",
  TONE = "Tone",
  BELL = "Bell",
}

type ToneInstrument = PolySynth | Sampler;

export class AudioEngine {
  private instruments: Map<ToneInstrumentName, ToneInstrument>;
  private rows: GridRows = {};
  private transport = getTransport();
  private output = getDestination();
  private currentStep = 0;
  private onStep: (step: number) => void = () => {};

  constructor() {
    this.output.volume.value = -12;

    const clap_ = new Sampler({ urls: { C3: clap } });
    const hat_ = new Sampler({ urls: { C3: hat } });
    const kick_ = new Sampler({ urls: { C3: kick } });
    const bell_ = new Sampler({ urls: { C3: bell } });
    const tone_ = new PolySynth();

    clap_.connect(this.output);
    hat_.connect(this.output);
    kick_.connect(this.output);
    bell_.connect(this.output);
    tone_.connect(this.output);

    this.instruments = new Map<ToneInstrumentName, ToneInstrument>([
      [ToneInstrumentName.CLAP, clap_],
      [ToneInstrumentName.HAT, hat_],
      [ToneInstrumentName.KICK, kick_],
      [ToneInstrumentName.BELL, bell_],
      [ToneInstrumentName.TONE, tone_],
    ]);

    this.transport.loop = true;
    this.transport.setLoopPoints(0, "1m");
    this.transport.scheduleRepeat((time) => this.play(time), "8n");
  }

  public setRows(rows: GridRows): void {
    this.rows = rows;
  }

  public setOnStep(onStep: (step: number) => void): void {
    this.onStep = onStep;
  }

  public getInstrumentNames(): ToneInstrumentName[] {
    return Array.from(this.instruments.keys());
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

  private play(time: number): void {
    if (this.transport.state !== "started") return;
    Object.values(this.rows).forEach((row) => {
      const { steps, instrumentName, note, octave } = row;
      const instrument = this.instruments.get(instrumentName);
      if (!instrument) return;

      const octaveNote = note + octave;
      const currBeat = steps[this.currentStep];
      if (currBeat?.isActive) {
        if (currBeat.isSplit) {
          instrument.triggerAttackRelease(octaveNote, "16n", time);
          instrument.triggerAttackRelease(
            octaveNote,
            "16n",
            time + Time("16n").toSeconds(),
          );
        } else {
          instrument.triggerAttackRelease(octaveNote, "8n", time);
        }
      }
    });
    this.onStep(this.currentStep);
    this.currentStep = (this.currentStep + 1) % 8;
  }
}
