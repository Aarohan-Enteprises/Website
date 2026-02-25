interface GradientTextProps {
  children: React.ReactNode;
  variant?: 'default' | 'purple';
  className?: string;
}

export function GradientText({ children, variant = 'default', className = '' }: GradientTextProps) {
  return (
    <span className={`${variant === 'purple' ? 'gradient-text-purple' : 'gradient-text'} ${className}`}>
      {children}
    </span>
  );
}
