// src/pages/_app.tsx
import type { AppProps } from 'next/app';
import '../styles/globals.css';
import Head from 'next/head';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import * as gtag from '../lib/gtag';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  
  useEffect(() => {
    const handleRouteChange = (url: string) => {
      gtag.pageview(url);
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);
  
  return (
    <>
      <Head>
        <title>Little Oven Bakery and Farm</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;