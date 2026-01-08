# Contributing to French Refresh

Thank you for your interest in contributing! This document provides guidelines for contributing to the project.

## Development Setup

1. Fork the repository
2. Clone your fork: `git clone https://github.com/yourusername/french-refresh.git`
3. Install dependencies: `npm install`
4. Set up environment variables (see README.md)
5. Run development server: `npm run dev`

## Code Style

- Use TypeScript for all new files
- Follow the existing code formatting (ESLint + Prettier)
- Write meaningful commit messages
- Add comments for complex logic
- Keep components small and focused

## Project Structure

```
/app                # Next.js App Router pages and API routes
  /api              # API endpoints
  /[module]         # Feature pages (reading, listening, etc.)
/components         # Reusable React components
  /ui               # UI components (Button, Card, etc.)
  /[module]         # Feature-specific components
/lib                # Utility functions and services
  /ai               # AI service wrappers
  /database         # Database client and helpers
  /spaced-repetition # Learning algorithm
  /types            # TypeScript type definitions
/utils              # General utility functions
```

## Adding New Features

1. Create a new branch: `git checkout -b feature/your-feature-name`
2. Implement your feature following the existing patterns
3. Test thoroughly in development
4. Update documentation if needed
5. Submit a pull request

## Testing

Before submitting a PR:

1. Test all affected features manually
2. Check for TypeScript errors: `npm run build`
3. Verify responsive design on mobile/tablet/desktop
4. Test with actual API keys (not mocked data)

## Pull Request Process

1. Update the README.md or DEPLOYMENT.md if needed
2. Describe your changes clearly in the PR description
3. Link any related issues
4. Wait for review and address feedback

## Feature Ideas

Some areas that could use improvement:

- User authentication and profiles
- Real-time progress sync across devices
- More sophisticated vocabulary tracking
- Writing exercises with AI feedback
- Video content integration
- Community features (forums, leaderboards)
- Offline mode support
- More languages beyond French

## Bug Reports

When reporting bugs, please include:

- Steps to reproduce
- Expected behavior
- Actual behavior
- Browser/device information
- Console errors (if any)
- Screenshots (if helpful)

## Questions?

Feel free to open an issue for:
- Feature requests
- Bug reports
- Documentation improvements
- General questions

Thank you for contributing! 🇫🇷
