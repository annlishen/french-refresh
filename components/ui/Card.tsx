interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: boolean;
}

export default function Card({ 
  children, 
  className = '', 
  padding = true 
}: CardProps) {
  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-md ${padding ? 'p-6' : ''} ${className}`}>
      {children}
    </div>
  );
}

export function CardHeader({ 
  children, 
  className = '' 
}: { 
  children: React.ReactNode; 
  className?: string;
}) {
  return (
    <div className={`border-b border-gray-200 dark:border-gray-700 pb-4 mb-4 ${className}`}>
      {children}
    </div>
  );
}

export function CardTitle({ 
  children, 
  className = '' 
}: { 
  children: React.ReactNode; 
  className?: string;
}) {
  return (
    <h2 className={`text-2xl font-bold text-gray-900 dark:text-white ${className}`}>
      {children}
    </h2>
  );
}

export function CardContent({ 
  children, 
  className = '' 
}: { 
  children: React.ReactNode; 
  className?: string;
}) {
  return (
    <div className={className}>
      {children}
    </div>
  );
}
