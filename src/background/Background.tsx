import type { ReactNode } from 'react';

type IBackgroundProps = {
  children: ReactNode;
  color: string;
  withGrid?: boolean;
  withGlow?: boolean;
};

const Background = ({
  children,
  color,
  withGrid = false,
  withGlow = false,
}: IBackgroundProps) => (
  <div className={`relative w-full overflow-hidden ${color}`}>
    {/* Ефект сітки */}
    {withGrid && (
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-50 dark:opacity-20"
        style={{
          backgroundImage:
            'linear-gradient(to right, #8080801a 1px, transparent 1px), linear-gradient(to bottom, #8080801a 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />
    )}

    {/* Ефект розмитих кольорових плям (Glow) - зміщені до центру */}
    {withGlow && (
      <>
        {/* Пляма зліва від центру */}
        <div className="pointer-events-none absolute left-1/3 top-1/2 z-0 size-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary-500/10 blur-[120px] dark:bg-primary-500/20" />

        {/* Пляма справа від центру */}
        <div className="pointer-events-none absolute right-1/4 top-1/2 z-0 size-[400px] -translate-y-1/3 translate-x-1/2 rounded-full bg-primary-700/10 blur-[100px] dark:bg-primary-600/20" />
      </>
    )}

    {/* Основний контент */}
    <div className="relative z-10">{children}</div>
  </div>
);

export { Background };
