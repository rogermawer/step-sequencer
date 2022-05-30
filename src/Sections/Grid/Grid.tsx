import Row, { GridRow } from "../../Components/Row/Row";
import "./GridStyle.scss";
import { BeatTrackerRow } from "../../Components/BeatTrackerRow/BeatTrackerRow";
import { FunctionComponent } from "react";
import { SequencerController } from "../../SequencerController/Sequencer";
import { SquareController } from "../../Components/Square/Square";

interface GridProps {
  sequencerController: SequencerController;
  controller: SquareController;
  beat: number;
  rows: GridRow[];
  steps: number;
}

export const Grid: FunctionComponent<GridProps> = ({
  sequencerController,
  controller,
  beat,
  rows,
  steps,
}) => (
  <div className="grid">
    {rows.map((row, i) => (
      <Row
        key={i}
        sequencerController={sequencerController}
        controller={controller}
        beat={beat}
        row={row}
      />
    ))}
    <BeatTrackerRow beat={beat} steps={steps} />
  </div>
);
