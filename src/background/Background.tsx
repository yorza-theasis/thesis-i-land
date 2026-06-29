import type { ReactNode } from 'react';

type IBackgroundProps = {
  children: ReactNode;
  color?: string;
  withGrid?: boolean;
  withGlow?: boolean;
};

const Background = ({
  children,
  color,
  withGrid = false,
  withGlow = false,
}: IBackgroundProps) => (
  <div
    className={`relative w-full overflow-hidden bg-kosmos-950 ${color ?? ''}`}
  >
    {/* Subtle grid pattern */}
    {withGrid && (
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />
    )}

    {/* Neon mesh gradient glows */}
    {withGlow && (
      <>
        <div className="pointer-events-none absolute left-[-10%] top-[-10%] z-0 size-[600px] rounded-full bg-neon-purple/10 blur-[120px]" />
        <div className="bg-neon-blue/8 pointer-events-none absolute bottom-[-10%] right-[-5%] z-0 size-[500px] rounded-full blur-[100px]" />
      </>
    )}

    {/* Main content */}
    <div className="relative z-10">{children}</div>
  </div>
);

export { Background };
