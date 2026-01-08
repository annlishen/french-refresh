'use client';

import { useState, useEffect } from 'react';
import Card, { CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { RotateCw, Plus, BookMarked, Eye, EyeOff } from 'lucide-react';
import { VocabularyCard } from '@/lib/types';
import { getQualityDescription } from '@/lib/spaced-repetition/sm2';

// Mock user ID - in a real app, this would come from authentication
const MOCK_USER_ID = 'demo-user';

export default function VocabularyPage() {
  const [view, setView] = useState<'practice' | 'add' | 'browse'>('practice');
  const [dueCards, setDueCards] = useState<VocabularyCard[]>([]);
  const [allCards, setAllCards] = useState<VocabularyCard[]>([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [loading, setLoading] = useState(false);
  const [newCard, setNewCard] = useState({
    word: '',
    translation: '',
    contextSentence: '',
  });

  const currentCard = dueCards[currentCardIndex];

  useEffect(() => {
    if (view === 'practice') {
      loadDueCards();
    } else if (view === 'browse') {
      loadAllCards();
    }
  }, [view]);

  const loadDueCards = async () => {
    setLoading(true);
    try {
      // In a real app, this would fetch from the API
      // For demo purposes, we'll use mock data
      const mockCards: VocabularyCard[] = [
        {
          id: '1',
          user_id: MOCK_USER_ID,
          word: 'néanmoins',
          translation: 'nevertheless, however',
          context_sentence: 'Il pleuvait, néanmoins nous sommes sortis.',
          difficulty_level: 'medium',
          next_review_date: new Date().toISOString(),
          ease_factor: 2.5,
          interval_days: 1,
          repetitions: 0,
          created_at: new Date().toISOString(),
        },
        {
          id: '2',
          user_id: MOCK_USER_ID,
          word: 'davantage',
          translation: 'more, further',
          context_sentence: 'Je voudrais en savoir davantage sur ce sujet.',
          difficulty_level: 'medium',
          next_review_date: new Date().toISOString(),
          ease_factor: 2.5,
          interval_days: 1,
          repetitions: 0,
          created_at: new Date().toISOString(),
        },
        {
          id: '3',
          user_id: MOCK_USER_ID,
          word: 'en dépit de',
          translation: 'despite, in spite of',
          context_sentence: 'En dépit de ses efforts, il n\'a pas réussi.',
          difficulty_level: 'medium',
          next_review_date: new Date().toISOString(),
          ease_factor: 2.5,
          interval_days: 1,
          repetitions: 0,
          created_at: new Date().toISOString(),
        },
      ];
      setDueCards(mockCards);
    } catch (error) {
      console.error('Error loading cards:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadAllCards = async () => {
    setLoading(true);
    try {
      // Mock data for browsing
      setAllCards(dueCards);
    } catch (error) {
      console.error('Error loading cards:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleReview = async (quality: number) => {
    if (!currentCard) return;

    try {
      // In a real app, this would update via API
      console.log('Reviewed card with quality:', quality);
      
      setShowAnswer(false);
      if (currentCardIndex < dueCards.length - 1) {
        setCurrentCardIndex(currentCardIndex + 1);
      } else {
        // All cards reviewed
        setDueCards([]);
        setCurrentCardIndex(0);
      }
    } catch (error) {
      console.error('Error reviewing card:', error);
    }
  };

  const handleAddCard = async () => {
    if (!newCard.word || !newCard.translation) {
      alert('Please fill in at least the word and translation');
      return;
    }

    setLoading(true);
    try {
      // In a real app, this would save via API
      console.log('Adding card:', newCard);
      
      setNewCard({ word: '', translation: '', contextSentence: '' });
      alert('Card added successfully!');
    } catch (error) {
      console.error('Error adding card:', error);
      alert('Failed to add card');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
          Vocabulary Practice
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Spaced repetition flashcards for building advanced vocabulary
        </p>
      </div>

      <div className="flex gap-2 mb-8">
        <Button
          variant={view === 'practice' ? 'primary' : 'outline'}
          onClick={() => setView('practice')}
        >
          <RotateCw className="w-4 h-4 mr-2" />
          Practice
        </Button>
        <Button
          variant={view === 'add' ? 'primary' : 'outline'}
          onClick={() => setView('add')}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Card
        </Button>
        <Button
          variant={view === 'browse' ? 'primary' : 'outline'}
          onClick={() => setView('browse')}
        >
          <BookMarked className="w-4 h-4 mr-2" />
          Browse All
        </Button>
      </div>

      {view === 'practice' && (
        <>
          {loading ? (
            <LoadingSpinner />
          ) : dueCards.length === 0 ? (
            <Card>
              <CardContent className="text-center py-12">
                <BookMarked className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                  No cards due for review!
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Great job! Check back later or add new vocabulary cards.
                </p>
                <Button onClick={() => setView('add')}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add New Card
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Card {currentCardIndex + 1} of {dueCards.length}
              </div>

              <Card className="min-h-[400px] flex flex-col">
                <CardContent className="flex-1 flex flex-col justify-center items-center p-12">
                  <div className="text-center w-full">
                    <h2 className="text-5xl font-bold text-gray-900 dark:text-white mb-8">
                      {currentCard.word}
                    </h2>
                    
                    {showAnswer && (
                      <div className="space-y-6 animate-in fade-in duration-300">
                        <div className="text-2xl text-blue-600 dark:text-blue-400">
                          {currentCard.translation}
                        </div>
                        
                        {currentCard.context_sentence && (
                          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                            <p className="text-lg italic text-gray-700 dark:text-gray-300">
                              "{currentCard.context_sentence}"
                            </p>
                          </div>
                        )}
                        
                        <div className="pt-6">
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                            How well did you know this word?
                          </p>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                            {[0, 1, 2, 3, 4, 5].map((quality) => (
                              <Button
                                key={quality}
                                variant={quality >= 3 ? 'primary' : 'danger'}
                                size="sm"
                                onClick={() => handleReview(quality)}
                                className="text-xs"
                              >
                                {quality}: {getQualityDescription(quality).split(',')[0]}
                              </Button>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
                
                {!showAnswer && (
                  <div className="p-6 border-t border-gray-200 dark:border-gray-700">
                    <Button
                      onClick={() => setShowAnswer(true)}
                      className="w-full"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      Show Answer
                    </Button>
                  </div>
                )}
              </Card>
            </div>
          )}
        </>
      )}

      {view === 'add' && (
        <Card>
          <CardHeader>
            <CardTitle>Add New Vocabulary Card</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  French Word or Phrase *
                </label>
                <input
                  type="text"
                  value={newCard.word}
                  onChange={(e) => setNewCard({ ...newCard, word: e.target.value })}
                  placeholder="e.g., néanmoins"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  English Translation *
                </label>
                <input
                  type="text"
                  value={newCard.translation}
                  onChange={(e) => setNewCard({ ...newCard, translation: e.target.value })}
                  placeholder="e.g., nevertheless, however"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Context Sentence (Optional)
                </label>
                <textarea
                  value={newCard.contextSentence}
                  onChange={(e) => setNewCard({ ...newCard, contextSentence: e.target.value })}
                  placeholder="e.g., Il pleuvait, néanmoins nous sommes sortis."
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <Button
                onClick={handleAddCard}
                disabled={loading || !newCard.word || !newCard.translation}
                className="w-full"
              >
                {loading ? (
                  <>
                    <LoadingSpinner size="sm" className="mr-2" />
                    Adding...
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Card
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {view === 'browse' && (
        <Card>
          <CardHeader>
            <CardTitle>All Vocabulary Cards ({allCards.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <LoadingSpinner />
            ) : allCards.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600 dark:text-gray-400">
                  No vocabulary cards yet. Add some to get started!
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {allCards.map((card) => (
                  <div
                    key={card.id}
                    className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        {card.word}
                      </h3>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        Repetitions: {card.repetitions}
                      </span>
                    </div>
                    <p className="text-blue-600 dark:text-blue-400 mb-2">
                      {card.translation}
                    </p>
                    {card.context_sentence && (
                      <p className="text-sm text-gray-600 dark:text-gray-400 italic">
                        "{card.context_sentence}"
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
