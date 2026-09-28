import {
  ArrowUpRight,
  CheckCircle,
  CircleNotch,
  EnvelopeSimple,
  LinkedinLogo,
  TelegramLogo,
  WarningCircle,
} from '@phosphor-icons/react';
import { AnimatePresence, motion } from 'framer-motion';
import type { FormEvent, ReactNode } from 'react';
import { useState } from 'react';

import {
  buttonClassName,
  ButtonContent,
  ButtonLink,
} from '../components/ButtonLink';
import { Frame } from '../components/Frame';
import { EASE, Reveal } from '../components/motion';
import { useBase, useT } from '../i18n/LocaleContext';
import type { Locale } from '../i18n/translations';
import { translations } from '../i18n/translations';
import { SiteShell } from '../layout/SiteShell';
import { AppConfig } from '../utils/AppConfig';

type Status = 'idle' | 'submitting' | 'success' | 'error';

const inputClass =
  'w-full rounded-xl border border-line/[0.12] bg-bg px-4 py-3.5 text-[0.9375rem] text-ink transition-[border-color,box-shadow] duration-300 placeholder:text-subtle hover:border-line/20 focus:border-signal/60 focus:outline-none focus:ring-4 focus:ring-signal/15';

const channels = [
  {
    label: AppConfig.contact.email,
    href: `mailto:${AppConfig.contact.email}`,
    Icon: EnvelopeSimple,
  },
  { label: 'Telegram', href: AppConfig.contact.telegram, Icon: TelegramLogo },
  { label: 'LinkedIn', href: AppConfig.contact.linkedin, Icon: LinkedinLogo },
];

type FieldProps = {
  id: string;
  label: string;
  hint?: string;
  required?: boolean;
  children: ReactNode;
};

const Field = ({ id, label, hint, required, children }: FieldProps) => (
  <div className="flex flex-col gap-2">
    <label
      htmlFor={id}
      className="flex items-baseline justify-between text-sm font-medium text-ink"
    >
      <span>
        {label}
        {required && (
          <span aria-hidden="true" className="ml-1 text-signal-ink">
            *
          </span>
        )}
      </span>
      {hint && <span className="text-xs font-normal text-subtle">{hint}</span>}
    </label>
    {children}
  </div>
);

