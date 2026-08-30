import type { ReactNode } from 'react';

type IButtonProps = {
  xl?: boolean;
  children: ReactNode;
  outline?: boolean;
};

const Button = (props: IButtonProps) => {
  if (props.outline) {
    return (
      <div
        className={`hover:bg-black/8 inline-flex cursor-pointer items-center justify-center rounded-full border border-black/15 bg-black/5 font-semibold text-foreground backdrop-blur-sm transition-all duration-300 hover:border-black/25 dark:border-white/20 dark:bg-white/5 dark:text-white dark:hover:border-white/40 dark:hover:bg-white/10 ${
          props.xl ? 'px-8 py-4 text-xl' : 'px-6 py-3 text-base'
        }`}
      >
        {props.children}
      </div>
    );
  }

  return (
    <div
      className={`glow-purple-hover inline-flex cursor-pointer items-center justify-center rounded-full bg-gradient-to-r from-neon-purple to-neon-blue font-semibold !text-white shadow-neon-purple transition-all duration-300 hover:-translate-y-0.5 hover:shadow-neon-purple-lg ${
        props.xl ? 'px-8 py-4 text-xl' : 'px-6 py-3 text-base'
      }`}
    >
      {props.children}
    </div>
  );
};

export { Button };
