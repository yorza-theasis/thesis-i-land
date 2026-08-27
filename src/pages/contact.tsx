import Link from 'next/link';
import type { FormEvent } from 'react';
import { useState } from 'react';

import { GlobalBackground } from '../background/GlobalBackground';
import { CenteredFooter } from '../footer/CenteredFooter';
import { LanguageSwitcher } from '../i18n/LanguageSwitcher';
import { LocaleProvider, useT } from '../i18n/LocaleContext';
import type { Locale } from '../i18n/translations';
import { Meta } from '../layout/Meta';
import { Section } from '../layout/Section';
import { NavbarTwoColumns } from '../navigation/NavbarTwoColumns';
import { getSubPageNavItems } from '../navigation/navItems';
import { ThemeToggle } from '../navigation/ThemeToggle';
import { Logo } from '../templates/Logo';
import { AppConfig } from '../utils/AppConfig';

const socialIcons = (
  <>
    <Link
      href="/contact/"
      className="text-gray-600 transition-colors hover:text-neon-purple-bright"
      aria-label="Email us"
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        width="20"
        height="20"
      >
        <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    </Link>
    <Link
      href="https://www.linkedin.com/company/thesis-i"
      target="_blank"
      rel="noopener noreferrer"
      className="text-gray-600 transition-colors hover:text-neon-purple-bright"
      aria-label="LinkedIn"
    >
      <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    </Link>
    <Link
      href="https://t.me/vu_boru"
      target="_blank"
      rel="noopener noreferrer"
      className="text-gray-600 transition-colors hover:text-neon-purple-bright"
      aria-label="Telegram"
    >
      <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
        <path d="M11.944 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0a12 12 0 00-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 01.171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
      </svg>
    </Link>
  </>
);

const ContactPageInner = ({ locale }: { locale: Locale }) => {
  const { contactPage, nav } = useT();
  const base = locale === 'ua' ? '/ua' : '';

  const [status, setStatus] = useState<
    'idle' | 'submitting' | 'success' | 'error'
  >('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const apiKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!apiKey || apiKey === 'YOUR_KEY_HERE') {
      setStatus('error');
      setErrorMessage(
        'Web3Forms API key is not configured. Please add your key to .env.local.',
      );
      return;
    }

    setStatus('submitting');
    setErrorMessage('');

    const formData = new FormData(e.currentTarget);
    formData.append('access_key', apiKey);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setStatus('success');
      } else {
        setStatus('error');
        setErrorMessage(
          data.message || 'Something went wrong. Please try again.',
        );
      }
    } catch {
      setStatus('error');
      setErrorMessage(
        'Network error. Please check your connection and try again.',
      );
    }
  };

  return (
    <div className="text-gray-300 antialiased">
      <Meta
        title={`${contactPage.title} — ${AppConfig.site_name}`}
        description={contactPage.subtitle}
      />
      <GlobalBackground />

      <NavbarTwoColumns
        logo={<Logo xl />}
        themeToggle={<ThemeToggle />}
        navItems={getSubPageNavItems(locale)}
        langSwitcher={<LanguageSwitcher subPath="contact/" />}
      />

      <Section yPadding="pt-36 pb-24">
        <div className="mx-auto max-w-xl">
          <h1 className="mb-4 text-4xl font-bold tracking-tightest text-white">
            {contactPage.title}
          </h1>
          <p className="mb-8 text-lg text-gray-400">{contactPage.subtitle}</p>

          {status === 'success' ? (
            <div className="glass-card rounded-xl p-8 text-center">
              <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-full border border-neon-purple/30 bg-neon-purple/10">
                <svg
                  className="size-7 text-neon-purple-bright"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h2 className="mb-2 text-2xl font-bold text-white">
                {contactPage.success.title}
              </h2>
              <p className="mb-6 text-gray-400">
                {contactPage.success.subtitle}
              </p>
              <Link
                href={`${base}/`}
                className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-neon-purple to-neon-blue px-6 py-2.5 font-semibold text-white transition-all duration-300 hover:-translate-y-0.5"
              >
                {contactPage.success.backHome}
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block font-mono text-sm font-medium text-gray-400"
                >
                  {contactPage.fields.name}{' '}
                  <span className="text-neon-purple">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full rounded-xl border border-white/10 bg-white/5 p-3.5 text-white backdrop-blur-sm transition-colors placeholder:text-gray-600 focus:border-neon-purple/50 focus:outline-none focus:ring-1 focus:ring-neon-purple/30"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block font-mono text-sm font-medium text-gray-400"
                >
                  {contactPage.fields.email}{' '}
                  <span className="text-neon-purple">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full rounded-xl border border-white/10 bg-white/5 p-3.5 text-white backdrop-blur-sm transition-colors placeholder:text-gray-600 focus:border-neon-purple/50 focus:outline-none focus:ring-1 focus:ring-neon-purple/30"
                />
              </div>

              <div>
                <label
                  htmlFor="company"
                  className="mb-2 block font-mono text-sm font-medium text-gray-400"
                >
                  {contactPage.fields.company}
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  className="w-full rounded-xl border border-white/10 bg-white/5 p-3.5 text-white backdrop-blur-sm transition-colors placeholder:text-gray-600 focus:border-neon-purple/50 focus:outline-none focus:ring-1 focus:ring-neon-purple/30"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block font-mono text-sm font-medium text-gray-400"
                >
                  {contactPage.fields.message}{' '}
                  <span className="text-neon-purple">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  className="w-full rounded-xl border border-white/10 bg-white/5 p-3.5 text-white backdrop-blur-sm transition-colors placeholder:text-gray-600 focus:border-neon-purple/50 focus:outline-none focus:ring-1 focus:ring-neon-purple/30"
                />
              </div>

              {status === 'error' && (
                <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-3 font-mono text-sm text-red-400">
                  {errorMessage}
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-neon-purple to-neon-blue px-8 py-3.5 text-base font-semibold text-white shadow-neon-purple transition-all duration-300 hover:-translate-y-0.5 hover:shadow-neon-purple-lg disabled:cursor-not-allowed disabled:opacity-50"
              >
                {status === 'submitting'
                  ? contactPage.submitting
                  : contactPage.submit}
              </button>
            </form>
          )}
        </div>
      </Section>

      {/* Footer */}
      <div className="border-white/8 border-t">
        <Section yPadding="py-12">
          <CenteredFooter logo={<Logo />} iconList={socialIcons}>
            <li>
              <Link href={`${base}/#services`}>{nav.services}</Link>
            </li>
            <li>
              <Link href={`${base}/cases`}>{nav.portfolio}</Link>
            </li>
            <li>
              <Link href={`${base}/contact/`}>{nav.startProject}</Link>
            </li>
          </CenteredFooter>
        </Section>
      </div>
    </div>
  );
};

const ContactPage = ({ locale = 'en' as Locale }: { locale?: Locale }) => (
  <LocaleProvider locale={locale}>
    <ContactPageInner locale={locale} />
  </LocaleProvider>
);

export default ContactPage;