const ContactContent = () => {
  const { contactPage } = useT();
  const base = useBase();
  const [status, setStatus] = useState<Status>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const apiKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!apiKey || apiKey === 'YOUR_KEY_HERE') {
      // eslint-disable-next-line no-console
      console.error(
        'NEXT_PUBLIC_WEB3FORMS_KEY is not set. Add it to .env.local.',
      );
      setStatus('error');
      setErrorMessage(contactPage.errors.config);
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
        setErrorMessage(data.message || contactPage.errors.generic);
      }
    } catch {
      setStatus('error');
      setErrorMessage(contactPage.errors.network);
    }
  };

  const submitting = status === 'submitting';

  return (
    <section className="pb-24 pt-32 md:pb-32 md:pt-40">
      <div className="container-page grid gap-14 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <Reveal>
            <h1 className="text-[2.5rem] font-medium leading-[1.02] tracking-display text-ink sm:text-6xl">
              {contactPage.title}
            </h1>
            <p className="mt-6 max-w-[46ch] text-lg leading-relaxed text-muted">
              {contactPage.subtitle}
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-12 text-base font-medium text-ink">
              {contactPage.nextLabel}
            </p>
            <ol className="mt-3 list-decimal space-y-2 pl-5 text-[0.9375rem] text-muted marker:text-subtle">
              {contactPage.next.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </Reveal>

          <Reveal delay={0.15}>
            <p className="mt-12 text-base font-medium text-ink">
              {contactPage.directLabel}
            </p>
            <ul className="mt-4 flex flex-col gap-3">
              {channels.map(({ label, href, Icon }) => (
                <li key={href}>
                  <a
                    href={href}
                    {...(href.startsWith('http')
                      ? { target: '_blank', rel: 'noopener noreferrer' }
                      : {})}
                    className="group inline-flex items-center gap-3 text-[0.9375rem] text-muted transition-colors duration-300 hover:text-ink"
                  >
                    <Icon size={20} weight="light" aria-hidden="true" />
                    {label}
                    <ArrowUpRight
                      size={14}
                      weight="regular"
                      aria-hidden="true"
                      className="opacity-0 transition-[opacity,transform] duration-300 ease-spring group-hover:-translate-y-px group-hover:translate-x-0.5 group-hover:opacity-100"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="lg:col-span-7">
          <Frame innerClassName="p-6 sm:p-8 md:p-10">
            <AnimatePresence mode="wait" initial={false}>
              {status === 'success' ? (
                <motion.div
                  key="success"
                  role="status"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: EASE }}
                  className="flex min-h-[420px] flex-col items-start justify-center"
                >
                  <CheckCircle
                    size={40}
                    weight="light"
                    aria-hidden="true"
                    className="text-signal-ink"
                  />
                  <h2 className="mt-6 text-3xl font-medium tracking-heading text-ink">
                    {contactPage.success.title}
                  </h2>
                  <p className="mt-3 text-lg text-muted">
                    {contactPage.success.subtitle}
                  </p>
                  <ButtonLink
                    href={`${base}/`}
                    variant="secondary"
                    className="mt-10"
                  >
                    {contactPage.success.backHome}
                  </ButtonLink>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3, ease: EASE }}
                  className="flex flex-col gap-6"
                  aria-busy={submitting}
                >
                  <div className="grid gap-6 sm:grid-cols-2">
                    <Field id="name" label={contactPage.fields.name} required>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        autoComplete="name"
                        className={inputClass}
                      />
                    </Field>
                    <Field id="email" label={contactPage.fields.email} required>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        autoComplete="email"
                        spellCheck={false}
                        inputMode="email"
                        className={inputClass}
                      />
                    </Field>
                  </div>
                  <Field
                    id="company"
                    label={contactPage.fields.company}
                    hint={contactPage.optional}
                  >
                    <input
                      type="text"
                      id="company"
                      name="company"
                      autoComplete="organization"
                      className={inputClass}
                    />
                  </Field>
                  <Field
                    id="message"
                    label={contactPage.fields.message}
                    required
                  >
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      placeholder={contactPage.fields.messagePlaceholder}
                      className={`${inputClass} resize-y`}
                    />
                  </Field>

                  {status === 'error' && (
                    <p
                      role="alert"
                      className="flex items-start gap-3 rounded-xl border border-red-500/25 bg-red-500/[0.08] px-4 py-3 text-sm text-red-600 dark:text-red-300"
                    >
                      <WarningCircle
                        size={18}
                        weight="regular"
                        aria-hidden="true"
                        className="mt-px shrink-0"
                      />
                      {errorMessage}
                    </p>
                  )}

                  <div className="flex flex-wrap items-center gap-5 pt-2">
                    <button
                      type="submit"
                      disabled={submitting}
                      className={buttonClassName(
                        'primary',
                        'disabled:cursor-wait disabled:opacity-70',
                      )}
                    >
                      {submitting ? (
                        <>
                          <span>{contactPage.submitting}</span>
                          <span className="flex size-9 items-center justify-center rounded-full bg-signal text-white">
                            <CircleNotch
                              size={16}
                              weight="regular"
                              aria-hidden="true"
                              className="animate-spin"
                            />
                          </span>
                        </>
                      ) : (
                        <ButtonContent>{contactPage.submit}</ButtonContent>
                      )}
                    </button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </Frame>
        </Reveal>
      </div>
    </section>
  );
};

const ContactPage = ({ locale = 'en' as Locale }: { locale?: Locale }) => {
  const t = translations[locale];
  return (
    <SiteShell
      locale={locale}
      title={`${t.contactPage.title} | ${AppConfig.site_name}`}
      description={t.contactPage.subtitle}
      path="contact/"
    >
      <ContactContent />
    </SiteShell>
  );
};

export default ContactPage;
