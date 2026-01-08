import { NextRequest, NextResponse } from 'next/server';
import { generateSpeech } from '@/lib/ai/openai';

export async function POST(request: NextRequest) {
  try {
    const { text, voice, speed } = await request.json();

    if (!text) {
      return NextResponse.json(
        { error: 'Text is required' },
        { status: 400 }
      );
    }

    const audioBuffer = await generateSpeech(
      text,
      voice || 'alloy',
      speed || 1.0
    );

    return new Response(audioBuffer, {
      headers: {
        'Content-Type': 'audio/mpeg',
        'Content-Length': audioBuffer.length.toString(),
      },
    });
  } catch (error) {
    console.error('Error generating speech:', error);
    return NextResponse.json(
      { error: 'Failed to generate speech' },
      { status: 500 }
    );
  }
}
