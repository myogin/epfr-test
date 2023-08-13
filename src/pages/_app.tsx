import "../styles/globals.css";
import { NextPage } from "next";
import type { AppProps } from "next/app";
import { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
import NextNProgress from "nextjs-progressbar";

export type Page<P = {}> = NextPage<P> & {
  getLayout?: (page: ReactNode) => ReactNode;
};

type Props = AppProps & {
  Component: Page;
};

export default function App({ Component, pageProps }: Props) {
  const getLayout = Component.getLayout || ((page: ReactNode) => page);

  if (Component.getLayout) {
    return getLayout(
      <SessionProvider session={pageProps.session}>
        <NextNProgress />
        <Component {...pageProps} />
      </SessionProvider>
    );
  }
}
