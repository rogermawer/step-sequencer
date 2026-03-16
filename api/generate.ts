export const config = { runtime: "edge" };

const GENRE_SYSTEM_PROMPT = `You are a music sequencer pattern generator. Given a genre, return ONLY valid JSON, no explanation, no markdown.
The JSON must have this exact shape:
{"bpm":<60-190>,"rows":[<5 rows>]}
Each row: {"instrumentName":"<Hat|Clap|Kick|Bell>","note":"<C|D|E|F|G|A|B>","octave":<2-5>,"steps":[<8 ints>]}
Steps: 0=inactive, 1=active, 2=split+active. Return minified JSON with no whitespace.`;

interface AnthropicMessage {
  role: string;
  content: string;
}

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
  const origin = req.headers.get("origin");

  const deploymentOrigin = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : null;

  if (process.env.VERCEL_ENV === "production" && origin !== deploymentOrigin) {
    return new Response(JSON.stringify({ error: "Forbidden" }), {
      status: 403,
    });
  }

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

  const body: AnthropicMessage = await req.json();
  if (!body.content || !Object.values(GENRES).includes(body.content)) {
    return new Response(JSON.stringify({ error: "Bad request" }), {
      status: 400,
    });
  }

  const seed = Math.floor(Math.random() * 10000);
  const anthropicBody: AnthropicMessage = {
    role: body.role,
    content: `${body.content} (variation: ${seed})`,
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
      max_tokens: 300,
      system: GENRE_SYSTEM_PROMPT,
      messages: [anthropicBody],
    }),
  });

  const data = await response.json();
  return new Response(JSON.stringify(data), { status: response.status });
}
