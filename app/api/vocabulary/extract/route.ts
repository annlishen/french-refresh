import { NextRequest, NextResponse } from 'next/server';
import { extractVocabulary } from '@/lib/ai/claude';

export async function POST(request: NextRequest) {
  try {
    const { text, count } = await request.json();

    if (!text) {
      return NextResponse.json(
        { error: 'Text is required' },
        { status: 400 }
      );
    }

    const vocabulary = await extractVocabulary(text, count || 10);

    return NextResponse.json({ vocabulary });
  } catch (error) {
    console.error('Error extracting vocabulary:', error);
    return NextResponse.json(
      { error: 'Failed to extract vocabulary' },
      { status: 500 }
    );
  }
}
