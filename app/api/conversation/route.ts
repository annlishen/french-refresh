import { NextRequest, NextResponse } from 'next/server';
import { conversationTurn } from '@/lib/ai/claude';

export async function POST(request: NextRequest) {
  try {
    const { messages, scenario } = await request.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Messages array is required' },
        { status: 400 }
      );
    }

    const response = await conversationTurn(messages, scenario);

    return NextResponse.json({ response });
  } catch (error) {
    console.error('Error in conversation:', error);
    return NextResponse.json(
      { error: 'Failed to generate conversation response' },
      { status: 500 }
    );
  }
}
