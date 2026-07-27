import Link from 'next/link';

import { useLocale } from './LocaleContext';

const LanguageSwitcher = ({ subPath }: { subPath?: string }) => {
  const locale = useLocale();
  const targetLocale = locale === 'en' ? 'ua' : 'en';
  const targetLabel = locale === 'en' ? 'UA' : 'EN';
  const targetHref = subPath
    ? `/${targetLocale}/${subPath}`
    : `/${targetLocale}/`;

  return (
    <Link
      href={targetHref}
      className="border-white/12 flex h-8 items-center rounded-full border bg-white/[0.04] px-3 font-mono text-xs font-semibold tracking-wider text-gray-400 transition-all duration-200 hover:border-neon-purple/40 hover:text-neon-purple-bright"
      aria-label={`Switch to ${targetLabel}`}
    >
      {targetLabel}
    </Link>
  );
};

export { LanguageSwitcher };
