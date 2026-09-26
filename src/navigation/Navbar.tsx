import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from 'framer-motion';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { ButtonLink } from '../components/ButtonLink';
import { EASE, SPRING } from '../components/motion';
import { LanguageSwitcher } from '../i18n/LanguageSwitcher';
import { useBase, useT } from '../i18n/LocaleContext';
import { Logo } from '../templates/Logo';
import { AppConfig } from '../utils/AppConfig';
import { ThemeToggle } from './ThemeToggle';

type NavbarProps = {
  /** Path after the locale prefix, e.g. "cases/" — keeps the language switch on the same page. */
  subPath?: string;
};

const SECTION_IDS = ['services', 'cases', 'process', 'about', 'faq'] as const;

/* Highlights the nav item whose section currently crosses the upper third
 * of the viewport. Sections that don't exist on the page are ignored. */
const useActiveSection = () => {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const els = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => el !== null,
    );
    if (els.length === 0) return undefined;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-35% 0px -60% 0px' },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return active;
};

const Navbar = ({ subPath = '' }: NavbarProps) => {
  const { nav } = useT();
  const base = useBase();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const active = useActiveSection();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (y) => setScrolled(y > 16));

  useEffect(() => {
    if (!open) return undefined;
    const root = document.documentElement;
    root.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      root.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const items = [
    { id: 'services', label: nav.services },
    { id: 'cases', label: nav.work },
    { id: 'process', label: nav.process },
    { id: 'about', label: nav.about },
    { id: 'faq', label: nav.faq },
  ].map((item) => ({ ...item, href: `${base}/#${item.id}` }));

  const solid = scrolled || open;

  return (
    <header className="fixed inset-x-0 top-0 z-nav">
      <div
        className={`border-b transition-[background-color,border-color] duration-500 ease-out ${
          solid
            ? 'border-line/[0.08] bg-bg/85 backdrop-blur-md'
            : 'border-transparent'
        }`}
      >
        <div className="container-page flex h-16 items-center justify-between gap-6 md:h-[72px]">
          <Link
            href={`${base}/`}
            aria-label="thesis-i"
            onClick={() => setOpen(false)}
            className="rounded-md"
          >
            <Logo />
          </Link>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-0.5 rounded-full border border-line/10 bg-elev/60 p-1">
              {items.map((item) => {
                const isActive = active === item.id;
                return (
                  <li key={item.id}>
                    <Link
                      href={item.href}
                      aria-current={isActive ? 'location' : undefined}
                      className={`relative flex items-center rounded-full px-4 py-1.5 text-sm transition-colors duration-300 ${
                        isActive ? 'text-ink' : 'text-muted hover:text-ink'
                      }`}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="nav-active"
                          transition={SPRING}
                          className="absolute inset-0 rounded-full bg-line/[0.08]"
                        />
                      )}
                      <span className="relative">{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-1.5">
            <div className="hidden sm:block">
              <LanguageSwitcher subPath={subPath} />
            </div>
            <ThemeToggle />
            <ButtonLink
              href={`${base}/contact/`}
              className="ml-2 hidden !py-1 !pl-4 text-sm md:inline-flex [&>span:last-child]:size-8"
            >
              {nav.startProject}
            </ButtonLink>
            <button
              type="button"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? nav.close : nav.menu}
              onClick={() => setOpen((v) => !v)}
              className="relative ml-1 flex size-10 items-center justify-center rounded-full lg:hidden"
            >
              <span
                className={`absolute h-px w-5 bg-ink transition-transform duration-500 ease-spring ${
                  open ? 'rotate-45' : 'translate-y-[-4px]'
                }`}
              />
              <span
                className={`absolute h-px w-5 bg-ink transition-transform duration-500 ease-spring ${
                  open ? '-rotate-45' : 'translate-y-[4px]'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="fixed inset-0 -z-10 flex flex-col overscroll-contain bg-bg/95 px-5 pb-8 pt-28 backdrop-blur-xl lg:hidden"
          >
            <nav aria-label="Mobile" className="flex-1">
              <ul className="flex flex-col">
                {items.map((item, i) => (
                  <li
                    key={item.id}
                    className="overflow-hidden border-b border-line/10"
                  >
                    <motion.div
                      initial={{ y: '100%', opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{
                        duration: 0.6,
                        ease: EASE,
                        delay: 0.05 + i * 0.05,
                      }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className="flex items-baseline gap-4 py-4 text-3xl font-medium tracking-heading text-ink"
                      >
                        <span className="font-mono text-xs text-subtle">
                          0{i + 1}
                        </span>
                        {item.label}
                      </Link>
                    </motion.div>
                  </li>
                ))}
              </ul>
            </nav>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.35 }}
              className="flex flex-col gap-6"
            >
              <ButtonLink href={`${base}/contact/`} className="self-start">
                {nav.startProject}
              </ButtonLink>
              <div className="flex items-center justify-between">
                <a
                  href={`mailto:${AppConfig.contact.email}`}
                  className="text-sm text-muted"
                >
                  {AppConfig.contact.email}
                </a>
                <LanguageSwitcher subPath={subPath} />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export { Navbar };
