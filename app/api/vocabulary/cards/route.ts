import { NextRequest, NextResponse } from 'next/server';
import { saveVocabularyCard, getVocabularyCards, getDueVocabularyCards, updateVocabularyCard } from '@/lib/database/client';

export async function POST(request: NextRequest) {
  try {
    const { userId, word, translation, contextSentence, difficultyLevel } = await request.json();

    if (!userId || !word || !translation) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const card = await saveVocabularyCard(
      userId,
      word,
      translation,
      contextSentence || '',
      difficultyLevel || 'medium'
    );

    return NextResponse.json(card);
  } catch (error) {
    console.error('Error saving vocabulary card:', error);
    return NextResponse.json(
      { error: 'Failed to save vocabulary card' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const dueOnly = searchParams.get('dueOnly') === 'true';

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    const cards = dueOnly
      ? await getDueVocabularyCards(userId)
      : await getVocabularyCards(userId);

    return NextResponse.json({ cards });
  } catch (error) {
    console.error('Error fetching vocabulary cards:', error);
    return NextResponse.json(
      { error: 'Failed to fetch vocabulary cards' },
      { status: 500 }
    );
  }
}
