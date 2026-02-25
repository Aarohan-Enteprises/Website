interface GridBackgroundProps {
  opacity?: string;
}

export function GridBackground({ opacity = 'opacity-20' }: GridBackgroundProps) {
  return <div className={`absolute inset-0 grid-background ${opacity}`} />;
}
