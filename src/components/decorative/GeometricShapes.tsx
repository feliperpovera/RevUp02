export const CirclesDecor = ({ className = "" }: { className?: string }) => {
  return (
    <svg
      viewBox="0 0 120 80"
      className={`w-32 md:w-40 lg:w-48 h-auto ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="30" cy="40" r="28" stroke="hsl(var(--accent))" strokeWidth="2" opacity="0.6" />
      <circle cx="60" cy="40" r="28" stroke="hsl(var(--accent))" strokeWidth="2" opacity="0.6" />
      <circle cx="90" cy="40" r="28" stroke="hsl(var(--accent))" strokeWidth="2" opacity="0.6" />
    </svg>
  );
};

export const AngularLinesDecor = ({ className = "" }: { className?: string }) => {
  return (
    <svg
      viewBox="0 0 100 100"
      className={`w-32 md:w-40 lg:w-48 h-auto ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <line x1="20" y1="20" x2="20" y2="80" stroke="hsl(var(--accent))" strokeWidth="2" opacity="0.6" />
      <line x1="20" y1="80" x2="80" y2="80" stroke="hsl(var(--accent))" strokeWidth="2" opacity="0.6" />
      <line x1="30" y1="30" x2="70" y2="70" stroke="hsl(var(--accent))" strokeWidth="2" opacity="0.6" />
    </svg>
  );
};

export const AsteriskDecor = ({ className = "" }: { className?: string }) => {
  return (
    <svg
      viewBox="0 0 100 100"
      className={`w-28 md:w-36 lg:w-44 h-auto ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <line x1="50" y1="15" x2="50" y2="85" stroke="hsl(var(--accent))" strokeWidth="2" opacity="0.6" />
      <line x1="15" y1="50" x2="85" y2="50" stroke="hsl(var(--accent))" strokeWidth="2" opacity="0.6" />
      <line x1="25" y1="25" x2="75" y2="75" stroke="hsl(var(--accent))" strokeWidth="2" opacity="0.6" />
      <line x1="75" y1="25" x2="25" y2="75" stroke="hsl(var(--accent))" strokeWidth="2" opacity="0.6" />
    </svg>
  );
};

export const RectangleCircleDecor = ({ className = "" }: { className?: string }) => {
  return (
    <svg
      viewBox="0 0 100 100"
      className={`w-32 md:w-40 lg:w-48 h-auto ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="20" y="20" width="60" height="60" stroke="hsl(var(--accent))" strokeWidth="2" opacity="0.6" />
      <circle cx="75" cy="25" r="15" stroke="hsl(var(--accent))" strokeWidth="2" opacity="0.6" />
    </svg>
  );
};
