import { NextRequest, NextResponse } from 'next/server';
import { getUserProgress } from '@/lib/database/client';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    const progress = await getUserProgress(userId);

    // Calculate statistics
    const stats = {
      totalMinutes: progress.reduce((sum, p) => sum + p.minutes_spent, 0),
      sessionCount: progress.length,
      byActivity: {
        reading: 0,
        listening: 0,
        vocabulary: 0,
        conversation: 0,
      },
      recentSessions: progress.slice(0, 10),
    };

    progress.forEach((p) => {
      if (stats.byActivity[p.activity_type as keyof typeof stats.byActivity] !== undefined) {
        stats.byActivity[p.activity_type as keyof typeof stats.byActivity] += p.minutes_spent;
      }
    });

    return NextResponse.json(stats);
  } catch (error) {
    console.error('Error fetching progress:', error);
    return NextResponse.json(
      { error: 'Failed to fetch progress' },
      { status: 500 }
    );
  }
}
