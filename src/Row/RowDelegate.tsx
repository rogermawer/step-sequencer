import { useEffect, useState } from "react";
import { Step } from "./Row";

export const RowDelegate = (steps: number, noteKey: string) => {
  const [rowNotes, setRowNotes] = useState<Step[]>([]);

  return [rowNotes] as const;
};
