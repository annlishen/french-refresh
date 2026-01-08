'use client';

import { useState, useEffect } from 'react';
import Card, { CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { BarChart3, Clock, Award, TrendingUp, BookOpen, Headphones, MessageCircle, BookMarked } from 'lucide-react';

// Mock user ID - in a real app, this would come from authentication
const MOCK_USER_ID = 'demo-user';

interface Stats {
  totalMinutes: number;
  sessionCount: number;
  byActivity: {
    reading: number;
    listening: number;
    vocabulary: number;
    conversation: number;
  };
  streak: number;
  vocabularyCount: number;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats>({
    totalMinutes: 0,
    sessionCount: 0,
    byActivity: {
      reading: 0,
      listening: 0,
      vocabulary: 0,
      conversation: 0,
    },
    streak: 0,
    vocabularyCount: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    setLoading(true);
    try {
      // In a real app, this would fetch from the API
      // For demo purposes, we'll use mock data
      const mockStats: Stats = {
        totalMinutes: 247,
        sessionCount: 18,
        byActivity: {
          reading: 95,
          listening: 62,
          vocabulary: 48,
          conversation: 42,
        },
        streak: 7,
        vocabularyCount: 84,
      };
      setStats(mockStats);
    } catch (error) {
      console.error('Error loading stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins}m`;
  };

  const getActivityColor = (activity: string): string => {
    const colors: Record<string, string> = {
      reading: 'bg-blue-500',
      listening: 'bg-purple-500',
      vocabulary: 'bg-green-500',
      conversation: 'bg-orange-500',
    };
    return colors[activity] || 'bg-gray-500';
  };

  const getActivityIcon = (activity: string): JSX.Element => {
    const icons: Record<string, JSX.Element> = {
      reading: <BookOpen className="w-5 h-5" />,
      listening: <Headphones className="w-5 h-5" />,
      vocabulary: <BookMarked className="w-5 h-5" />,
      conversation: <MessageCircle className="w-5 h-5" />,
    };
    return icons[activity] || <BarChart3 className="w-5 h-5" />;
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <LoadingSpinner />
      </div>
    );
  }

  const totalActivityMinutes = Object.values(stats.byActivity).reduce((sum, val) => sum + val, 0);

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
          Progress Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Track your French learning journey and celebrate your achievements
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricCard
          icon={<Clock className="w-8 h-8" />}
          title="Total Time"
          value={formatTime(stats.totalMinutes)}
          subtitle={`${stats.sessionCount} sessions`}
          color="bg-blue-500"
        />
        
        <MetricCard
          icon={<TrendingUp className="w-8 h-8" />}
          title="Current Streak"
          value={`${stats.streak} days`}
          subtitle="Keep it up!"
          color="bg-green-500"
        />
        
        <MetricCard
          icon={<BookMarked className="w-8 h-8" />}
          title="Vocabulary"
          value={`${stats.vocabularyCount}`}
          subtitle="words learned"
          color="bg-purple-500"
        />
        
        <MetricCard
          icon={<Award className="w-8 h-8" />}
          title="Level"
          value="B2-C1"
          subtitle="Advanced"
          color="bg-orange-500"
        />
      </div>

      {/* Activity Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Time by Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(stats.byActivity).map(([activity, minutes]) => {
                const percentage = totalActivityMinutes > 0 
                  ? Math.round((minutes / totalActivityMinutes) * 100) 
                  : 0;
                
                return (
                  <div key={activity}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className={`${getActivityColor(activity)} p-2 rounded-lg text-white`}>
                          {getActivityIcon(activity)}
                        </div>
                        <span className="text-gray-900 dark:text-white font-medium capitalize">
                          {activity}
                        </span>
                      </div>
                      <div className="text-right">
                        <div className="text-gray-900 dark:text-white font-semibold">
                          {formatTime(minutes)}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {percentage}%
                        </div>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className={`${getActivityColor(activity)} h-2 rounded-full transition-all duration-300`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Weekly Goals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <GoalProgress
                label="Weekly Practice Time"
                current={247}
                target={300}
                unit="minutes"
              />
              
              <GoalProgress
                label="Daily Streak"
                current={7}
                target={30}
                unit="days"
              />
              
              <GoalProgress
                label="New Vocabulary"
                current={84}
                target={100}
                unit="words"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Achievements */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Achievements</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <AchievementBadge
              emoji="🔥"
              title="Week Streak"
              description="7 days of consistent practice"
              unlocked={true}
            />
            
            <AchievementBadge
              emoji="📚"
              title="Vocabulary Master"
              description="Learned 50+ new words"
              unlocked={true}
            />
            
            <AchievementBadge
              emoji="🎯"
              title="Dedicated Learner"
              description="Complete 100 minutes of practice"
              unlocked={true}
            />
            
            <AchievementBadge
              emoji="💬"
              title="Conversationalist"
              description="Complete 10 conversations"
              unlocked={false}
            />
            
            <AchievementBadge
              emoji="👂"
              title="Listening Pro"
              description="Complete 50 listening exercises"
              unlocked={false}
            />
            
            <AchievementBadge
              emoji="🏆"
              title="Month Champion"
              description="Maintain 30-day streak"
              unlocked={false}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function MetricCard({
  icon,
  title,
  value,
  subtitle,
  color,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  subtitle: string;
  color: string;
}) {
  return (
    <Card>
      <CardContent className="flex items-center gap-4">
        <div className={`${color} p-3 rounded-lg text-white`}>
          {icon}
        </div>
        <div>
          <p className="text-sm text-gray-600 dark:text-gray-400">{title}</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">{subtitle}</p>
        </div>
      </CardContent>
    </Card>
  );
}

function GoalProgress({
  label,
  current,
  target,
  unit,
}: {
  label: string;
  current: number;
  target: number;
  unit: string;
}) {
  const percentage = Math.min(Math.round((current / target) * 100), 100);
  
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className="text-gray-900 dark:text-white font-medium">{label}</span>
        <span className="text-sm text-gray-600 dark:text-gray-400">
          {current} / {target} {unit}
        </span>
      </div>
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
        <div
          className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
        {percentage}% complete
      </p>
    </div>
  );
}

function AchievementBadge({
  emoji,
  title,
  description,
  unlocked,
}: {
  emoji: string;
  title: string;
  description: string;
  unlocked: boolean;
}) {
  return (
    <div
      className={`p-4 border rounded-lg text-center transition-all ${
        unlocked
          ? 'bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border-yellow-300 dark:border-yellow-700'
          : 'bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700 opacity-50'
      }`}
    >
      <div className="text-4xl mb-2">{emoji}</div>
      <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{title}</h3>
      <p className="text-xs text-gray-600 dark:text-gray-400">{description}</p>
      {unlocked && (
        <div className="mt-2">
          <span className="text-xs px-2 py-1 bg-yellow-500 text-white rounded-full">
            Unlocked!
          </span>
        </div>
      )}
    </div>
  );
}
