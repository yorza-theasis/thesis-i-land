import type { ReactNode } from 'react';

type IHeroOneButtonProps = {
  title: ReactNode;
  description: string | ReactNode;
  button: ReactNode;
  badge?: ReactNode;
};

const HeroOneButton = (props: IHeroOneButtonProps) => (
  <header className="text-center">
    {props.badge && <div className="mb-8">{props.badge}</div>}

    <h1 className="whitespace-pre-line text-5xl font-bold leading-hero tracking-tightest text-white md:text-6xl md:leading-[5.5rem]">
      {props.title}
    </h1>

    <p className="mx-auto mb-12 mt-6 max-w-2xl text-xl leading-relaxed text-gray-400">
      {props.description}
    </p>

    {props.button}
  </header>
);

export { HeroOneButton };
