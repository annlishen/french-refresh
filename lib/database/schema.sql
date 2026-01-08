-- Users table is handled by Supabase Auth

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Progress tracking
CREATE TABLE IF NOT EXISTS user_progress (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  activity_type VARCHAR(50) NOT NULL CHECK (activity_type IN ('reading', 'listening', 'vocabulary', 'conversation')),
  minutes_spent INTEGER NOT NULL DEFAULT 0,
  completed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_user_progress_user_id ON user_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_user_progress_activity_type ON user_progress(activity_type);
CREATE INDEX IF NOT EXISTS idx_user_progress_completed_at ON user_progress(completed_at);

-- Vocabulary cards
CREATE TABLE IF NOT EXISTS vocabulary_cards (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  word VARCHAR(255) NOT NULL,
  translation VARCHAR(255) NOT NULL,
  context_sentence TEXT,
  difficulty_level VARCHAR(10) DEFAULT 'medium',
  next_review_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  ease_factor FLOAT DEFAULT 2.5,
  interval_days INTEGER DEFAULT 1,
  repetitions INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for vocabulary
CREATE INDEX IF NOT EXISTS idx_vocabulary_user_id ON vocabulary_cards(user_id);
CREATE INDEX IF NOT EXISTS idx_vocabulary_next_review ON vocabulary_cards(next_review_date);
CREATE INDEX IF NOT EXISTS idx_vocabulary_word ON vocabulary_cards(word);

-- Content cache (to avoid regenerating)
CREATE TABLE IF NOT EXISTS generated_content (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  content_type VARCHAR(50) NOT NULL CHECK (content_type IN ('article', 'story', 'cultural', 'opinion')),
  level VARCHAR(10) DEFAULT 'B2',
  title VARCHAR(500) NOT NULL,
  body TEXT NOT NULL,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for content
CREATE INDEX IF NOT EXISTS idx_content_type ON generated_content(content_type);
CREATE INDEX IF NOT EXISTS idx_content_level ON generated_content(level);
CREATE INDEX IF NOT EXISTS idx_content_created_at ON generated_content(created_at);

-- Conversation history
CREATE TABLE IF NOT EXISTS conversations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  scenario VARCHAR(100),
  messages JSONB NOT NULL DEFAULT '[]',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for conversations
CREATE INDEX IF NOT EXISTS idx_conversations_user_id ON conversations(user_id);
CREATE INDEX IF NOT EXISTS idx_conversations_created_at ON conversations(created_at);

-- User stats view for dashboard
CREATE OR REPLACE VIEW user_stats AS
SELECT 
  user_id,
  activity_type,
  COUNT(*) as session_count,
  SUM(minutes_spent) as total_minutes,
  MAX(completed_at) as last_activity
FROM user_progress
GROUP BY user_id, activity_type;

-- Daily streak calculation function
CREATE OR REPLACE FUNCTION calculate_streak(p_user_id UUID)
RETURNS INTEGER AS $$
DECLARE
  current_streak INTEGER := 0;
  check_date DATE := CURRENT_DATE;
BEGIN
  LOOP
    IF EXISTS (
      SELECT 1 FROM user_progress 
      WHERE user_id = p_user_id 
      AND DATE(completed_at) = check_date
    ) THEN
      current_streak := current_streak + 1;
      check_date := check_date - INTERVAL '1 day';
    ELSE
      EXIT;
    END IF;
  END LOOP;
  
  RETURN current_streak;
END;
$$ LANGUAGE plpgsql;

-- RLS (Row Level Security) Policies
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE vocabulary_cards ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;

-- Users can only access their own data
CREATE POLICY "Users can view own progress" ON user_progress
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own progress" ON user_progress
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own vocabulary" ON vocabulary_cards
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can view own conversations" ON conversations
  FOR ALL USING (auth.uid() = user_id);

-- Generated content is public (read-only)
ALTER TABLE generated_content ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view content" ON generated_content
  FOR SELECT USING (true);
