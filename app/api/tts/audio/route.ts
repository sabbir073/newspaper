import { MsEdgeTTS, OUTPUT_FORMAT } from 'msedge-tts';
import { getAudioUrl } from 'google-tts-api';
import type { Readable } from 'stream';

const DEFAULT_VOICE = process.env.TTS_VOICE || 'bn-BD-NabanitaNeural';
// Alternatives: bn-BD-PradeepNeural (male), bn-IN-TanishaaNeural (female IN), bn-IN-BashkarNeural (male IN)

/**
 * Convert Node Readable into a Web ReadableStream so Next.js can return it.
 */
function nodeStreamToWebStream(node: Readable): ReadableStream<Uint8Array> {
  return new ReadableStream({
    start(controller) {
      node.on('data', (chunk: Buffer) => {
        controller.enqueue(new Uint8Array(chunk));
      });
      node.on('end', () => controller.close());
      node.on('error', (err) => controller.error(err));
    },
    cancel() {
      node.destroy();
    },
  });
}

async function fetchEdgeAudio(text: string, voice: string): Promise<Response> {
  const tts = new MsEdgeTTS();
  await tts.setMetadata(voice, OUTPUT_FORMAT.AUDIO_24KHZ_96KBITRATE_MONO_MP3);
  const { audioStream } = tts.toStream(text);

  const webStream = nodeStreamToWebStream(audioStream);

  return new Response(webStream, {
    status: 200,
    headers: {
      'Content-Type': 'audio/mpeg',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}

async function fetchGoogleAudio(text: string, lang: string): Promise<Response> {
  const ttsUrl = getAudioUrl(text, {
    lang,
    slow: false,
    host: 'https://translate.google.com',
  });

  const upstream = await fetch(ttsUrl, {
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      Referer: 'https://translate.google.com/',
      Accept: 'audio/mpeg,audio/*;q=0.9,*/*;q=0.5',
    },
  });

  if (!upstream.ok || !upstream.body) {
    console.error('[Google TTS]', upstream.status, upstream.statusText);
    return new Response('Upstream TTS fetch failed', { status: 502 });
  }

  return new Response(upstream.body, {
    status: 200,
    headers: {
      'Content-Type': 'audio/mpeg',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const text = searchParams.get('text');
  const provider = searchParams.get('provider') || 'edge';
  const voice = searchParams.get('voice') || DEFAULT_VOICE;
  const lang = searchParams.get('lang') || 'bn';

  if (!text) return new Response('Missing text', { status: 400 });

  try {
    if (provider === 'edge') {
      return await fetchEdgeAudio(text, voice);
    }
    return await fetchGoogleAudio(text, lang);
  } catch (err) {
    console.error('[TTS audio]', err);
    // On edge failure, try Google as last resort
    if (provider === 'edge') {
      try {
        return await fetchGoogleAudio(text, lang);
      } catch (err2) {
        console.error('[TTS audio fallback]', err2);
      }
    }
    return new Response('TTS audio fetch failed', { status: 500 });
  }
}
