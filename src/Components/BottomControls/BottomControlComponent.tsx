import React from "react";
import "./BottomControlsStyle.scss";

const hints = ["Right click on a square to split it in half"];

interface BottomControlsComponentProps {}

export const BottomControlsComponent: React.FC<
  BottomControlsComponentProps
> = ({}) => (
  <div className="bottom-controls">
    <div className="hints">
      <h3>Hints:</h3>
      <ul>
        {hints.map((hint) => (
          <li>{hint}</li>
        ))}
      </ul>
    </div>
  </div>
);
