import Image from 'next/image';

import { AppConfig } from '../utils/AppConfig';

type ILogoProps = {
  xl?: boolean;
};

const Logo = (props: ILogoProps) => {
  const size = props.xl ? 44 : 32;
  const fontStyle = props.xl
    ? 'font-semibold text-xl tracking-tight'
    : 'font-semibold text-base tracking-tight';

  return (
    <span className={`inline-flex items-center text-white ${fontStyle}`}>
      {/* Light theme logo */}
      <Image
        src="/tslight.png"
        alt={`${AppConfig.site_name} Logo`}
        width={size}
        height={size}
        className="mr-2 block dark:hidden"
      />

      {/* Dark theme logo */}
      <Image
        src="/ts.png"
        alt={`${AppConfig.site_name} Logo`}
        width={size}
        height={size}
        className="mr-2 hidden dark:block"
      />

      {AppConfig.site_name}
    </span>
  );
};

export { Logo };
