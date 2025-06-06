interface AnimatedSectionProps {
    children: React.ReactNode;
    delay?: number;
    className?: string;
  }
  
  export function AnimatedSection({ children, delay = 0, className = '' }: AnimatedSectionProps) {
    return (
      <div 
        className={`animate-fade-in ${className}`}
        style={{ animationDelay: `${delay}ms` }}
      >
        {children}
      </div>
    );
  }