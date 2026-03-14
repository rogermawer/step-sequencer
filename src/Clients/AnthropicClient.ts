import { ToneInstrumentName } from "../audio/AudioEngine";
import { GridRows, Step } from "../Components/StepEditor/StepEditor";
import { ANTHROPIC_API_KEY } from "../keys";

const GENRE_SYSTEM_PROMPT = `You are a music sequencer pattern generator. Given a genre, return ONLY valid JSON, no explanation, no markdown.
The JSON must have this exact shape:
{
  "bpm": <number between 60 and 190>,
  "rows": [
    { "instrumentName": "<Hat|Clap|Kick|Hat|Bell>", "note": "<C|D|E|F|G|A|B>", "octave": <2-5>, "steps": [<8 booleans>] },
    { "instrumentName": "<Hat|Clap|Kick|Hat|Bell>", "note": "<C|D|E|F|G|A|B>", "octave": <2-5>, "steps": [<8 booleans>] },
    { "instrumentName": "<Hat|Clap|Kick|Hat|Bell>", "note": "<C|D|E|F|G|A|B>", "octave": <2-5>, "steps": [<8 booleans>] },
    { "instrumentName": "<Hat|Clap|Kick|Hat|Bell>", "note": "<C|D|E|F|G|A|B>", "octave": <2-5>, "steps": [<8 booleans>] },
    { "instrumentName": "<Hat|Clap|Kick|Hat|Bell>", "note": "<C|D|E|F|G|A|B>", "octave": <2-5>, "steps": [<8 booleans>] }
  ]
}
Exactly 5 rows, exactly 8 steps each. Return minified JSON with no whitespace.`;

export interface PatternResponse {
  bpm?: number;
  rows: GridRows;
}

interface ApiRow {
  instrumentName: string;
  note: string;
  octave: number;
  steps: boolean[];
}

const _post = async (
  systemPrompt: string,
  userContent: string,
): Promise<{ bpm?: number; rows: ApiRow[] }> => {
  const response: Response = await fetch(
    "https://api.anthropic.com/v1/messages",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": ANTHROPIC_API_KEY ?? "",
        "anthropic-version": "2023-06-01",
        "anthropic-dangerous-direct-browser-access": "true",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 400,
        system: systemPrompt,
        messages: [{ role: "user", content: userContent }],
      }),
    },
  );

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
  console.log(apiRows);
  apiRows.forEach((row, i) => {
    result[i] = {
      instrumentName: row.instrumentName as ToneInstrumentName,
      note: row.note,
      octave: row.octave,
      steps: row.steps.map((isActive): Step => ({ isActive, isSplit: false })),
    };
  });
  return result;
};

export const generateGenrePattern = async (
  genre: string,
): Promise<PatternResponse> => {
  const seed = Math.floor(Math.random() * 10000);
  const result = await _post(
    GENRE_SYSTEM_PROMPT,
    `${genre} (variation: ${seed})`,
  );
  return { bpm: result.bpm, rows: _toGridRows(result.rows) };
};
