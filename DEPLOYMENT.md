# Deployment Guide

## Prerequisites

1. **Node.js 18+** installed on your system
2. **API Keys** from:
   - [Supabase](https://supabase.com) - for database and authentication
   - [OpenAI](https://platform.openai.com) - for TTS and Whisper
   - [Anthropic](https://console.anthropic.com) - for Claude AI

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env.local` file in the root directory:

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# OpenAI
OPENAI_API_KEY=your_openai_api_key

# Anthropic
ANTHROPIC_API_KEY=your_anthropic_api_key
```

### 3. Set Up Database

1. Create a new project on [Supabase](https://supabase.com)
2. Go to the SQL Editor in your Supabase dashboard
3. Copy and paste the contents of `/lib/database/schema.sql`
4. Execute the SQL to create all tables and functions

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

## Deployment Options

### Option 1: Vercel (Recommended)

Vercel is the easiest deployment option for Next.js applications.

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `OPENAI_API_KEY`
   - `ANTHROPIC_API_KEY`
4. Deploy!

### Option 2: Self-Hosted

Build the production version:

```bash
npm run build
npm start
```

The app will be available on port 3000.

### Option 3: Docker

Create a `Dockerfile`:

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

Build and run:

```bash
docker build -t french-refresh .
docker run -p 3000:3000 --env-file .env.local french-refresh
```

## Performance Optimization

The app is already optimized with:

- ✅ Server-side rendering for fast initial load
- ✅ Code splitting via Next.js dynamic imports
- ✅ Optimized images and assets
- ✅ Efficient API routes
- ✅ Client-side caching

## Mobile Responsiveness

All pages are fully responsive and tested on:
- Mobile phones (320px - 767px)
- Tablets (768px - 1023px)
- Desktops (1024px+)

The UI uses Tailwind's responsive utilities to adapt to all screen sizes.

## Monitoring and Analytics

Consider adding:

1. **Vercel Analytics** - for performance monitoring
2. **Sentry** - for error tracking
3. **Google Analytics** - for user insights

## Security Considerations

- ✅ API keys stored in environment variables
- ✅ Row Level Security (RLS) enabled in Supabase
- ✅ CORS configured properly
- ✅ Input validation on all API routes

## Troubleshooting

### API Key Issues

If AI features aren't working:
1. Verify API keys are correctly set in `.env.local`
2. Check API key permissions and billing status
3. Review console logs for specific errors

### Database Connection Issues

1. Verify Supabase URL and anon key
2. Check if SQL schema was executed correctly
3. Ensure RLS policies are properly configured

### Build Errors

If build fails:
1. Delete `node_modules` and `.next` folders
2. Run `npm install` again
3. Check for TypeScript errors with `npm run build`

## Production Checklist

Before deploying to production:

- [ ] All environment variables configured
- [ ] Database schema executed
- [ ] API keys have proper rate limits
- [ ] Test all features in production mode
- [ ] Set up monitoring and error tracking
- [ ] Configure custom domain (optional)
- [ ] Enable HTTPS
- [ ] Set up backup strategy for database

## Scaling Considerations

As your user base grows:

1. **Database**: Supabase scales automatically, but monitor query performance
2. **API Limits**: Consider implementing rate limiting for API routes
3. **Caching**: Add Redis for session management and content caching
4. **CDN**: Use Vercel's Edge Network or Cloudflare for static assets
5. **Background Jobs**: Consider using queue systems for long-running tasks

## Cost Estimation

Monthly costs (approximate):

- **Supabase Free Tier**: $0 (500MB database, 2GB bandwidth)
- **Supabase Pro**: $25/month (8GB database, 50GB bandwidth)
- **OpenAI API**: ~$5-20/month (depends on usage)
- **Anthropic API**: ~$10-30/month (depends on usage)
- **Vercel Hobby**: $0 (personal projects)
- **Vercel Pro**: $20/month (commercial projects)

**Total**: $0-95/month depending on tier and usage

## Support

For issues or questions:
1. Check the README.md for setup instructions
2. Review the code comments for implementation details
3. Consult Next.js, Supabase, OpenAI, and Anthropic documentation
