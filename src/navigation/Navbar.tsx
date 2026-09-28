import { ArrowUpRight, CaretDown } from '@phosphor-icons/react';
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
import type { CaseId } from '../data/cases';
import { caseHref, caseThumb, getCase } from '../data/cases';
import { SERVICE_ICONS } from '../data/serviceIcons';
import { LanguageSwitcher } from '../i18n/LanguageSwitcher';
import { useBase, useT } from '../i18n/LocaleContext';
import { Logo } from '../templates/Logo';
import { AppConfig } from '../utils/AppConfig';
import { ThemeToggle } from './ThemeToggle';

type NavbarProps = {
  /** Path after the locale prefix, e.g. "cases/"; keeps the language switch on the same page. */
  subPath?: string;
};

type MenuId = 'services' | 'cases';

const SECTION_IDS = ['process', 'services', 'cases', 'about', 'faq'] as const;

const MENU_CASES: CaseId[] = ['qpick', 'extensa', 'wirebender', 'niania'];

/** Section titles carry *accent* markup; menus show them as plain text. */
const plain = (text: string) => text.replace(/\*/g, '');

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

/* ─── Mega menus (desktop): a preview of what each section holds ─── */

const MenuIntro = ({
  title,
  text,
  href,
  cta,
  onNavigate,
}: {
  title: string;
  text: string;
  href: string;
  cta: string;
  onNavigate: () => void;
}) => (
  <div className="lg:col-span-4">
    <p className="text-lg font-medium tracking-[-0.01em] text-ink">{title}</p>
    <p className="mt-2 text-sm leading-relaxed text-muted">{text}</p>
    <Link
      href={href}
      onClick={onNavigate}
      className="group mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-signal-ink"
    >
      {cta}
      <ArrowUpRight
        size={14}
        weight="regular"
        aria-hidden="true"
        className="transition-transform duration-300 ease-spring group-hover:-translate-y-px group-hover:translate-x-0.5"
      />
    </Link>
  </div>
);

