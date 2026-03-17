import Image from 'next/image';

import { AppConfig } from '../utils/AppConfig';

type ILogoProps = {
  xl?: boolean;
};

const Logo = (props: ILogoProps) => {
  // Задаємо розмір у числах для компонента Image
  const size = props.xl ? 44 : 32;
  const fontStyle = props.xl
    ? 'font-semibold text-3xl'
    : 'font-semibold text-xl';

  return (
    <span
      className={`inline-flex items-center text-gray-900 dark:text-white ${fontStyle}`}
    >
      {/* Логотип для світлої теми (tslight.png) */}
      <Image
        src="/tslight.png"
        alt={`${AppConfig.site_name} Logo Light`}
        width={size}
        height={size}
        className="mr-2 block dark:hidden"
      />

      {/* Логотип для темної теми (ts.png) */}
      <Image
        src="/ts.png"
        alt={`${AppConfig.site_name} Logo Dark`}
        width={size}
        height={size}
        className="mr-2 hidden dark:block"
      />

      {AppConfig.site_name}
    </span>
  );
};

export { Logo };
