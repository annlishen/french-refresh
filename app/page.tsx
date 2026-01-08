import Link from "next/link";
import { BookOpen, Headphones, MessageCircle, BarChart3, BookMarked } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16">
        <header className="text-center mb-16">
          <h1 className="text-5xl font-bold text-blue-900 dark:text-blue-100 mb-4">
            Bienvenue! 🇫🇷
          </h1>
          <p className="text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
            Refresh your French language skills with AI-powered learning designed for advanced learners
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-16">
          <ModuleCard
            href="/reading"
            icon={<BookOpen className="w-8 h-8" />}
            title="Reading"
            description="AI-generated articles with comprehension questions and interactive vocabulary"
            color="bg-blue-500"
          />
          
          <ModuleCard
            href="/listening"
            icon={<Headphones className="w-8 h-8" />}
            title="Listening"
            description="Practice with natural French audio at adjustable speeds"
            color="bg-purple-500"
          />
          
          <ModuleCard
            href="/vocabulary"
            icon={<BookMarked className="w-8 h-8" />}
            title="Vocabulary"
            description="Spaced repetition flashcards with contextual examples"
            color="bg-green-500"
          />
          
          <ModuleCard
            href="/conversation"
            icon={<MessageCircle className="w-8 h-8" />}
            title="Conversation"
            description="Chat with an AI partner that corrects and encourages"
            color="bg-orange-500"
          />
          
          <ModuleCard
            href="/dashboard"
            icon={<BarChart3 className="w-8 h-8" />}
            title="Progress"
            description="Track your learning journey and celebrate milestones"
            color="bg-pink-500"
          />
        </div>

        <div className="text-center text-gray-600 dark:text-gray-400">
          <p className="mb-2">Targeting B2-C1 level French learners</p>
          <p className="text-sm">Built for those returning to French after years away</p>
        </div>
      </div>
    </div>
  );
}

function ModuleCard({ 
  href, 
  icon, 
  title, 
  description, 
  color 
}: { 
  href: string; 
  icon: React.ReactNode; 
  title: string; 
  description: string; 
  color: string;
}) {
  return (
    <Link href={href} className="group">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
        <div className={`${color} w-16 h-16 rounded-lg flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform`}>
          {icon}
        </div>
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
          {title}
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          {description}
        </p>
      </div>
    </Link>
  );
}
