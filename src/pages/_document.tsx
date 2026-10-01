import Document, { Head, Html, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    // Static export can't read the locale from the request, but the page
    // route is known at build time: /ua/* is Ukrainian, /es/* Spanish,
    // everything else English.
    // eslint-disable-next-line no-underscore-dangle
    const { page } = this.props.__NEXT_DATA__;
    const prefix = page.split('/')[1];
    const lang = { ua: 'uk', es: 'es' }[prefix ?? ''] ?? 'en';

    return (
      <Html lang={lang} suppressHydrationWarning>
        <Head>
          <meta name="theme-color" content="#141414" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="anonymous"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600&family=Geist+Mono:wght@400;500&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
