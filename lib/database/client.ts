import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper functions for common database operations

export async function trackProgress(
  userId: string,
  activityType: 'reading' | 'listening' | 'vocabulary' | 'conversation',
  minutesSpent: number,
  metadata?: Record<string, any>
) {
  const { data, error } = await supabase
    .from('user_progress')
    .insert({
      user_id: userId,
      activity_type: activityType,
      minutes_spent: minutesSpent,
      metadata: metadata || {},
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getUserProgress(userId: string, limit = 50) {
  const { data, error } = await supabase
    .from('user_progress')
    .select('*')
    .eq('user_id', userId)
    .order('completed_at', { ascending: false })
    .limit(limit);

  if (error) throw error;
  return data;
}

export async function saveVocabularyCard(
  userId: string,
  word: string,
  translation: string,
  contextSentence: string,
  difficultyLevel = 'medium'
) {
  const { data, error } = await supabase
    .from('vocabulary_cards')
    .insert({
      user_id: userId,
      word,
      translation,
      context_sentence: contextSentence,
      difficulty_level: difficultyLevel,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getVocabularyCards(userId: string) {
  const { data, error } = await supabase
    .from('vocabulary_cards')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

export async function getDueVocabularyCards(userId: string) {
  const { data, error } = await supabase
    .from('vocabulary_cards')
    .select('*')
    .eq('user_id', userId)
    .lte('next_review_date', new Date().toISOString())
    .order('next_review_date', { ascending: true });

  if (error) throw error;
  return data;
}

export async function updateVocabularyCard(
  cardId: string,
  updates: {
    ease_factor?: number;
    interval_days?: number;
    repetitions?: number;
    next_review_date?: string;
  }
) {
  const { data, error } = await supabase
    .from('vocabulary_cards')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', cardId)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function saveConversation(
  userId: string,
  scenario: string,
  messages: any[]
) {
  const { data, error } = await supabase
    .from('conversations')
    .insert({
      user_id: userId,
      scenario,
      messages,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateConversation(
  conversationId: string,
  messages: any[]
) {
  const { data, error } = await supabase
    .from('conversations')
    .update({
      messages,
      updated_at: new Date().toISOString(),
    })
    .eq('id', conversationId)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getConversations(userId: string, limit = 20) {
  const { data, error } = await supabase
    .from('conversations')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) throw error;
  return data;
}

export async function saveGeneratedContent(
  contentType: 'article' | 'story' | 'cultural' | 'opinion',
  level: string,
  title: string,
  body: string,
  metadata?: Record<string, any>
) {
  const { data, error } = await supabase
    .from('generated_content')
    .insert({
      content_type: contentType,
      level,
      title,
      body,
      metadata: metadata || {},
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getGeneratedContent(
  contentType?: string,
  limit = 10
) {
  let query = supabase
    .from('generated_content')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit);

  if (contentType) {
    query = query.eq('content_type', contentType);
  }

  const { data, error } = await query;

  if (error) throw error;
  return data;
}
