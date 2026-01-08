import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export interface ClaudeMessage {
  role: 'user' | 'assistant';
  content: string;
}

export async function generateContent(
  prompt: string,
  systemPrompt?: string
): Promise<string> {
  const message = await anthropic.messages.create({
    model: 'claude-3-5-sonnet-20241022',
    max_tokens: 2000,
    system: systemPrompt || 'You are a helpful French language content generator.',
    messages: [
      {
        role: 'user',
        content: prompt,
      },
    ],
  });

  const content = message.content[0];
  return content.type === 'text' ? content.text : '';
}

export async function generateReadingContent(
  topic: string,
  level: string = 'B2'
): Promise<{ title: string; body: string; questions: any[] }> {
  const systemPrompt = `You are a French language content creator for advanced learners (${level} level).
Generate sophisticated, engaging content that uses:
- Advanced vocabulary and idiomatic expressions
- Complex grammar structures (subjunctive, conditional, passive voice)
- Natural, flowing prose
- Cultural references and nuance

Always respond in valid JSON format.`;

  const prompt = `Generate a French article about "${topic}" that is 400-600 words long.
  
Include:
1. A compelling title
2. The article body with sophisticated French
3. Three comprehension questions (in French) with answers

Return as JSON:
{
  "title": "Article title in French",
  "body": "Full article text in French...",
  "questions": [
    {
      "question": "Question in French?",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correct_answer": "The correct option",
      "explanation": "Why this is correct (in French)"
    }
  ]
}`;

  const response = await generateContent(prompt, systemPrompt);
  
  try {
    return JSON.parse(response);
  } catch (error) {
    // If JSON parsing fails, try to extract content
    console.error('Failed to parse Claude response as JSON:', error);
    throw new Error('Failed to generate properly formatted content');
  }
}

export async function conversationTurn(
  messages: ClaudeMessage[],
  scenario?: string
): Promise<string> {
  const systemPrompt = `You are a French conversation partner for an advanced learner (B2-C1 level) who is rusty after years away from the language.

Guidelines:
- Always respond in natural, sophisticated French
- Use B2-C1 level vocabulary and structures
- If the user makes an error, gently correct it by naturally using the correct form in your response
- Ask follow-up questions to continue the dialogue
- Match the user's sophistication level
- Be encouraging and supportive
${scenario ? `\nScenario: ${scenario}` : ''}`;

  const message = await anthropic.messages.create({
    model: 'claude-3-5-sonnet-20241022',
    max_tokens: 500,
    system: systemPrompt,
    messages: messages.map(msg => ({
      role: msg.role,
      content: msg.content,
    })),
  });

  const content = message.content[0];
  return content.type === 'text' ? content.text : '';
}

export async function extractVocabulary(
  text: string,
  count: number = 10
): Promise<Array<{ word: string; translation: string; context: string }>> {
  const prompt = `From this French text, extract the ${count} most useful advanced vocabulary words for a B2-C1 learner.

Text: "${text}"

For each word, provide:
1. The French word
2. English translation
3. The sentence from the text where it appears

Return as JSON array:
[
  {
    "word": "French word",
    "translation": "English translation", 
    "context": "The full sentence containing the word"
  }
]`;

  const response = await generateContent(prompt);
  
  try {
    return JSON.parse(response);
  } catch (error) {
    console.error('Failed to parse vocabulary extraction:', error);
    return [];
  }
}

export async function provideFeedback(
  userText: string,
  corrections: boolean = true
): Promise<{ corrected: string; feedback: string }> {
  const prompt = `Review this French text written by a B2 level learner:

"${userText}"

Provide:
1. A corrected version (if needed)
2. Brief, encouraging feedback in English about what was good and what could be improved

Return as JSON:
{
  "corrected": "Corrected French text (or original if perfect)",
  "feedback": "Encouraging feedback in English"
}`;

  const response = await generateContent(prompt);
  
  try {
    return JSON.parse(response);
  } catch (error) {
    return {
      corrected: userText,
      feedback: 'Unable to provide feedback at this time.',
    };
  }
}
