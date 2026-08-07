import type { Locale } from '../i18n/translations';
import { translations } from '../i18n/translations';
import type { NavItem } from './NavbarTwoColumns';

const servicesIcon = (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polygon points="12 2 2 7 12 12 22 7 12 2" />
    <polyline points="2 17 12 22 22 17" />
    <polyline points="2 12 12 17 22 12" />
  </svg>
);

const casesIcon = (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
    <line x1="8" y1="21" x2="16" y2="21" />
    <line x1="12" y1="17" x2="12" y2="21" />
  </svg>
);

const contactIcon = (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

export const getSubPageNavItems = (locale: Locale): NavItem[] => {
  const t = translations[locale];
  const base = locale === 'ua' ? '/ua' : '';
  return [
    { label: t.nav.services, href: `${base}/#services`, icon: servicesIcon },
    { label: t.nav.portfolio, href: `${base}/cases`, icon: casesIcon },
    {
      label: t.nav.startProject,
      href: `${base}/contact/`,
      isButton: true,
      icon: contactIcon,
    },
  ];
};

export const subPageNavItems: NavItem[] = [
  { label: 'Services', href: '/#services', icon: servicesIcon },
  { label: 'Cases', href: '/cases', icon: casesIcon },
  { label: 'Contact', href: '/contact/', isButton: true, icon: contactIcon },
];
