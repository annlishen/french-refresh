# French Language Refresh App - Quick Start Guide

## What You've Built

A comprehensive AI-powered French language learning application with:

✅ **Reading Module** - AI-generated articles with comprehension questions
✅ **Listening Practice** - Text-to-speech with adjustable speeds
✅ **Vocabulary System** - Spaced repetition flashcards
✅ **Conversation Partner** - AI chat with natural French dialogue
✅ **Progress Dashboard** - Track learning analytics and achievements

## Next Steps to Get Started

### 1. Install Node.js (if not already installed)

Download from [nodejs.org](https://nodejs.org) - version 18 or higher

### 2. Install Dependencies

Open Terminal in this folder and run:
```bash
npm install
```

### 3. Get Your API Keys

You'll need three sets of API keys (all have free tiers):

#### a) Supabase (Database & Auth)
1. Go to [supabase.com](https://supabase.com)
2. Create a free account
3. Create a new project
4. Go to Project Settings > API
5. Copy your Project URL and anon/public key

#### b) OpenAI (Text-to-Speech & Speech Recognition)
1. Go to [platform.openai.com](https://platform.openai.com)
2. Create an account
3. Go to API Keys section
4. Create a new API key

#### c) Anthropic (AI Conversation & Content)
1. Go to [console.anthropic.com](https://console.anthropic.com)
2. Create an account
3. Go to API Keys
4. Create a new API key

### 4. Set Up Environment Variables

Create a file named `.env.local` in this folder with:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
OPENAI_API_KEY=your_openai_key_here
ANTHROPIC_API_KEY=your_anthropic_key_here
```

### 5. Set Up Database

1. Open your Supabase project dashboard
2. Go to the SQL Editor
3. Open the file `lib/database/schema.sql` from this project
4. Copy all the SQL code
5. Paste it in the Supabase SQL Editor
6. Click "Run" to create all tables

### 6. Start the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser!

## Understanding the Code Structure

```
/app                    # All pages and API routes
  /page.tsx            # Home page
  /reading             # Reading comprehension module
  /listening           # Listening practice module
  /vocabulary          # Flashcard system
  /conversation        # AI chat interface
  /dashboard           # Progress tracking
  /api                 # Backend API endpoints
    /generate-content  # AI content generation
    /conversation      # Chat responses
    /tts              # Text-to-speech
    /vocabulary       # Vocabulary management

/components            # Reusable UI components
  /ui                 # Button, Card, Navigation, etc.

/lib                  # Core business logic
  /ai                # AI service integrations
  /database          # Database operations
  /spaced-repetition # Learning algorithm
  /types            # TypeScript definitions
```

## Features Explained

### Reading Module
- Generates French articles on various topics using Claude AI
- Provides comprehension questions
- Extracts key vocabulary
- Text-to-speech for listening while reading

### Listening Module
- Uses OpenAI's TTS to convert text to natural French audio
- Adjustable playback speeds (0.75x, 1x, 1.25x)
- Dictation practice mode
- Show/hide transcripts

### Vocabulary System
- Implements SuperMemo SM-2 spaced repetition algorithm
- Tracks card difficulty and review intervals
- Optimizes learning based on your performance
- Contextual examples for each word

### Conversation Partner
- Natural dialogue with Claude AI at B2-C1 level
- Multiple scenarios (casual, restaurant, travel, business, etc.)
- Gentle corrections embedded in responses
- Conversation history tracking

### Progress Dashboard
- Time tracking by activity
- Daily streak counter
- Vocabulary growth metrics
- Achievement badges
- Weekly goals

## Demo Mode

The app currently uses mock data for demonstration purposes. To connect to real data:

1. Complete the Supabase setup (step 5 above)
2. Replace the `MOCK_USER_ID` constants with real authentication
3. The API endpoints are ready but need authentication implementation

## Customization Ideas

- Add more content topics in the reading module
- Customize the spaced repetition intervals
- Add new conversation scenarios
- Change the UI colors in `tailwind.config.ts`
- Add more achievement badges
- Integrate real French news APIs

## Deployment

When ready to deploy:

1. Push your code to GitHub
2. Import to [Vercel](https://vercel.com) (free for hobby projects)
3. Add your environment variables in Vercel dashboard
4. Deploy with one click!

See `DEPLOYMENT.md` for detailed deployment instructions.

## Learning Strategy (As Planned)

This app is designed for the language refresh use case:

**Target User**: Former French major who lived in Bordeaux, rusty after 20 years
**Level**: B2-C1 (intermediate-advanced)
**Goal**: Refresh to former fluency

**Recommended Daily Routine**:
1. **Morning (10 min)**: Vocabulary review - cards due today
2. **Midday (15 min)**: Reading - one article with comprehension questions
3. **Afternoon (10 min)**: Listening - practice with audio at different speeds
4. **Evening (15 min)**: Conversation - 10-minute dialogue practice

**Weekly Goal**: 20+ minutes per day, consistent daily streaks

## Troubleshooting

**"Module not found" errors**: Run `npm install` again

**API errors**: Check that all API keys are correctly set in `.env.local`

**Database errors**: Verify the SQL schema was executed in Supabase

**Build errors**: Delete `node_modules` and `.next`, then `npm install`

## Cost Estimates (Monthly)

- **Supabase**: Free tier (plenty for personal use)
- **OpenAI**: ~$5-10 (TTS is inexpensive)
- **Anthropic**: ~$10-20 (depends on conversation volume)
- **Vercel Hosting**: Free

**Total**: ~$15-30/month for moderate use

## Support & Contributing

See `CONTRIBUTING.md` for guidelines on:
- Adding new features
- Reporting bugs
- Code style
- Pull request process

## License

MIT - Feel free to use and modify for your own language learning!

---

**Bon courage et bonne chance avec votre français! 🇫🇷**
