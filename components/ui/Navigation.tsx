import Link from 'next/link';
import { Home, BookOpen, Headphones, MessageCircle, BarChart3, BookMarked } from 'lucide-react';

export default function Navigation() {
  return (
    <nav className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              French Refresh
            </span>
          </Link>
          
          <div className="flex items-center space-x-1 md:space-x-2">
            <NavLink href="/" icon={<Home className="w-5 h-5" />} label="Home" />
            <NavLink href="/reading" icon={<BookOpen className="w-5 h-5" />} label="Reading" />
            <NavLink href="/listening" icon={<Headphones className="w-5 h-5" />} label="Listening" />
            <NavLink href="/vocabulary" icon={<BookMarked className="w-5 h-5" />} label="Vocabulary" />
            <NavLink href="/conversation" icon={<MessageCircle className="w-5 h-5" />} label="Conversation" />
            <NavLink href="/dashboard" icon={<BarChart3 className="w-5 h-5" />} label="Progress" />
          </div>
        </div>
      </div>
    </nav>
  );
}

function NavLink({ 
  href, 
  icon, 
  label 
}: { 
  href: string; 
  icon: React.ReactNode; 
  label: string;
}) {
  return (
    <Link
      href={href}
      className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
    >
      {icon}
      <span className="hidden md:inline">{label}</span>
    </Link>
  );
}
