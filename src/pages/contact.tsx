import Link from 'next/link';
import type { FormEvent } from 'react';
import { useState } from 'react';

import { Background } from '../background/Background';
import { CenteredFooter } from '../footer/CenteredFooter';
import { Meta } from '../layout/Meta';
import { Section } from '../layout/Section';
import { NavbarTwoColumns } from '../navigation/NavbarTwoColumns';
import { ThemeToggle } from '../navigation/ThemeToggle';
import { Logo } from '../templates/Logo';
import { AppConfig } from '../utils/AppConfig';

const Contact = () => {
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
    <div className="text-gray-600 antialiased dark:text-gray-300">
      <Meta
        title={`Contact - ${AppConfig.site_name}`}
        description="Get in touch with us. We'd love to hear about your project."
      />

      <Background color="border-gray-200/50 bg-white/70 backdrop-blur-md dark:border-gray-800/50 dark:bg-gray-700/70">
        <Section yPadding="py-6">
          <NavbarTwoColumns logo={<Logo xl />} themeToggle={<ThemeToggle />}>
            <li>
              <Link href="/#services">Services</Link>
            </li>
            <li>
              <Link href="/#cases">Cases</Link>
            </li>
            <li>
              <Link href="/#team">Team</Link>
            </li>
            <li>
              <Link href="/contact/">Contact</Link>
            </li>
          </NavbarTwoColumns>
        </Section>
      </Background>
      <Background color="bg-gray-100 dark:bg-gray-600" withGlow>
        <Section yPadding="py-16">
          <div className="mx-auto max-w-xl">
            <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
              Get in Touch
            </h1>
            <p className="mb-8 text-lg text-gray-600 dark:text-gray-100">
              Have a project in mind? Fill out the form below and we&apos;ll get
              back to you as soon as possible.
            </p>

            {status === 'success' ? (
              <div className="rounded-lg bg-green-50 p-8 text-center dark:bg-green-900/20">
                <h2 className="mb-2 text-2xl font-bold text-green-800 dark:text-green-300">
                  Thank you!
                </h2>
                <p className="mb-6 text-green-700 dark:text-green-400">
                  Your message has been sent. We&apos;ll be in touch soon.
                </p>
                <Link
                  href="/"
                  className="inline-block rounded-md bg-primary-500 px-6 py-2 font-semibold text-white hover:bg-primary-600"
                >
                  Back to Homepage
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full rounded-md border border-gray-300 bg-white p-3 text-gray-900 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-gray-500 dark:bg-gray-800 dark:text-gray-100"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full rounded-md border border-gray-300 bg-white p-3 text-gray-900 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-gray-500 dark:bg-gray-800 dark:text-gray-100"
                  />
                </div>

                <div>
                  <label
                    htmlFor="company"
                    className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Company
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    className="w-full rounded-md border border-gray-300 bg-white p-3 text-gray-900 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-gray-500 dark:bg-gray-800 dark:text-gray-100"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    className="w-full rounded-md border border-gray-300 bg-white p-3 text-gray-900 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-gray-500 dark:bg-gray-800 dark:text-gray-100"
                  />
                </div>

                {status === 'error' && (
                  <div className="rounded-md bg-red-50 p-3 text-sm text-red-700 dark:bg-red-900/20 dark:text-red-400">
                    {errorMessage}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="inline-block rounded-md bg-primary-500 px-6 py-3 text-lg font-semibold text-white hover:bg-primary-600 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {status === 'submitting' ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>
        </Section>
      </Background>

      <Background color="bg-white dark:bg-gray-700">
        <Section>
          <CenteredFooter
            logo={<Logo />}
            iconList={
              <>
                <Link
                  href="/contact/"
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </Link>

                <Link
                  href="https://www.linkedin.com/company/thesis-i"
                  target="_blank"
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                >
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </Link>

                <Link
                  href="https://t.me/vu_boru"
                  target="_blank"
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                >
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.944 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0a12 12 0 00-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 01.171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                  </svg>
                </Link>
              </>
            }
          >
            <li>
              <Link href="/#services">Services</Link>
            </li>
            <li>
              <Link href="/#cases">Cases</Link>
            </li>
            <li>
              <Link href="/#team">Team</Link>
            </li>
            <li>
              <Link href="/contact/">Contact</Link>
            </li>
          </CenteredFooter>
        </Section>
      </Background>
    </div>
  );
};

export default Contact;
