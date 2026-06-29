import Link from 'next/link';

import { Logo } from './Logo';

const Footer = () => (
  <footer className="border-white/6 relative border-t bg-kosmos-950">
    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-neon-purple/25 to-transparent" />
    <div className="mx-auto max-w-screen-xl px-6 py-16">
      <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
        {/* Col 1 — Logo + bio */}
        <div className="flex flex-col gap-4">
          <Logo />
          <p className="max-w-xs text-sm leading-relaxed text-gray-500">
            A software engineering studio combining strong technical execution
            with architecture-driven thinking. We build things that work.
          </p>
          <p className="font-mono text-xs text-gray-600">
            © 2026 thesis-i. All rights reserved.
          </p>
        </div>

        {/* Col 2 — Quick Links */}
        <div>
          <h4 className="mb-5 font-mono text-xs font-semibold uppercase tracking-widest text-gray-500">
            Quick Links
          </h4>
          <ul className="flex flex-col gap-3">
            {[
              { label: 'Services', href: '#services' },
              { label: 'Portfolio', href: '#cases' },
              { label: 'Tech Stack', href: '#techstack' },
              { label: 'Team', href: '#team' },
              { label: 'Contact', href: '/contact/' },
            ].map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-sm text-gray-400 transition-colors duration-200 hover:text-neon-purple-bright"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 3 — Contact */}
        <div>
          <h4 className="mb-5 font-mono text-xs font-semibold uppercase tracking-widest text-gray-500">
            Contact
          </h4>
          <ul className="flex flex-col gap-4">
            <li>
              <a
                href="mailto:yorza@thesis-i.com"
                className="flex items-center gap-3 text-sm text-gray-400 transition-colors duration-200 hover:text-neon-purple-bright"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  width="16"
                  height="16"
                  className="shrink-0"
                >
                  <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                yorza@thesis-i.com
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/company/thesis-i"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm text-gray-400 transition-colors duration-200 hover:text-neon-purple-bright"
              >
                <svg
                  viewBox="0 0 24 24"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="shrink-0"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                LinkedIn
              </a>
            </li>
            <li>
              <a
                href="https://t.me/vu_boru"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm text-gray-400 transition-colors duration-200 hover:text-neon-purple-bright"
              >
                <svg
                  viewBox="0 0 24 24"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="shrink-0"
                >
                  <path d="M11.944 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0a12 12 0 00-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 01.171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                </svg>
                Telegram
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
);

export { Footer };
