// Kept for backwards-compatible imports. The old blue→green gradient is gone;
// emphasis is now an italic pine serif phrase in the editorial voice.
interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
}

export function GradientText({ children, className = '' }: GradientTextProps) {
  return <span className={`accent-ink ${className}`}>{children}</span>;
}
