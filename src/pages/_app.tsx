import '../styles/global.css';

import { MotionConfig } from 'framer-motion';
import type { AppProps } from 'next/app';
import Script from 'next/script';
import { ThemeProvider } from 'next-themes';

const GA_ID = 'AW-18025811889';

const MyApp = ({ Component, pageProps }: AppProps) => (
  <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
    {/* Honours prefers-reduced-motion for every Framer Motion animation. */}
    <MotionConfig reducedMotion="user">
      <Component {...pageProps} />
    </MotionConfig>
    <Script
      strategy="lazyOnload"
      src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
    />
    <Script
      id="google-analytics"
      strategy="lazyOnload"
      dangerouslySetInnerHTML={{
        __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}');
        `,
      }}
    />
  </ThemeProvider>
);

export default MyApp;
