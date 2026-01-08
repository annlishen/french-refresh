# Installation & Setup Checklist

Use this checklist to verify your French Refresh app is properly set up.

## ✅ Prerequisites

- [ ] Node.js 18+ installed (`node --version`)
- [ ] npm installed (`npm --version`)
- [ ] Git installed (optional, for version control)
- [ ] Text editor (VS Code, Cursor, etc.)

## ✅ Project Setup

- [ ] Cloned/downloaded the project
- [ ] Opened project folder in terminal
- [ ] Ran `npm install` successfully
- [ ] No errors during package installation

## ✅ Environment Variables

- [ ] Created `.env.local` file in root directory
- [ ] Added `NEXT_PUBLIC_SUPABASE_URL`
- [ ] Added `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- [ ] Added `OPENAI_API_KEY`
- [ ] Added `ANTHROPIC_API_KEY`
- [ ] All values are filled in (no placeholder text)

## ✅ Supabase Setup

- [ ] Created Supabase account at [supabase.com](https://supabase.com)
- [ ] Created a new project
- [ ] Copied project URL to `.env.local`
- [ ] Copied anon key to `.env.local`
- [ ] Opened SQL Editor in Supabase dashboard
- [ ] Ran all SQL from `lib/database/schema.sql`
- [ ] Verified tables were created (check Table Editor)
- [ ] Tables visible: `user_progress`, `vocabulary_cards`, `generated_content`, `conversations`

## ✅ OpenAI Setup

- [ ] Created OpenAI account at [platform.openai.com](https://platform.openai.com)
- [ ] Added billing information (required for API access)
- [ ] Created API key
- [ ] Copied API key to `.env.local`
- [ ] Set usage limits (recommended: $20/month)

## ✅ Anthropic Setup

- [ ] Created Anthropic account at [console.anthropic.com](https://console.anthropic.com)
- [ ] Added billing information
- [ ] Created API key
- [ ] Copied API key to `.env.local`
- [ ] Set usage limits (recommended: $30/month)

## ✅ Development Server

- [ ] Ran `npm run dev` in terminal
- [ ] Server started without errors
- [ ] Opened [http://localhost:3000](http://localhost:3000)
- [ ] Home page loads correctly
- [ ] Navigation bar visible
- [ ] All module cards visible (Reading, Listening, etc.)

## ✅ Feature Testing

### Reading Module
- [ ] Clicked "Reading" in navigation
- [ ] Page loads correctly
- [ ] Selected a topic or entered custom topic
- [ ] Clicked "Generate Article"
- [ ] Article generated successfully
- [ ] Questions appear below article
- [ ] "Show Answers" button works

### Vocabulary Module
- [ ] Clicked "Vocabulary" in navigation
- [ ] Page loads with mock cards
- [ ] "Show Answer" button reveals translation
- [ ] Quality rating buttons work
- [ ] "Add Card" tab works
- [ ] Can input new word and translation
- [ ] "Browse All" tab shows vocabulary list

### Listening Module
- [ ] Clicked "Listening" in navigation
- [ ] Selected a text to listen to
- [ ] Clicked "Generate Audio"
- [ ] Audio generates successfully (requires OpenAI key)
- [ ] Play/Pause controls work
- [ ] Speed controls work (0.75x, 1x, 1.25x)
- [ ] "Show Transcript" button works
- [ ] "Practice Dictation" mode works

### Conversation Module
- [ ] Clicked "Conversation" in navigation
- [ ] Selected a scenario
- [ ] Clicked "Start Conversation"
- [ ] AI responds with French greeting (requires Anthropic key)
- [ ] Can type and send messages
- [ ] AI responds to messages
- [ ] Messages display correctly in chat
- [ ] "New Conversation" button works

### Dashboard Module
- [ ] Clicked "Progress" in navigation
- [ ] Dashboard loads with mock statistics
- [ ] Metric cards display (Total Time, Streak, etc.)
- [ ] Activity breakdown shows charts
- [ ] Progress bars display correctly
- [ ] Achievement badges visible

## ✅ Mobile Responsiveness

- [ ] Opened Chrome DevTools (F12)
- [ ] Toggled device toolbar (Ctrl/Cmd + Shift + M)
- [ ] Tested on iPhone SE size (375px)
- [ ] Tested on iPad size (768px)
- [ ] All pages are readable and functional
- [ ] Navigation adapts to mobile
- [ ] Buttons are tappable
- [ ] Cards stack vertically on mobile

## ✅ Dark Mode

- [ ] Changed system to dark mode
- [ ] App updates to dark theme
- [ ] All text is readable
- [ ] Contrast is good
- [ ] No white flashes

## ⚠️ Common Issues & Solutions

### "Module not found" errors
**Solution**: Delete `node_modules` and `.next`, run `npm install` again

### API returns 401/403 errors
**Solution**: Check that API keys are correct in `.env.local`, restart dev server

### Database errors
**Solution**: Verify SQL schema was executed in Supabase, check RLS policies

### "Failed to generate content"
**Solution**: Check Anthropic API key, verify billing is set up, check console for errors

### "Failed to generate audio"
**Solution**: Check OpenAI API key, verify billing is set up, check API usage limits

### TypeScript errors
**Solution**: Run `npm run build` to see full errors, ensure all dependencies installed

### Port 3000 already in use
**Solution**: Kill process on port 3000 or run on different port: `npm run dev -- -p 3001`

## 🎉 Success!

If all items are checked, your French Refresh app is fully set up and ready to use!

## 📚 Next Steps

1. Read through `QUICKSTART.md` for usage tips
2. Explore each module
3. Try generating content with different topics
4. Practice vocabulary daily
5. Have a conversation in French!

## 🆘 Still Having Issues?

1. Check `DEPLOYMENT.md` for detailed troubleshooting
2. Review console logs in browser (F12 > Console)
3. Check terminal output for server errors
4. Verify all environment variables are set
5. Ensure you have internet connection for API calls

## 💰 Cost Check

Before going live, verify:
- [ ] Set usage limits on all API providers
- [ ] Monitor usage in provider dashboards
- [ ] Start with small limits and increase as needed
- [ ] OpenAI: Recommend $10-20/month limit
- [ ] Anthropic: Recommend $20-30/month limit

## 🚀 Ready for Deployment?

When ready to deploy to production:
1. Follow `DEPLOYMENT.md` guide
2. Use Vercel for easiest deployment
3. Set environment variables in Vercel dashboard
4. Deploy and share your learning app!

---

**Happy Learning! Bonne chance! 🇫🇷**
