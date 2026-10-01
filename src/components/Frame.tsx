import type { ReactNode } from 'react';

type FrameProps = {
  children: ReactNode;
  className?: string;
  innerClassName?: string;
};

/* Double-bezel enclosure: a hairline tray holding an inset plate with its
 * own concentric radius, so media reads as a physical object on the page. */
const Frame = ({
  children,
  className = '',
  innerClassName = '',
}: FrameProps) => (
  <div
    className={`rounded-[1.75rem] bg-line/[0.035] p-1.5 ring-1 ring-line/[0.08] ${className}`}
  >
    <div
      className={`relative overflow-hidden rounded-[calc(1.75rem-0.375rem)] bg-surface shadow-[inset_0_1px_0_rgb(255_255_255/0.06)] ${innerClassName}`}
    >
      {children}
    </div>
  </div>
);

export { Frame };
