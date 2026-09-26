import Document, { Head, Html, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    // Static export can't read the locale from the request, but the page
    // route is known at build time — /ua/* is Ukrainian, everything else English.
    // eslint-disable-next-line no-underscore-dangle
    const { page } = this.props.__NEXT_DATA__;
    const lang = page === '/ua' || page.startsWith('/ua/') ? 'uk' : 'en';

    return (
      <Html lang={lang} suppressHydrationWarning>
        <Head>
          <meta name="theme-color" content="#111111" />
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
