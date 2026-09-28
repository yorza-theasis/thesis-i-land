/** Design tokens live in src/styles/global.css as RGB channels so every
 * colour supports Tailwind's `/alpha` modifier and flips with the theme
 * class next-themes puts on <html>. */
const token = (name) => `rgb(var(--${name}) / <alpha-value>)`;

module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Geist', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"Geist Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      colors: {
        bg: token('bg'),
        elev: token('elev'),
        surface: token('surface'),
        ink: token('ink'),
        muted: token('muted'),
        subtle: token('subtle'),
        line: token('line'),
        signal: {
          DEFAULT: token('signal'),
          ink: token('signal-ink'),
          strong: token('signal-strong'),
        },
      },
      maxWidth: {
        page: '82.5rem',
      },
      letterSpacing: {
        display: '-0.045em',
        heading: '-0.03em',
      },
      transitionTimingFunction: {
        out: 'cubic-bezier(0.16, 1, 0.3, 1)',
        spring: 'cubic-bezier(0.32, 0.72, 0, 1)',
      },
      zIndex: {
        nav: '40',
        overlay: '50',
        grain: '60',
      },
    },
  },
  plugins: [],
};
