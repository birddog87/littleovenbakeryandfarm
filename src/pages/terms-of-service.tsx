// src/pages/terms-of-service.tsx - Updated version
import Head from 'next/head';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { useState, useEffect } from 'react';

export default function TermsOfService() {
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simulate page loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Head>
        <title>Terms of Service - Little Oven Bakery and Farm</title>
      </Head>

      <Header openOrderForm={() => {}} />
      
      <main className="pt-24 pb-20 bg-gradient-to-b from-amber-50 to-white min-h-screen">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-5xl font-bold text-gray-900 mb-8 font-serif text-center relative">
            <span className="relative inline-block">
              Terms of Service
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-primary-500 rounded-full transform scale-x-75"></div>
            </span>
          </h1>
          
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="w-16 h-16 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-xl p-8 md:p-10 backdrop-blur-sm bg-opacity-80">
              <p className="mb-6 text-primary-600 font-medium">Last Updated: March 17, 2025</p>
              
              <div className="space-y-10">
                <section className="terms-section">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                    <span className="inline-block w-8 h-8 bg-primary-100 text-primary-700 rounded-full mr-3 flex items-center justify-center">1</span>
                    Agreement to Terms
                  </h2>
                  <p className="mb-4 text-gray-700 leading-relaxed pl-11">
                    By accessing and using Little Oven Bakery and Farm's website and services, you agree to be bound by these Terms of Service and all applicable laws and regulations.
                  </p>
                </section>
                
                <section className="terms-section">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                    <span className="inline-block w-8 h-8 bg-primary-100 text-primary-700 rounded-full mr-3 flex items-center justify-center">2</span>
                    Order Placement and Fulfillment
                  </h2>
                  <p className="mb-4 text-gray-700 leading-relaxed pl-11">
                    Orders placed through our website are subject to availability and acceptance. We reserve the right to limit quantities or refuse service to anyone. Orders are typically ready for pickup during our designated pickup hours on weekends. Delivery is available within a 20km radius of Hagersville, Ontario.
                  </p>
                </section>
                
                <section className="terms-section">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                    <span className="inline-block w-8 h-8 bg-primary-100 text-primary-700 rounded-full mr-3 flex items-center justify-center">3</span>
                    Pricing and Payment
                  </h2>
                  <p className="mb-4 text-gray-700 leading-relaxed pl-11">
                    All prices are in Canadian dollars and do not include applicable taxes. Payment is collected at the time of pickup or delivery. We accept cash and e-transfer payments.
                  </p>
                </section>
                
                <section className="terms-section">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                    <span className="inline-block w-8 h-8 bg-primary-100 text-primary-700 rounded-full mr-3 flex items-center justify-center">4</span>
                    Food Safety and Allergies
                  </h2>
                  <p className="mb-4 text-gray-700 leading-relaxed pl-11">
                    We prepare our products in a home kitchen that may contain common allergens including wheat, dairy, eggs, and nuts. While we take reasonable precautions, we cannot guarantee that our products are free from allergens. Please inform us of any allergies when placing your order.
                  </p>
                </section>
                
                <section className="terms-section">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                    <span className="inline-block w-8 h-8 bg-primary-100 text-primary-700 rounded-full mr-3 flex items-center justify-center">5</span>
                    Order Cancellation
                  </h2>
                  <p className="mb-4 text-gray-700 leading-relaxed pl-11">
                    To cancel or modify an order, please contact us at least 24 hours before your scheduled pickup or delivery time. Orders canceled with less notice may be subject to a cancellation fee.
                  </p>
                </section>
                
                <section className="terms-section">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                    <span className="inline-block w-8 h-8 bg-primary-100 text-primary-700 rounded-full mr-3 flex items-center justify-center">6</span>
                    Intellectual Property
                  </h2>
                  <p className="mb-4 text-gray-700 leading-relaxed pl-11">
                    All content on this website, including text, graphics, logos, and images, is the property of Little Oven Bakery and Farm and is protected by Canadian copyright laws.
                  </p>
                </section>
                
                <section className="terms-section">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                    <span className="inline-block w-8 h-8 bg-primary-100 text-primary-700 rounded-full mr-3 flex items-center justify-center">7</span>
                    Limitation of Liability
                  </h2>
                  <p className="mb-4 text-gray-700 leading-relaxed pl-11">
                    Little Oven Bakery and Farm shall not be liable for any direct, indirect, incidental, special, or consequential damages that result from the use of, or the inability to use, our products or services.
                  </p>
                </section>
                
                <section className="terms-section">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                    <span className="inline-block w-8 h-8 bg-primary-100 text-primary-700 rounded-full mr-3 flex items-center justify-center">8</span>
                    Changes to Terms
                  </h2>
                  <p className="mb-4 text-gray-700 leading-relaxed pl-11">
                    We reserve the right to modify these Terms of Service at any time. We will notify users of any changes by updating the date at the top of this page.
                  </p>
                </section>
                
                <section className="terms-section">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                    <span className="inline-block w-8 h-8 bg-primary-100 text-primary-700 rounded-full mr-3 flex items-center justify-center">9</span>
                    Governing Law
                  </h2>
                  <p className="mb-4 text-gray-700 leading-relaxed pl-11">
                    These Terms of Service are governed by and construed in accordance with the laws of Ontario, Canada.
                  </p>
                </section>
                
                <section className="terms-section">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                    <span className="inline-block w-8 h-8 bg-primary-100 text-primary-700 rounded-full mr-3 flex items-center justify-center">10</span>
                    Contact Us
                  </h2>
                  <p className="mb-4 text-gray-700 leading-relaxed pl-11">
                    If you have any questions about these Terms of Service, please contact us at sales@littleovenfarm.com or by phone at (905) 745-5730.
                  </p>
                </section>
              </div>
              
              <div className="mt-12 pt-8 border-t border-gray-200 text-center">
                <a href="/" className="inline-flex items-center text-primary-600 hover:text-primary-800 transition-colors">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                  </svg>
                  Back to Homepage
                </a>
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </>
  );
}