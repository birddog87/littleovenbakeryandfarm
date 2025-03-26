// src/pages/index.tsx 
import { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Header from '../components/layout/Header';
import Hero from '../components/sections/Hero';
import Products from '../components/sections/Products';
import About from '../components/sections/About';
import Newsletter from '../components/Newsletter';
import Footer from '../components/layout/Footer';
import OrderForm from '../components/OrderForm';

export default function Home() {
  const [orderFormOpen, setOrderFormOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (router.query.order === 'true') {
      setOrderFormOpen(true);
      router.replace('/', undefined, { shallow: true });
    }
  }, [router.query]);

  // Note: The physical address has been removed from the structured data.
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Bakery",
    "name": "The Little Oven Bakery and Farm",
    "image": "https://littleovenfarm.com/images/og-image.jpg",
    "description": "Artisanal bread and farm-fresh eggs made with love in Hagersville, Ontario.",
    "telephone": "+1-905-745-5730",
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "08:00",
        "closes": "17:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Saturday",
        "opens": "09:00",
        "closes": "15:00"
      }
    ],
    "menu": "https://littleovenfarm.com/#products",
    "servesCuisine": ["Bakery", "Artisanal Bread"],
    "priceRange": "$"
  };

  return (
    <>
      <Head>
        <title>The Little Oven Bakery and Farm - Artisanal Bread & Farm Fresh Eggs | Hagersville, Ontario</title>
        <meta
          name="description"
          content="The Little Oven Bakery and Farm offers artisanal bread and farm fresh eggs in Hagersville, Ontario. Order our crusty round loaves, sandwich bread, french bread, and farm-fresh eggs for pickup or local delivery."
        />
        <meta
          name="keywords"
          content="artisanal bakery, homemade bread, farm fresh eggs, Hagersville, Ontario, Little Oven Bakery and Farm, local bakery, crusty bread, sandwich bread, french bread"
        />
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://littleovenfarm.com/" />
        <meta property="og:title" content="The Little Oven Bakery and Farm - Artisanal Bread & Farm Fresh Eggs" />
        <meta
          property="og:description"
          content="Handcrafted bread and farm-fresh eggs from our family to yours. Made with love in Hagersville, Ontario."
        />
        <meta property="og:image" content="https://littleovenfarm.com/images/og-image.jpg" />
        <meta property="og:image:width" content="1024" />
        <meta property="og:image:height" content="1024" />
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://littleovenfarm.com/" />
        <meta property="twitter:title" content="The Little Oven Bakery and Farm - Artisanal Bread & Farm Fresh Eggs" />
        <meta
          property="twitter:description"
          content="Handcrafted bread and farm-fresh eggs from our family to yours. Made with love in Hagersville, Ontario."
        />
        <meta property="twitter:image" content="https://littleovenfarm.com/images/twitter-card.jpg" />
        {/* Canonical URL */}
        <link rel="canonical" href="https://littleovenfarm.com" />
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        {/* Fonts */}
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Merriweather:wght@400;700&display=swap"
          rel="stylesheet"
        />
        {/* Structured data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>

      {loading ? (
        <div className="fixed inset-0 bg-primary-600 flex items-center justify-center z-50">
          <div className="text-center">
            <h1 className="text-3xl font-serif font-bold text-white mb-4">
              The Little Oven Bakery and Farm
            </h1>
            <div className="w-16 h-16 border-4 border-white border-t-primary-300 rounded-full animate-spin mx-auto"></div>
          </div>
        </div>
      ) : (
        <>
          <Header openOrderForm={() => setOrderFormOpen(true)} />
          <Hero openOrderForm={() => setOrderFormOpen(true)} />
          <Products openOrderForm={() => setOrderFormOpen(true)} />
          <About />
          <Newsletter />
          <Footer />
          <OrderForm open={orderFormOpen} setOpen={setOrderFormOpen} />
        </>
      )}
    </>
  );
}
