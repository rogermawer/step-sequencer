import "./StepEditorStyle.scss";
import { FunctionComponent } from "react";
import { Square } from "../Square/Square";
import { ToneInstrumentName } from "../../audio/AudioEngine";

export interface StepEditorDelegate {
  toggleIsActiveNote: (p: StepPosition) => void;
  onSplitSquare: (p: StepPosition) => void;
}

interface StepEditorProps {
  delegate: StepEditorDelegate;
  rowIndex: number;
  beat: number;
  steps: Step[];
}

export interface GridRows {
  [i: number]: GridRow;
}

export interface GridRow {
  note: string;
  octave: number;
  instrumentName: ToneInstrumentName;
  steps: Step[];
}

export interface Step {
  isActive: boolean;
  isSplit: boolean;
}

export type StepPosition = { rowIndex: number; stepIndex: number };

export const StepEditor: FunctionComponent<StepEditorProps> = ({
  delegate,
  rowIndex,
  beat,
  steps,
}) => (
  <div className="steps">
    {steps.map((step, stepIndex) => (
      <Square
        key={stepIndex}
        delegate={delegate}
        isPlaying={beat === stepIndex}
        isActive={step.isActive}
        isSplit={step.isSplit}
        stepPosition={{ rowIndex, stepIndex }}
      />
    ))}
  </div>
);
