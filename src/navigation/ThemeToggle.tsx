import { Moon, Sun } from '@phosphor-icons/react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

import { useT } from '../i18n/LocaleContext';

const ThemeToggle = () => {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();
  const { common } = useT();

  useEffect(() => setMounted(true), []);

  // Same footprint before mount so the header never shifts on hydration.
  if (!mounted) return <span className="size-9" aria-hidden="true" />;

  const isDark = resolvedTheme !== 'light';

  return (
    <button
      type="button"
      aria-label={isDark ? common.theme.toLight : common.theme.toDark}
      title={isDark ? common.theme.toLight : common.theme.toDark}
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="flex size-9 items-center justify-center rounded-full text-muted transition-colors duration-300 hover:bg-line/[0.06] hover:text-ink active:scale-[0.96]"
    >
      {isDark ? (
        <Sun size={18} weight="regular" aria-hidden="true" />
      ) : (
        <Moon size={18} weight="regular" aria-hidden="true" />
      )}
    </button>
  );
};

export { ThemeToggle };
