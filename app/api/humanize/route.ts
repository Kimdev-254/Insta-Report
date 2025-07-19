// If you see a module not found error for 'openai', install it with:
// pnpm add openai
import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const HUMANIZE_PROMPT = `
You are an expert academic editor who rewrites text in a way that sounds like a real human wrote it, especially a university student. Your task is to rephrase the content below so it cannot be easily detected as AI-generated.

Guidelines:
- Add human touches: occasional filler phrases, varied sentence lengths, natural transitions.
- Slightly restructure paragraphs, don't just rephrase line by line.
- Use academic tone, but not too perfect—keep some natural imperfections.
- Avoid generic patterns that large language models use.
- Keep the original meaning exactly the same.
- Do NOT add or remove content—just rewrite it to sound natural and human-written.
- Output only the rewritten text. No preamble, no explanation.

Input text:
`;

export async function POST(req: NextRequest) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'OPENAI_API_KEY environment variable is missing.' }, { status: 500 });
  }

  const openai = new OpenAI({ apiKey });
  const { text } = await req.json();
  if (!text) {
    return NextResponse.json({ error: 'No text provided' }, { status: 400 });
  }

  const completion = await openai.chat.completions.create({
    model: 'gpt-4-turbo',
    messages: [
      { role: 'user', content: HUMANIZE_PROMPT + text }
    ],
    max_tokens: 2000,
    temperature: 0.85,
  });

  const rewritten = completion.choices[0].message.content?.trim();
  return NextResponse.json({ rewritten });
} 