'use client';

import { useState, useRef, useEffect } from 'react';
import Card, { CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { Send, RotateCw, MessageCircle } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

const SCENARIOS = [
  { id: 'casual', label: 'Casual Conversation', description: 'Everyday topics and friendly chat' },
  { id: 'restaurant', label: 'At a Restaurant', description: 'Ordering food and discussing cuisine' },
  { id: 'travel', label: 'Travel Planning', description: 'Discussing destinations and itineraries' },
  { id: 'business', label: 'Business Meeting', description: 'Professional discussions and negotiations' },
  { id: 'cultural', label: 'Cultural Discussion', description: 'Art, literature, and French culture' },
  { id: 'news', label: 'Current Events', description: 'Discussing news and social issues' },
];

export default function ConversationPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [selectedScenario, setSelectedScenario] = useState(SCENARIOS[0]);
  const [loading, setLoading] = useState(false);
  const [conversationStarted, setConversationStarted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const startConversation = async () => {
    setConversationStarted(true);
    setMessages([]);
    setLoading(true);

    try {
      const response = await fetch('/api/conversation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [
            {
              role: 'user',
              content: `Commençons une conversation sur: ${selectedScenario.label}`,
            },
          ],
          scenario: selectedScenario.description,
        }),
      });

      if (!response.ok) throw new Error('Failed to start conversation');

      const data = await response.json();
      setMessages([
        {
          role: 'assistant',
          content: data.response,
          timestamp: new Date().toISOString(),
        },
      ]);
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to start conversation. Please ensure Anthropic API key is configured.');
      setConversationStarted(false);
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async () => {
    if (!inputText.trim() || loading) return;

    const userMessage: Message = {
      role: 'user',
      content: inputText,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText('');
    setLoading(true);

    try {
      const conversationHistory = [...messages, userMessage].map(msg => ({
        role: msg.role,
        content: msg.content,
      }));

      const response = await fetch('/api/conversation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: conversationHistory,
          scenario: selectedScenario.description,
        }),
      });

      if (!response.ok) throw new Error('Failed to send message');

      const data = await response.json();
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: data.response,
          timestamp: new Date().toISOString(),
        },
      ]);
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const resetConversation = () => {
    setConversationStarted(false);
    setMessages([]);
    setInputText('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
          Conversation Partner
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Practice French conversation with an AI partner that provides natural responses
        </p>
      </div>

      {!conversationStarted ? (
        <Card>
          <CardHeader>
            <CardTitle>Choose a Conversation Scenario</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {SCENARIOS.map((scenario) => (
                  <button
                    key={scenario.id}
                    onClick={() => setSelectedScenario(scenario)}
                    className={`p-4 text-left border rounded-lg transition-colors ${
                      selectedScenario.id === scenario.id
                        ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-500'
                        : 'bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 hover:border-blue-400'
                    }`}
                  >
                    <div className="font-semibold text-gray-900 dark:text-white mb-1">
                      {scenario.label}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {scenario.description}
                    </div>
                  </button>
                ))}
              </div>

              <Button
                onClick={startConversation}
                disabled={loading}
                className="w-full"
                size="lg"
              >
                {loading ? (
                  <>
                    <LoadingSpinner size="sm" className="mr-2" />
                    Starting...
                  </>
                ) : (
                  <>
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Start Conversation
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">Scenario:</span>
              <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium">
                {selectedScenario.label}
              </span>
            </div>
            <Button variant="outline" size="sm" onClick={resetConversation}>
              <RotateCw className="w-4 h-4 mr-2" />
              New Conversation
            </Button>
          </div>

          <Card className="min-h-[500px] flex flex-col">
            <CardContent className="flex-1 flex flex-col p-0">
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {messages.map((message, idx) => (
                  <div
                    key={idx}
                    className={`flex ${
                      message.role === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg px-4 py-3 ${
                        message.role === 'user'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                      }`}
                    >
                      <p className="text-base leading-relaxed whitespace-pre-wrap">
                        {message.content}
                      </p>
                      <p
                        className={`text-xs mt-2 ${
                          message.role === 'user'
                            ? 'text-blue-100'
                            : 'text-gray-500 dark:text-gray-400'
                        }`}
                      >
                        {new Date(message.timestamp).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                ))}
                {loading && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 dark:bg-gray-700 rounded-lg px-4 py-3">
                      <LoadingSpinner size="sm" />
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              <div className="border-t border-gray-200 dark:border-gray-700 p-4">
                <div className="flex gap-2">
                  <textarea
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Écrivez votre message en français..."
                    rows={2}
                    className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  />
                  <Button
                    onClick={sendMessage}
                    disabled={loading || !inputText.trim()}
                    size="lg"
                  >
                    <Send className="w-5 h-5" />
                  </Button>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                  Press Enter to send, Shift+Enter for new line
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Conversation Tips</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                <li className="flex items-start">
                  <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                  <span>The AI will naturally incorporate corrections into its responses</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                  <span>Try to write full sentences and use complex grammar structures</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                  <span>Don't worry about making mistakes - that's how you learn!</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                  <span>The AI responds at B2-C1 level to match your skill</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
