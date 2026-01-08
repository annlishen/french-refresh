import { NextRequest, NextResponse } from 'next/server';
import { generateReadingContent } from '@/lib/ai/claude';
import { saveGeneratedContent } from '@/lib/database/client';

export async function POST(request: NextRequest) {
  try {
    const { topic, level } = await request.json();

    if (!topic) {
      return NextResponse.json(
        { error: 'Topic is required' },
        { status: 400 }
      );
    }

    // Generate content using Claude
    const content = await generateReadingContent(topic, level || 'B2');

    // Save to database for caching
    try {
      await saveGeneratedContent(
        'article',
        level || 'B2',
        content.title,
        content.body,
        { questions: content.questions, topic }
      );
    } catch (dbError) {
      console.error('Failed to cache content:', dbError);
      // Continue even if caching fails
    }

    return NextResponse.json(content);
  } catch (error) {
    console.error('Error generating content:', error);
    return NextResponse.json(
      { error: 'Failed to generate content' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const contentType = searchParams.get('type') || 'article';
    
    // This would retrieve cached content from database
    // For now, return error to force generation
    return NextResponse.json(
      { error: 'Use POST to generate new content' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Error fetching content:', error);
    return NextResponse.json(
      { error: 'Failed to fetch content' },
      { status: 500 }
    );
  }
}
