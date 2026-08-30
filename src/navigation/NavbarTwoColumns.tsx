import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { useEffect, useRef, useState } from 'react';

export type NavItem = {
  label: string;
  href: string;
  icon: ReactNode;
  isButton?: boolean;
};

type INavbarProps = {
  logo: ReactNode;
  navItems?: NavItem[];
  children?: ReactNode;
  themeToggle?: ReactNode;
  langSwitcher?: ReactNode;
};

type NavItemContentProps = {
  item: NavItem;
  isScrolled: boolean;
  reduced: boolean;
};

// Crossfades between the icon (compact pill) and label (full-width bar)
// instead of hard-swapping DOM content mid-layout-animation, which is what
// made the transition look glitchy.
const NavItemContent = ({ item, isScrolled, reduced }: NavItemContentProps) => {
  const fade = reduced
    ? { duration: 0 }
    : { duration: 0.2, ease: [0.16, 1, 0.3, 1] as const };
  const initial = reduced ? false : { opacity: 0 };
  const exit = reduced ? undefined : { opacity: 0 };

  let content: ReactNode;
  if (isScrolled) {
    content = (
      <motion.span
        key="icon"
        initial={reduced ? false : { opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={reduced ? undefined : { opacity: 0, scale: 0.6 }}
        transition={fade}
        className="flex size-11 items-center justify-center [&>svg]:size-7"
      >
        {item.icon}
      </motion.span>
    );
  } else if (item.isButton) {
    content = (
      <motion.span
        key="button"
        initial={initial}
        animate={{ opacity: 1 }}
        exit={exit}
        transition={fade}
        className="inline-flex cursor-pointer items-center justify-center rounded-full border border-black/15 bg-black/5 px-6 py-2.5 font-semibold text-foreground backdrop-blur-sm transition-all duration-300 hover:border-black/25 dark:border-white/20 dark:bg-white/5 dark:text-white dark:hover:border-white/40 dark:hover:bg-white/10"
      >
        {item.label}
      </motion.span>
    );
  } else {
    content = (
      <motion.span
        key="label"
        initial={initial}
        animate={{ opacity: 1 }}
        exit={exit}
        transition={fade}
      >
        {item.label}
      </motion.span>
    );
  }

  return (
    <AnimatePresence mode="popLayout" initial={false}>
      {content}
    </AnimatePresence>
  );
};

const NavbarTwoColumns = ({
  logo,
  navItems,
  children,
  themeToggle,
  langSwitcher,
}: INavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const tickingRef = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (tickingRef.current) return;
      tickingRef.current = true;
      requestAnimationFrame(() => {
        setIsScrolled(window.scrollY > 50);
        tickingRef.current = false;
      });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const pillTransition = prefersReducedMotion
    ? { duration: 0 }
    : { type: 'spring' as const, bounce: 0, duration: 0.6 };

  return (
    <>
      <div
        className={`pointer-events-none fixed inset-x-0 top-0 z-[100] flex transition-transform duration-500 ${
          isScrolled ? 'justify-center pt-4' : 'justify-center'
        }`}
      >
        <motion.div
          layout
          transition={pillTransition}
          className={`pointer-events-auto flex items-center justify-between transition-colors duration-500 ${
            isScrolled
              ? // No backdrop-blur here on purpose: this pill is `position: fixed`,
                // and backdrop-filter on a fixed element forces Safari/macOS to
                // repaint the blurred region on every scroll frame. A solid,
                // near-opaque background reads the same without the repaint cost.
                'rounded-full border border-white/10 bg-kosmos-900/90 px-8 py-3.5 shadow-[0_8px_32px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.1)]'
              : 'glass-panel border-white/6 w-full border-b px-6 py-4'
          }`}
          style={{
            borderRadius: isScrolled ? '9999px' : '0px',
          }}
        >
          <motion.div
            layout
            transition={pillTransition}
            className={`flex items-center ${isScrolled ? 'md:mr-12' : ''}`}
          >
            <Link href="/">{logo}</Link>
          </motion.div>

          {navItems ? (
            <nav className="hidden md:block">
              <motion.ul
                layout
                transition={pillTransition}
                className={`flex items-center font-medium ${isScrolled ? 'gap-10' : 'gap-6 text-sm'}`}
              >
                {navItems.map((item) => (
                  <motion.li layout transition={pillTransition} key={item.href}>
                    <Link
                      href={item.href}
                      aria-label={item.label}
                      className="flex items-center text-gray-400 transition-colors duration-200 hover:text-white"
                    >
                      <NavItemContent
                        item={item}
                        isScrolled={isScrolled}
                        reduced={!!prefersReducedMotion}
                      />
                    </Link>
                  </motion.li>
                ))}
              </motion.ul>
            </nav>
          ) : (
            children && <nav>{children}</nav>
          )}

          <div className="flex items-center gap-2">
            {langSwitcher}
            <AnimatePresence initial={false}>
              {!isScrolled && themeToggle && (
                <motion.div
                  key="theme-toggle"
                  initial={prefersReducedMotion ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={prefersReducedMotion ? undefined : { opacity: 0 }}
                  transition={
                    prefersReducedMotion ? { duration: 0 } : { duration: 0.2 }
                  }
                >
                  {themeToggle}
                </motion.div>
              )}
            </AnimatePresence>

            {navItems && (
              <button
                type="button"
                aria-label={isMobileOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={isMobileOpen}
                onClick={() => setIsMobileOpen((v) => !v)}
                className="flex size-11 items-center justify-center rounded-full text-gray-400 transition-colors hover:text-white md:hidden"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  {isMobileOpen ? (
                    <>
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </>
                  ) : (
                    <>
                      <line x1="3" y1="6" x2="21" y2="6" />
                      <line x1="3" y1="12" x2="21" y2="12" />
                      <line x1="3" y1="18" x2="21" y2="18" />
                    </>
                  )}
                </svg>
              </button>
            )}
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {isMobileOpen && navItems && (
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={prefersReducedMotion ? undefined : { opacity: 0, y: -8 }}
            transition={
              prefersReducedMotion ? { duration: 0 } : { duration: 0.2 }
            }
            className="fixed inset-x-0 top-0 z-[99] flex min-h-dvh flex-col bg-kosmos-950 px-6 pb-8 pt-24 md:hidden"
          >
            <nav>
              <ul className="flex flex-col gap-1">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-label={item.label}
                      onClick={() => setIsMobileOpen(false)}
                      className={`flex min-h-[56px] items-center gap-4 rounded-2xl px-4 text-lg font-medium text-gray-300 transition-colors hover:bg-white/5 hover:text-white ${
                        item.isButton
                          ? 'mt-4 justify-center bg-white/5 text-white'
                          : ''
                      }`}
                    >
                      <span className="[&>svg]:size-5">{item.icon}</span>
                      <span>{item.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export { NavbarTwoColumns };
