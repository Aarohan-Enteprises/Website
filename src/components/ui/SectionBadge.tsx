import { type LucideIcon } from 'lucide-react';

interface SectionBadgeProps {
  icon: LucideIcon;
  text: string;
  color?: string;
  borderColor?: string;
  bgColor?: string;
}

export function SectionBadge({
  icon: Icon,
  text,
  color = 'text-blue-400',
  borderColor = 'border-blue-600/20',
  bgColor = 'bg-blue-600/10',
}: SectionBadgeProps) {
  return (
    <div className={`inline-flex items-center gap-2 ${bgColor} border ${borderColor} rounded-full px-4 py-1.5 text-sm ${color}`}>
      <Icon size={14} />
      <span>{text}</span>
    </div>
  );
}
