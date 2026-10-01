import { AppConfig } from '../utils/AppConfig';

type LogoProps = { size?: number };

/* Monogram artwork swaps with the theme (black glyph on paper, white on
 * graphite); the blue dot is identical in both files. */
const Logo = ({ size = 30 }: LogoProps) => (
  <span className="inline-flex items-center gap-2.5 text-[1.0625rem] font-medium tracking-[-0.02em] text-ink">
    <img
      src="/tslight.png"
      alt=""
      width={size}
      height={size}
      className="block dark:hidden"
    />
    <img
      src="/ts.png"
      alt=""
      width={size}
      height={size}
      className="hidden dark:block"
    />
    <span translate="no">{AppConfig.site_name}</span>
  </span>
);

export { Logo };