const ServicesMenu = ({ onNavigate }: { onNavigate: () => void }) => {
  const { services, nav } = useT();
  const base = useBase();
  const href = `${base}/#services`;
  return (
    <div className="grid gap-8 lg:grid-cols-12">
      <MenuIntro
        title={plain(services.title)}
        text={services.description}
        href={href}
        cta={nav.services}
        onNavigate={onNavigate}
      />
      <ul className="grid grid-cols-2 gap-1 lg:col-span-8">
        {services.items.map((service, i) => {
          const ItemIcon = SERVICE_ICONS[i]!;
          return (
            <li key={service.title}>
              <Link
                href={href}
                onClick={onNavigate}
                className="flex items-center gap-3 rounded-xl p-2.5 transition-colors duration-300 hover:bg-line/[0.05]"
              >
                <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-signal/10 text-signal-ink">
                  <ItemIcon size={18} weight="regular" aria-hidden="true" />
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-medium text-ink">
                    {service.title}
                  </span>
                  <span className="block text-xs text-subtle">
                    {service.stat}
                  </span>
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

const WorkMenu = ({ onNavigate }: { onNavigate: () => void }) => {
  const { work, cases, common } = useT();
  const base = useBase();
  return (
    <div className="grid gap-8 lg:grid-cols-12">
      <MenuIntro
        title={plain(work.title)}
        text={work.description}
        href={`${base}/cases/`}
        cta={common.allCases}
        onNavigate={onNavigate}
      />
      <ul className="grid grid-cols-4 gap-3 lg:col-span-8">
        {MENU_CASES.map((id) => {
          const thumb = caseThumb(getCase(id));
          return (
            <li key={id}>
              <Link
                href={caseHref(base, id)}
                onClick={onNavigate}
                className="group block rounded-xl"
              >
                <span
                  className="block aspect-[4/3] overflow-hidden rounded-xl ring-1 ring-line/10"
                  style={
                    thumb?.background
                      ? { backgroundColor: thumb.background }
                      : undefined
                  }
                >
                  {thumb && (
                    <img
                      src={thumb.src}
                      alt=""
                      loading="lazy"
                      className={`size-full transition-transform duration-700 ease-out group-hover:scale-105 ${
                        thumb.background
                          ? 'object-contain p-1.5'
                          : 'object-cover'
                      }`}
                      style={
                        thumb.position
                          ? { objectPosition: thumb.position }
                          : undefined
                      }
                    />
                  )}
                </span>
                <span className="mt-2.5 block text-sm font-medium text-ink">
                  {cases[id].title}
                </span>
                <span className="block text-xs text-subtle">
                  {cases[id].category}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

const Navbar = ({ subPath = '' }: NavbarProps) => {
  const { nav, common, footer } = useT();
  const base = useBase();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState<MenuId | null>(null);
  const active = useActiveSection();
  const { scrollY, scrollYProgress } = useScroll();

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

  useEffect(() => {
    if (!menu) return undefined;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMenu(null);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [menu]);

  const closeMenu = () => setMenu(null);

  const items: { id: string; label: string; menu?: MenuId }[] = [
    { id: 'process', label: nav.process },
    { id: 'services', label: nav.services, menu: 'services' },
    { id: 'cases', label: nav.work, menu: 'cases' },
    { id: 'about', label: nav.about },
    { id: 'faq', label: nav.faq },
  ];
  const links = items.map((item) => ({
    ...item,
    href: `${base}/#${item.id}`,
  }));

  return (
    <header
      className="fixed inset-x-0 top-0 z-nav"
      onMouseLeave={closeMenu}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null))
          closeMenu();
      }}
    >
      {/* Always a solid bar so the brand, the sections and the call button
          read clearly over any section; the blue line tracks page progress. */}
      <div
        className={`relative border-b border-line/10 backdrop-blur-md transition-[background-color,box-shadow] duration-500 ease-out ${
          menu || open ? 'bg-bg/95' : 'bg-bg/85'
        } ${scrolled ? 'shadow-[0_10px_30px_-20px_rgb(0_0_0/0.6)]' : ''}`}
      >
        <div className="container-page flex h-16 items-center justify-between gap-6 lg:h-20">
          <div className="flex items-center gap-4">
            <Link
              href={`${base}/`}
              aria-label="thesis-i"
              onClick={() => {
                setOpen(false);
                closeMenu();
              }}
              className="rounded-md"
            >
              <Logo size={34} />
            </Link>
            <span
              aria-hidden="true"
              className="hidden h-7 w-px bg-line/15 xl:block"
            />
            <span className="hidden max-w-[11rem] text-xs leading-snug text-subtle xl:block">
              {footer.tagline}
            </span>
          </div>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-0.5">
              {links.map((item) => {
                const isActive = active === item.id;
                const isOpen = item.menu !== undefined && menu === item.menu;
                return (
                  <li
                    key={item.id}
                    onMouseEnter={() => setMenu(item.menu ?? null)}
                  >
                    <Link
                      href={item.href}
                      onFocus={() => setMenu(item.menu ?? null)}
                      onClick={closeMenu}
                      aria-current={isActive ? 'location' : undefined}
                      {...(item.menu
                        ? { 'aria-haspopup': true, 'aria-expanded': isOpen }
                        : {})}
                      className={`relative flex items-center gap-1 rounded-full px-3 py-2 text-[0.9375rem] transition-colors duration-300 xl:px-4 ${
                        isActive || isOpen
                          ? 'text-ink'
                          : 'text-ink/70 hover:text-ink'
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
                      {item.menu && (
                        <CaretDown
                          size={12}
                          weight="bold"
                          aria-hidden="true"
                          className={`relative text-subtle transition-transform duration-300 ${
                            isOpen ? 'rotate-180' : ''
                          }`}
                        />
                      )}
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
              {common.bookCall}
            </ButtonLink>
            <button
              type="button"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? nav.close : nav.menu}
              onClick={() => setOpen((v) => !v)}
              className="relative ml-1 flex size-11 items-center justify-center rounded-full lg:hidden"
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

        <motion.span
          aria-hidden="true"
          style={{ scaleX: scrollYProgress }}
          className="absolute inset-x-0 -bottom-px h-px origin-left bg-signal"
        />
      </div>

      <AnimatePresence>
        {menu && (
          <motion.div
            key={menu}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="absolute inset-x-0 top-full hidden lg:block"
          >
            <div className="container-page pt-2">
              <div className="rounded-[1.5rem] bg-surface p-6 shadow-[0_24px_60px_-24px_rgb(0_0_0/0.55)] ring-1 ring-line/10 xl:p-8">
                {menu === 'services' ? (
                  <ServicesMenu onNavigate={closeMenu} />
                ) : (
                  <WorkMenu onNavigate={closeMenu} />
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="fixed inset-0 -z-10 flex flex-col gap-8 overflow-y-auto overscroll-contain bg-bg/95 px-5 pb-8 pt-24 backdrop-blur-xl lg:hidden"
          >
            <nav aria-label="Mobile" className="flex-1">
              <ul className="flex flex-col">
                {links.map((item, i) => (
                  <li key={item.id} className="overflow-hidden">
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
                        className="block py-4 text-3xl font-medium tracking-heading text-ink"
                      >
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
              <p className="text-sm text-subtle">{footer.tagline}</p>
              <ButtonLink href={`${base}/contact/`} className="self-start">
                {common.bookCall}
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
