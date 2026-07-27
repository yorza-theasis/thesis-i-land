import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';

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
};

const NavItemContent = ({ item, isScrolled }: NavItemContentProps) => {
  if (isScrolled) {
    return (
      <span className="flex size-11 items-center justify-center [&>svg]:size-7">
        {item.icon}
      </span>
    );
  }
  if (item.isButton) {
    return (
      <span className="inline-flex cursor-pointer items-center justify-center rounded-full border border-black/15 bg-black/5 px-6 py-2.5 font-semibold text-foreground backdrop-blur-sm transition-all duration-300 hover:border-black/25 dark:border-white/20 dark:bg-white/5 dark:text-white dark:hover:border-white/40 dark:hover:bg-white/10">
        {item.label}
      </span>
    );
  }
  return <span>{item.label}</span>;
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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <div
        className={`pointer-events-none fixed inset-x-0 top-0 z-[100] flex transition-transform duration-500 ${
          isScrolled ? 'justify-center pt-4' : 'justify-center'
        }`}
      >
        <motion.div
          layout
          transition={{ type: 'spring', bounce: 0, duration: 0.6 }}
          className={`pointer-events-auto flex items-center justify-between transition-colors duration-500 ${
            isScrolled
              ? 'rounded-full border border-white/10 bg-kosmos-900/40 px-8 py-3.5 shadow-[0_8px_32px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.1)] backdrop-blur-xl'
              : 'glass-panel border-white/6 w-full border-b px-6 py-4'
          }`}
          style={{
            borderRadius: isScrolled ? '9999px' : '0px',
          }}
        >
          <motion.div
            layout
            className={`flex items-center ${isScrolled ? 'md:mr-12' : ''}`}
          >
            <Link href="/">{logo}</Link>
          </motion.div>

          {navItems ? (
            <nav className="hidden md:block">
              <motion.ul
                layout
                className={`flex items-center font-medium ${isScrolled ? 'gap-10' : 'gap-6 text-sm'}`}
              >
                {navItems.map((item) => (
                  <motion.li layout key={item.href}>
                    <Link
                      href={item.href}
                      aria-label={item.label}
                      className="flex items-center text-gray-400 transition-colors duration-200 hover:text-white"
                    >
                      <NavItemContent item={item} isScrolled={isScrolled} />
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
            {!isScrolled && themeToggle && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {themeToggle}
              </motion.div>
            )}

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
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-0 z-[99] flex min-h-dvh flex-col bg-kosmos-950/95 px-6 pb-8 pt-24 backdrop-blur-xl md:hidden"
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
