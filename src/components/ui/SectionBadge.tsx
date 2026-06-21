import { type LucideIcon } from 'lucide-react';

interface SectionBadgeProps {
  icon?: LucideIcon;
  text: string;
  /** Optional running number for true sequences, e.g. "01". */
  index?: string;
}

// Editorial eyebrow: a mono kicker, optionally prefixed by a section number,
// sitting above a hairline. Replaces the old pill badge.
export function SectionBadge({ icon: Icon, text, index }: SectionBadgeProps) {
  return (
    <span className="eyebrow inline-flex items-center gap-2">
      {index && <span className="text-ink-faint">{index}</span>}
      {Icon && <Icon size={13} strokeWidth={2} />}
      <span>{text}</span>
    </span>
  );
}
