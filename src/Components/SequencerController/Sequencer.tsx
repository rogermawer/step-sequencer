import { BottomControlContainer } from "../BottomControls/BottomControlContainer";
import { GridRow } from "../Row/Row";
import "./SequencerStyle.scss";
import { GridContainer } from "../Grid/GridContainer";
import { FunctionComponent } from "react";
import { EditorContainer } from "../Editor/EditorContainer";

export interface SequencerController {
  startSequencer: () => void;
  stopSequencer: () => void;
  updateRows: (row: GridRow) => void;
}

interface SequencerProps {
  controller: SequencerController;
  rows: GridRow[];
  steps: number;
}

export const Sequencer: FunctionComponent<SequencerProps> = ({
  controller,
  rows,
  steps,
}) => (
  <div className="sequencer">
    <div className="main">
      <EditorContainer controller={controller} rows={rows} />
      <GridContainer
        sequencerController={controller}
        steps={steps}
        rows={rows}
      />
    </div>
    <BottomControlContainer controller={controller} />
  </div>
);
