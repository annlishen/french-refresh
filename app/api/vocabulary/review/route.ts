import { NextRequest, NextResponse } from 'next/server';
import { updateVocabularyCard } from '@/lib/database/client';
import { calculateNextReview } from '@/lib/spaced-repetition/sm2';

export async function POST(request: NextRequest) {
  try {
    const { cardId, card, quality } = await request.json();

    if (!cardId || !card || quality === undefined) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Calculate next review using SM-2 algorithm
    const updates = calculateNextReview(card, quality);

    // Update the card in database
    const updatedCard = await updateVocabularyCard(cardId, updates);

    return NextResponse.json(updatedCard);
  } catch (error) {
    console.error('Error updating vocabulary card:', error);
    return NextResponse.json(
      { error: 'Failed to update vocabulary card' },
      { status: 500 }
    );
  }
}
