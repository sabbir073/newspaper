import { NextResponse } from 'next/server';

/**
 * Split long text into chunks of ≤ maxLen characters, preserving sentence boundaries.
 * Edge TTS can handle very long text natively, so we use large chunks for smooth playback.
 */
function chunkText(text: string, maxLen: number): string[] {
  if (text.length <= maxLen) return [text];

  const sentences = text
    .split(/(?<=[।.!?;])\s+|\n+/)
    .map((s) => s.trim())
    .filter(Boolean);

  const chunks: string[] = [];
  let buf = '';
  for (const s of sentences) {
    if (buf && (buf + ' ' + s).length > maxLen) {
      chunks.push(buf);
      buf = s;
    } else {
      buf = buf ? `${buf} ${s}` : s;
    }
  }
  if (buf) chunks.push(buf);
  return chunks;
}

export async function POST(request: Request) {
  try {
    const { text } = await request.json();

    if (!text || typeof text !== 'string') {
      return NextResponse.json({ error: 'Text is required' }, { status: 400 });
    }

    const trimmed = text.trim();
    if (!trimmed) return NextResponse.json({ chunks: [] });

    // Edge TTS handles ~4000 chars per chunk comfortably
    return NextResponse.json({
      provider: 'edge',
      chunks: chunkText(trimmed, 4000),
    });
  } catch (err) {
    console.error('[TTS API]', err);
    return NextResponse.json({ error: 'TTS generation failed' }, { status: 500 });
  }
}
