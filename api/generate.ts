export const config = { runtime: "edge" };

const getSystemPromt = (loopLength: number): string =>
  `Think like an electronic music producer. Given a genre, output a ${loopLength}-step drum pattern ONLY as valid JSON, minified with no whitespace, no explanation, no markdown. The JSON must have this exact shape:
{"bpm":<60-190>,"rows":[<5 rows>]}
Each row: {"instrumentName":"<Hat|Clap|Kick|Bell>","note":"<C|D|E|F|G|A|B>","octave":<2-5>,"steps":[<${loopLength} ints>]}
Steps: 0=inactive, 1=active, 2=split (two 16th notes), 3=triplet (three 16th-note triplets).

  Feel: [refer to user input]
  Density: [refer to user input]

  Rules:
  - Kick on step 1
  - Snare on steps 5 and 13
  - Hi-hat holds the grid
  - Max 2 simultaneous hits except on accents
  - Keep it musical and repetitive enough to loop cleanly
  - Utilize triplets sparingly
  - Notes and octaves of instrument rows must vary per generation
`;

interface RequestBody {
  role: string;
  content: string;
  loopLength: number;
}

interface AnthropicMessage {
  role: string;
  content: string;
}

const DESCRIPTORS = [
  "sparse",
  "busy",
  "syncopated",
  "driving",
  "laid-back",
  "minimal",
  "dense",
  "straight",
  "choppy",
  "flowing",
];

const GENRES = [
  "Hip-Hop",
  "Lo-Fi",
  "Indie Rock",
  "Techno",
  "Reggaeton",
  "Ambient",
  "D&B",
];

export default async function handler(req: Request): Promise<Response> {
  // TODO: make this work. had an issue when running on prod
  // const origin = req.headers.get("origin");
  // const deploymentOrigin = process.env.VERCEL_URL
  //   ? `https://${process.env.VERCEL_URL}`
  //   : null;
  // if (process.env.VERCEL_ENV === "production" && origin !== deploymentOrigin) {
  //   return new Response(JSON.stringify({ error: "Forbidden" }), {
  //     status: 403,
  //   });
  // }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
    });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return new Response(JSON.stringify({ error: "API key not configured" }), {
      status: 500,
    });
  }

  const body: RequestBody = await req.json();
  if (!body.content || !Object.values(GENRES).includes(body.content)) {
    return new Response(JSON.stringify({ error: "Bad request" }), {
      status: 400,
    });
  }

  const loopLength = body.loopLength === 16 ? 16 : 8;
  const descriptor =
    DESCRIPTORS[Math.floor(Math.random() * DESCRIPTORS.length)];
  const anthropicBody: AnthropicMessage = {
    role: body.role,
    content: `${descriptor} ${body.content}`,
  };

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-haiku-4-5-20251001",
      max_tokens: loopLength === 16 ? 700 : 350,
      system: getSystemPromt(loopLength),
      messages: [anthropicBody],
    }),
  });

  const data = await response.json();
  return new Response(JSON.stringify(data), { status: response.status });
}
