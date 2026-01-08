export interface User {
  id: string;
  email: string;
  created_at: string;
}

export interface UserProgress {
  id: string;
  user_id: string;
  activity_type: 'reading' | 'listening' | 'vocabulary' | 'conversation';
  minutes_spent: number;
  completed_at: string;
  metadata?: Record<string, any>;
}

export interface VocabularyCard {
  id: string;
  user_id: string;
  word: string;
  translation: string;
  context_sentence: string;
  difficulty_level: string;
  next_review_date: string;
  ease_factor: number;
  interval_days: number;
  repetitions: number;
  created_at: string;
}

export interface GeneratedContent {
  id: string;
  content_type: 'article' | 'story' | 'cultural' | 'opinion';
  level: string;
  title: string;
  body: string;
  metadata?: {
    topics?: string[];
    difficulty?: string;
    word_count?: number;
  };
  created_at: string;
}

export interface Conversation {
  id: string;
  user_id: string;
  scenario: string;
  messages: ConversationMessage[];
  created_at: string;
}

export interface ConversationMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  correction?: string;
}

export interface ComprehensionQuestion {
  question: string;
  options?: string[];
  correct_answer: string;
  explanation: string;
}

export interface ReadingContent extends GeneratedContent {
  questions?: ComprehensionQuestion[];
  key_vocabulary?: string[];
}
