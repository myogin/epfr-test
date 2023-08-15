import { siteConfig } from "@/libs/config";
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en" suppressHydrationWarning>
      <Head>
        {/* <meta
          httpEquiv="Content-Security-Policy"
          content="upgrade-insecure-requests"
        /> */}
        <meta
          name="description"
          content={siteConfig.description}
          itemProp="description"
        />
        <meta
          name="keywords"
          content={siteConfig.keywords}
          itemProp="keywords"
        />
        <meta name="author" content={siteConfig.creator} />
        <meta
          name="copyright"
          content={siteConfig.copyright}
          itemProp="dateline"
        />
        <meta name="thumbnailUrl" content="" itemProp="thumbnailUrl" />
        <meta content="" itemProp="url" />
        <meta property="og:title" content={siteConfig.siteName} />
        <meta property="og:site_name" content={siteConfig.siteName} />
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
  );
}
