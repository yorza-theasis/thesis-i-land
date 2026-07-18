'use client';

import { motion } from 'framer-motion';
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
  children?: ReactNode; // fallback for backwards compatibility if needed
  themeToggle?: ReactNode;
};

const NavbarTwoColumns = ({
  logo,
  navItems,
  children,
  themeToggle,
}: INavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
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
          className={`flex items-center ${isScrolled ? 'mr-12' : ''}`}
        >
          <Link href="/">{logo}</Link>
        </motion.div>

        <nav>
          <motion.ul
            layout
            className={`flex items-center font-medium ${isScrolled ? 'gap-10' : 'gap-6 text-sm'}`}
          >
            {navItems
              ? navItems.map((item, idx) => (
                  <motion.li layout key={idx}>
                    <Link
                      href={item.href}
                      className="flex items-center text-gray-400 transition-colors duration-200 hover:text-white"
                      title={item.label}
                    >
                      {(() => {
                        if (isScrolled) {
                          return (
                            <span className="flex items-center justify-center [&>svg]:size-7">
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
                      })()}
                    </Link>
                  </motion.li>
                ))
              : children}
          </motion.ul>
        </nav>

        {!isScrolled && themeToggle && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="ml-6"
          >
            {themeToggle}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export { NavbarTwoColumns };
