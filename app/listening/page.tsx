'use client';

import { useState, useRef } from 'react';
import Card, { CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { Play, Pause, Volume2, Eye, EyeOff, RotateCw } from 'lucide-react';

const SAMPLE_TEXTS = [
  {
    title: 'La cuisine française',
    text: 'La gastronomie française est reconnue dans le monde entier pour sa richesse et sa diversité. Chaque région possède ses spécialités culinaires, reflétant le terroir et les traditions locales. Des croissants parisiens aux quenelles lyonnaises, en passant par la bouillabaisse marseillaise, la France offre une palette de saveurs incomparable.',
    level: 'B2',
  },
  {
    title: 'Le patrimoine culturel',
    text: 'Le patrimoine français comprend des monuments historiques extraordinaires, des châteaux majestueux de la Loire aux cathédrales gothiques impressionnantes. Ces édifices témoignent de siècles d\'histoire et d\'art architectural. La préservation de ce patrimoine constitue un enjeu majeur pour les générations futures.',
    level: 'B2',
  },
  {
    title: 'L\'innovation technologique',
    text: 'La France investit massivement dans la recherche et le développement technologique. Des start-ups innovantes émergent dans les domaines de l\'intelligence artificielle, de la biotechnologie et des énergies renouvelables. Ces avancées positionnent le pays comme un acteur clé de la transformation numérique européenne.',
    level: 'C1',
  },
  {
    title: 'Les défis environnementaux',
    text: 'Face aux enjeux climatiques contemporains, la transition écologique s\'impose comme une priorité incontournable. La réduction des émissions de gaz à effet de serre, le développement des transports durables et la protection de la biodiversité nécessitent une mobilisation collective sans précédent.',
    level: 'C1',
  },
];

export default function ListeningPage() {
  const [selectedText, setSelectedText] = useState(SAMPLE_TEXTS[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1.0);
  const [loading, setLoading] = useState(false);
  const [dictationMode, setDictationMode] = useState(false);
  const [userDictation, setUserDictation] = useState('');
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const generateAndPlayAudio = async () => {
    setLoading(true);
    setIsPlaying(false);

    try {
      const response = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: selectedText.text,
          voice: 'alloy',
          speed: playbackSpeed,
        }),
      });

      if (!response.ok) throw new Error('Failed to generate audio');

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);

      if (audioRef.current) {
        audioRef.current.src = audioUrl;
        audioRef.current.play();
        setIsPlaying(true);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to generate audio. Please ensure OpenAI API key is configured.');
    } finally {
      setLoading(false);
    }
  };

  const togglePlayPause = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleAudioEnded = () => {
    setIsPlaying(false);
  };

  const checkDictation = () => {
    const original = selectedText.text.toLowerCase().replace(/[.,!?;:]/g, '');
    const userText = userDictation.toLowerCase().replace(/[.,!?;:]/g, '');
    
    if (original === userText) {
      alert('Perfect! 🎉');
    } else {
      const accuracy = calculateSimilarity(original, userText);
      alert(`Good effort! Accuracy: ${accuracy}%\n\nCompare with the original by showing the transcript.`);
    }
  };

  const calculateSimilarity = (str1: string, str2: string): number => {
    const words1 = str1.split(/\s+/);
    const words2 = str2.split(/\s+/);
    const maxLength = Math.max(words1.length, words2.length);
    
    let matches = 0;
    for (let i = 0; i < Math.min(words1.length, words2.length); i++) {
      if (words1[i] === words2[i]) matches++;
    }
    
    return Math.round((matches / maxLength) * 100);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
          Listening Practice
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Improve comprehension with natural French audio at your own pace
        </p>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Choose a Text</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {SAMPLE_TEXTS.map((text, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setSelectedText(text);
                  setShowTranscript(false);
                  setDictationMode(false);
                  setUserDictation('');
                  if (audioRef.current) {
                    audioRef.current.pause();
                    setIsPlaying(false);
                  }
                }}
                className={`p-4 text-left border rounded-lg transition-colors ${
                  selectedText === text
                    ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-500'
                    : 'bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 hover:border-blue-400'
                }`}
              >
                <div className="font-semibold text-gray-900 dark:text-white mb-1">
                  {text.title}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Level: {text.level} • {text.text.split(' ').length} words
                </div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>{selectedText.title}</CardTitle>
            <span className="text-sm px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full">
              {selectedText.level}
            </span>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex items-center justify-center gap-4">
              <Button
                onClick={generateAndPlayAudio}
                disabled={loading}
                variant="primary"
                size="lg"
              >
                {loading ? (
                  <>
                    <LoadingSpinner size="sm" className="mr-2" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Volume2 className="w-5 h-5 mr-2" />
                    Generate Audio
                  </>
                )}
              </Button>

              {audioRef.current?.src && (
                <Button
                  onClick={togglePlayPause}
                  variant="outline"
                  size="lg"
                >
                  {isPlaying ? (
                    <>
                      <Pause className="w-5 h-5 mr-2" />
                      Pause
                    </>
                  ) : (
                    <>
                      <Play className="w-5 h-5 mr-2" />
                      Play
                    </>
                  )}
                </Button>
              )}
            </div>

            <div className="flex items-center justify-center gap-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">Speed:</span>
              {[0.75, 1.0, 1.25].map((speed) => (
                <button
                  key={speed}
                  onClick={() => setPlaybackSpeed(speed)}
                  className={`px-3 py-1 text-sm rounded-md transition-colors ${
                    playbackSpeed === speed
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                  }`}
                >
                  {speed}x
                </button>
              ))}
            </div>

            <audio
              ref={audioRef}
              onEnded={handleAudioEnded}
              className="hidden"
            />

            <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
              <div className="flex gap-2 mb-4">
                <Button
                  variant="outline"
                  onClick={() => setShowTranscript(!showTranscript)}
                  className="flex-1"
                >
                  {showTranscript ? (
                    <>
                      <EyeOff className="w-4 h-4 mr-2" />
                      Hide Transcript
                    </>
                  ) : (
                    <>
                      <Eye className="w-4 h-4 mr-2" />
                      Show Transcript
                    </>
                  )}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setDictationMode(!dictationMode);
                    setUserDictation('');
                  }}
                  className="flex-1"
                >
                  <RotateCw className="w-4 h-4 mr-2" />
                  {dictationMode ? 'Cancel Dictation' : 'Practice Dictation'}
                </Button>
              </div>

              {showTranscript && (
                <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <p className="text-lg leading-relaxed text-gray-900 dark:text-white">
                    {selectedText.text}
                  </p>
                </div>
              )}

              {dictationMode && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Type what you hear:
                    </label>
                    <textarea
                      value={userDictation}
                      onChange={(e) => setUserDictation(e.target.value)}
                      placeholder="Écrivez ce que vous entendez..."
                      rows={6}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <Button
                    onClick={checkDictation}
                    disabled={!userDictation.trim()}
                    className="w-full"
                  >
                    Check My Answer
                  </Button>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Tips for Listening Practice</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300">
            <li className="flex items-start">
              <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
              <span>Start at 0.75x speed if the normal pace feels too fast</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
              <span>Listen without the transcript first to test comprehension</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
              <span>Use dictation mode to practice spelling and writing</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
              <span>Repeat texts multiple times to improve recognition speed</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
