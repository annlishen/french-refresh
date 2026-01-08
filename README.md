# French Language Refresh App

A modern web application designed for advanced French learners returning to the language after years away. The app uses AI to generate contextually appropriate content at B2-C1 level.

## Features

- **Reading Comprehension**: AI-generated articles with interactive vocabulary and comprehension questions
- **Listening Practice**: Text-to-speech with adjustable speed and dictation exercises
- **Vocabulary Building**: Spaced repetition system with contextual examples
- **AI Conversation Partner**: Natural dialogue practice with corrections and feedback
- **Progress Dashboard**: Track your learning journey with detailed analytics

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript, Tailwind CSS
- **State Management**: Zustand
- **Database**: Supabase (PostgreSQL)
- **AI Services**: OpenAI (TTS, Whisper), Anthropic Claude (conversation, content)
- **Visualizations**: Recharts

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.example .env
```

Fill in your API keys:
- Get Supabase credentials from [supabase.com](https://supabase.com)
- Get OpenAI API key from [platform.openai.com](https://platform.openai.com)
- Get Anthropic API key from [console.anthropic.com](https://console.anthropic.com)

3. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

## Database Setup

Run the SQL migrations in `/lib/database/schema.sql` in your Supabase SQL editor.

## Project Structure

```
/app               - Next.js App Router pages and API routes
/components        - React components
/lib               - Utility functions and services
/hooks             - Custom React hooks
/utils             - Helper functions
```

## Learning Approach

This app targets B2-C1 level French learners who have a strong foundation but haven't practiced in years. Content is generated to be sophisticated yet accessible, focusing on:

- Complex grammar structures (subjunctive, conditional, passive voice)
- Advanced vocabulary and idiomatic expressions
- Natural, engaging content on diverse topics
- Contextual learning with authentic usage examples

## License

MIT
