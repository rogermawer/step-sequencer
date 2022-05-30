import { BottomControlContainer } from "../Sections/BottomControls/BottomControlContainer";
import { GridRow } from "../Components/Row/Row";
import "../SequencerController/SequencerStyle.scss";
import { GridContainer } from "../Sections/Grid/GridContainer";
import { FunctionComponent } from "react";
import { EditorContainer } from "../Components/Editor/EditorContainer";

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
