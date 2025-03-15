import { AppProps } from 'next/app';
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        {/* Your head content */}
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
