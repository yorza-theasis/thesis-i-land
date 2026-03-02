import type { ReactNode } from 'react';

type IHeroOneButtonProps = {
  title: ReactNode;
  description: string | ReactNode;
  button: ReactNode;
};

const HeroOneButton = (props: IHeroOneButtonProps) => (
  <header className="text-center">
    <h1 className="whitespace-pre-line text-5xl font-bold leading-hero text-gray-900 dark:text-white">
      {props.title}
    </h1>
    <p className="mb-16 mt-4 text-2xl">{props.description}</p>

    {props.button}
  </header>
);

export { HeroOneButton };
