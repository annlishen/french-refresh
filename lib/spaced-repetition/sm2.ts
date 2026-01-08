import { VocabularyCard } from '@/lib/types';

/**
 * SM-2 Algorithm for Spaced Repetition
 * Based on the SuperMemo-2 algorithm
 */

export interface ReviewResult {
  quality: number; // 0-5 rating of recall quality
}

export interface UpdatedCard {
  ease_factor: number;
  interval_days: number;
  repetitions: number;
  next_review_date: string;
}

/**
 * Calculate the next review date based on SM-2 algorithm
 * @param card - The vocabulary card to update
 * @param quality - Rating from 0-5 (0=complete blackout, 5=perfect recall)
 * @returns Updated card properties
 */
export function calculateNextReview(
  card: VocabularyCard,
  quality: number
): UpdatedCard {
  let { ease_factor, interval_days, repetitions } = card;

  // Quality must be between 0 and 5
  quality = Math.max(0, Math.min(5, quality));

  // Update ease factor
  ease_factor = Math.max(
    1.3,
    ease_factor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02))
  );

  // If quality < 3, reset the learning process
  if (quality < 3) {
    repetitions = 0;
    interval_days = 1;
  } else {
    repetitions += 1;

    // Calculate new interval
    if (repetitions === 1) {
      interval_days = 1;
    } else if (repetitions === 2) {
      interval_days = 6;
    } else {
      interval_days = Math.round(interval_days * ease_factor);
    }
  }

  // Calculate next review date
  const next_review_date = new Date();
  next_review_date.setDate(next_review_date.getDate() + interval_days);

  return {
    ease_factor,
    interval_days,
    repetitions,
    next_review_date: next_review_date.toISOString(),
  };
}

/**
 * Get cards that are due for review
 * @param cards - All vocabulary cards
 * @returns Cards that need review today
 */
export function getDueCards(cards: VocabularyCard[]): VocabularyCard[] {
  const now = new Date();
  return cards.filter(card => new Date(card.next_review_date) <= now);
}

/**
 * Sort cards by priority (most overdue first)
 * @param cards - Cards to sort
 * @returns Sorted cards
 */
export function sortByPriority(cards: VocabularyCard[]): VocabularyCard[] {
  return [...cards].sort((a, b) => {
    const dateA = new Date(a.next_review_date).getTime();
    const dateB = new Date(b.next_review_date).getTime();
    return dateA - dateB;
  });
}

/**
 * Get statistics about vocabulary progress
 * @param cards - All vocabulary cards
 * @returns Statistics object
 */
export function getVocabularyStats(cards: VocabularyCard[]) {
  const total = cards.length;
  const dueToday = getDueCards(cards).length;
  const mastered = cards.filter(c => c.repetitions >= 5 && c.interval_days >= 21).length;
  const learning = cards.filter(c => c.repetitions > 0 && c.repetitions < 5).length;
  const new_cards = cards.filter(c => c.repetitions === 0).length;

  return {
    total,
    dueToday,
    mastered,
    learning,
    new: new_cards,
  };
}

/**
 * Quality ratings helper
 */
export const QUALITY_RATINGS = {
  BLACKOUT: 0, // Complete blackout
  WRONG: 1, // Wrong response; correct one remembered
  WRONG_EASY: 2, // Wrong response; correct one seemed easy
  CORRECT_HARD: 3, // Correct response; difficult to recall
  CORRECT: 4, // Correct response; hesitation
  PERFECT: 5, // Perfect response
};

/**
 * Get human-readable description of quality rating
 */
export function getQualityDescription(quality: number): string {
  const descriptions = {
    0: "Didn't remember at all",
    1: 'Incorrect, but recognized the right answer',
    2: 'Incorrect, but the right answer seemed obvious',
    3: 'Correct, but difficult to recall',
    4: 'Correct with some hesitation',
    5: 'Perfect recall',
  };
  return descriptions[quality as keyof typeof descriptions] || 'Unknown';
}
