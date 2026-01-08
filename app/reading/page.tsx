'use client';

import { useState } from 'react';
import Card, { CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { BookOpen, Save, Volume2 } from 'lucide-react';

interface Question {
  question: string;
  options: string[];
  correct_answer: string;
  explanation: string;
}

interface Content {
  title: string;
  body: string;
  questions: Question[];
}

const TOPICS = [
  'Les enjeux climatiques actuels',
  'La gastronomie française moderne',
  'Les innovations technologiques',
  'La vie culturelle à Paris',
  'Le système éducatif français',
  'Les défis de la mondialisation',
  'L\'histoire de Bordeaux',
  'Les traditions régionales',
];

export default function ReadingPage() {
  const [content, setContent] = useState<Content | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState('');
  const [customTopic, setCustomTopic] = useState('');
  const [showAnswers, setShowAnswers] = useState(false);
  const [selectedWord, setSelectedWord] = useState<string | null>(null);

  const generateContent = async () => {
    const topic = customTopic || selectedTopic;
    if (!topic) return;

    setLoading(true);
    setShowAnswers(false);
    
    try {
      const response = await fetch('/api/generate-content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic, level: 'B2' }),
      });

      if (!response.ok) throw new Error('Failed to generate content');

      const data = await response.json();
      setContent(data);
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to generate content. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleWordClick = (word: string) => {
    setSelectedWord(word);
    // In a real app, this would trigger translation lookup
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
          Reading Comprehension
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          AI-generated articles at B2-C1 level with comprehension questions
        </p>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Generate New Article</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Choose a topic:
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {TOPICS.map((topic) => (
                  <button
                    key={topic}
                    onClick={() => {
                      setSelectedTopic(topic);
                      setCustomTopic('');
                    }}
                    className={`px-3 py-2 text-sm rounded-md border transition-colors ${
                      selectedTopic === topic
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:border-blue-400'
                    }`}
                  >
                    {topic}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Or enter your own topic:
              </label>
              <input
                type="text"
                value={customTopic}
                onChange={(e) => {
                  setCustomTopic(e.target.value);
                  setSelectedTopic('');
                }}
                placeholder="e.g., Les vins de Bordeaux"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <Button
              onClick={generateContent}
              disabled={loading || (!selectedTopic && !customTopic)}
              className="w-full"
            >
              {loading ? (
                <>
                  <LoadingSpinner size="sm" className="mr-2" />
                  Generating...
                </>
              ) : (
                <>
                  <BookOpen className="w-5 h-5 mr-2" />
                  Generate Article
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {content && (
        <>
          <Card className="mb-8">
            <CardHeader>
              <div className="flex items-start justify-between">
                <CardTitle>{content.title}</CardTitle>
                <Button variant="outline" size="sm">
                  <Volume2 className="w-4 h-4 mr-2" />
                  Listen
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="prose dark:prose-invert max-w-none">
                {content.body.split('\n\n').map((paragraph, idx) => (
                  <p
                    key={idx}
                    className="mb-4 text-gray-700 dark:text-gray-300 leading-relaxed text-lg"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <Button variant="outline" size="sm">
                  <Save className="w-4 h-4 mr-2" />
                  Save Vocabulary
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Comprehension Questions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {content.questions?.map((q, idx) => (
                  <div key={idx} className="border-b border-gray-200 dark:border-gray-700 pb-6 last:border-0">
                    <h3 className="font-semibold text-lg mb-3 text-gray-900 dark:text-white">
                      {idx + 1}. {q.question}
                    </h3>
                    <div className="space-y-2 mb-3">
                      {q.options?.map((option, optIdx) => (
                        <div
                          key={optIdx}
                          className={`p-3 rounded-md border ${
                            showAnswers && option === q.correct_answer
                              ? 'bg-green-50 dark:bg-green-900/20 border-green-500'
                              : 'bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600'
                          }`}
                        >
                          {option}
                        </div>
                      ))}
                    </div>
                    {showAnswers && (
                      <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-md">
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                          <strong>Explanation:</strong> {q.explanation}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div className="mt-6">
                <Button
                  onClick={() => setShowAnswers(!showAnswers)}
                  variant="outline"
                  className="w-full"
                >
                  {showAnswers ? 'Hide Answers' : 'Show Answers'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
