import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="description" content="Epfr Apps Legacy Fa" itemProp="description" />
        <meta name="keywords" content="Epfr Apps" itemProp="keywords" />
        <meta name="author" content="Epfr Apps" />
        <meta name="copyright" content="Legacy Fa Asia" itemProp="dateline" />
        <meta name="thumbnailUrl" content="" itemProp="thumbnailUrl" />
        <meta content="" itemProp="url" />
        <meta property="og:title" content="Epfr Apps" />
        <meta property="og:site_name" content="Epfr Apps" />
        <meta property="og:image" content="" />
        <meta property="og:url" content="" />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:image:width" content="500" />
        <meta property="og:image:height" content="300" />
        <meta property="og:description" content="Epfr Apps" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon.png" />
        <link rel="apple-touch-icon" href="/favicon.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/favicon.png" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
