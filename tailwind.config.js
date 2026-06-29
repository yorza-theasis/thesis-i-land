module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '4rem',
      '7xl': '5rem',
    },
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Menlo', 'monospace'],
      },
      colors: {
        border: 'var(--border)',
        input: 'var(--input)',
        ring: 'var(--ring)',
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        /* ── Neon accent palette ── */
        neon: {
          purple: '#b026ff',
          'purple-bright': '#e5b5ff',
          'purple-dim': 'rgba(176, 38, 255, 0.15)',
          blue: '#0047ff',
          'blue-bright': '#b9c3ff',
          'blue-dim': 'rgba(0, 71, 255, 0.15)',
        },
        /* ── Dark surface scale ── */
        kosmos: {
          950: '#0a0a0a',
          900: '#131313',
          800: '#1c1b1b',
          700: '#201f1f',
          600: '#2a2a2a',
          500: '#353534',
          400: '#4a4949',
        },
        primary: {
          100: '#E6F6FE',
          200: '#C0EAFC',
          300: '#9ADDFB',
          400: '#4FC3F7',
          500: '#03A9F4',
          600: '#0398DC',
          700: '#026592',
          800: '#014C6E',
          900: '#013349',
          DEFAULT: 'var(--primary)',
          foreground: 'var(--primary-foreground)',
        },
        gray: {
          100: '#f5f5f4',
          200: '#e7e5e4',
          300: '#d6d3d1',
          400: '#a8a29e',
          500: '#78716c',
          600: '#57534e',
          700: '#44403c',
          800: '#292524',
          900: '#1c1917',
        },
        secondary: {
          DEFAULT: 'var(--secondary)',
          foreground: 'var(--secondary-foreground)',
        },
        destructive: {
          DEFAULT: 'var(--destructive)',
        },
        muted: {
          DEFAULT: 'var(--muted)',
          foreground: 'var(--muted-foreground)',
        },
        accent: {
          DEFAULT: 'var(--accent)',
          foreground: 'var(--accent-foreground)',
        },
        popover: {
          DEFAULT: 'var(--popover)',
          foreground: 'var(--popover-foreground)',
        },
        card: {
          DEFAULT: 'var(--card)',
          foreground: 'var(--card-foreground)',
        },
        sidebar: {
          DEFAULT: 'var(--sidebar)',
          foreground: 'var(--sidebar-foreground)',
          primary: 'var(--sidebar-primary)',
          'primary-foreground': 'var(--sidebar-primary-foreground)',
          accent: 'var(--sidebar-accent)',
          'accent-foreground': 'var(--sidebar-accent-foreground)',
          border: 'var(--sidebar-border)',
          ring: 'var(--sidebar-ring)',
        },
      },
      lineHeight: {
        hero: '4.5rem',
      },
      letterSpacing: {
        tightest: '-0.04em',
        tighter: '-0.02em',
        tight: '-0.01em',
      },
      boxShadow: {
        'neon-purple':
          '0 0 20px rgba(176, 38, 255, 0.35), 0 0 60px rgba(176, 38, 255, 0.1)',
        'neon-blue':
          '0 0 20px rgba(0, 71, 255, 0.35), 0 0 60px rgba(0, 71, 255, 0.1)',
        'neon-purple-lg':
          '0 0 40px rgba(176, 38, 255, 0.5), 0 0 100px rgba(176, 38, 255, 0.2)',
        glass:
          'inset 0 1px 0 0 rgba(255, 255, 255, 0.1), 0 4px 24px rgba(0, 0, 0, 0.4)',
      },
      backgroundImage: {
        'gradient-neon': 'linear-gradient(135deg, #b026ff 0%, #0047ff 100%)',
        'gradient-neon-soft':
          'linear-gradient(135deg, rgba(176,38,255,0.8) 0%, rgba(0,71,255,0.8) 100%)',
        'gradient-text':
          'linear-gradient(135deg, #ffffff 0%, #e5b5ff 40%, #b9c3ff 100%)',
        'mesh-purple':
          'radial-gradient(ellipse at 20% 20%, rgba(176,38,255,0.15) 0%, transparent 60%)',
        'mesh-blue':
          'radial-gradient(ellipse at 80% 80%, rgba(0,71,255,0.12) 0%, transparent 60%)',
      },
    },
  },
  plugins: [],
};
