import { ToneInstrumentName } from "../audio/AudioEngine";
import { GridRows, Subdivision } from "../Components/StepEditor/StepEditor";

export interface PatternResponse {
  bpm?: number;
  rows: GridRows;
}

interface ApiRow {
  instrumentName: string;
  note: string;
  octave: number;
  steps: number[];
}

const _post = async (
  content: string,
  loopLength: number,
): Promise<{ bpm?: number; rows: ApiRow[] }> => {
  const response: Response = await fetch("/api/generate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ role: "user", content, loopLength }),
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  const data = await response.json();
  const text: string = data.content[0].text;
  const cleaned = text.replace(/```(?:json)?\n?/g, "").trim();
  return JSON.parse(cleaned);
};

const _toGridRows = (apiRows: ApiRow[]): GridRows => {
  const result: GridRows = {};
  apiRows.forEach((row, i) => {
    result[i] = {
      instrumentName: row.instrumentName as ToneInstrumentName,
      note: row.note,
      octave: row.octave,
      steps: row.steps.map((s) => ({
        isActive: s > 0,
        subdivision: s === 3 ? Subdivision.Triplet : s === 2 ? Subdivision.Split : Subdivision.None,
      })),
    };
  });
  return result;
};

export const generateGenrePattern = async (
  genre: string,
  loopLength: number,
): Promise<PatternResponse> => {
  const result = await _post(genre, loopLength);
  return { bpm: result.bpm, rows: _toGridRows(result.rows) };
};
