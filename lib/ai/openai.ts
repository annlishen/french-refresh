import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateSpeech(
  text: string,
  voice: 'alloy' | 'echo' | 'fable' | 'onyx' | 'nova' | 'shimmer' = 'alloy',
  speed: number = 1.0
): Promise<Buffer> {
  const mp3 = await openai.audio.speech.create({
    model: 'tts-1',
    voice: voice,
    input: text,
    speed: speed,
  });

  const buffer = Buffer.from(await mp3.arrayBuffer());
  return buffer;
}

export async function transcribeAudio(
  audioFile: File | Buffer,
  language: string = 'fr'
): Promise<string> {
  const formData = new FormData();
  
  if (audioFile instanceof Buffer) {
    const blob = new Blob([audioFile], { type: 'audio/wav' });
    formData.append('file', blob, 'audio.wav');
  } else {
    formData.append('file', audioFile);
  }
  
  formData.append('model', 'whisper-1');
  formData.append('language', language);

  const transcription = await openai.audio.transcriptions.create({
    file: audioFile as any,
    model: 'whisper-1',
    language: language,
  });

  return transcription.text;
}

export async function generateSpeechStream(
  text: string,
  voice: 'alloy' | 'echo' | 'fable' | 'onyx' | 'nova' | 'shimmer' = 'alloy'
): Promise<Response> {
  const response = await openai.audio.speech.create({
    model: 'tts-1',
    voice: voice,
    input: text,
  });

  return new Response(response.body);
}

// Helper to split long texts into chunks for TTS
export function splitTextForTTS(text: string, maxLength: number = 4000): string[] {
  if (text.length <= maxLength) {
    return [text];
  }

  const chunks: string[] = [];
  const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
  let currentChunk = '';

  for (const sentence of sentences) {
    if ((currentChunk + sentence).length <= maxLength) {
      currentChunk += sentence;
    } else {
      if (currentChunk) {
        chunks.push(currentChunk.trim());
      }
      currentChunk = sentence;
    }
  }

  if (currentChunk) {
    chunks.push(currentChunk.trim());
  }

  return chunks;
}
