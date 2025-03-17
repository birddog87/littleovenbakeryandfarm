// src/pages/privacy-policy.tsx - Updated version
import Head from 'next/head';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { useState, useEffect } from 'react';

export default function PrivacyPolicy() {
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
        <title>Privacy Policy - Little Oven Bakery and Farm</title>
      </Head>

      <Header openOrderForm={() => {}} />
      
      <main className="pt-24 pb-20 bg-gradient-to-b from-amber-50 to-white min-h-screen">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-5xl font-bold text-gray-900 mb-8 font-serif text-center relative">
            <span className="relative inline-block">
              Privacy Policy
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
                <section className="policy-section">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                    <span className="inline-block w-8 h-8 bg-primary-100 text-primary-700 rounded-full mr-3 flex items-center justify-center">1</span>
                    Introduction
                  </h2>
                  <p className="mb-4 text-gray-700 leading-relaxed pl-11">
                    At Little Oven Bakery and Farm ("we," "our," or "us"), we respect your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website or place an order with us.
                  </p>
                </section>
                
                <section className="policy-section">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                    <span className="inline-block w-8 h-8 bg-primary-100 text-primary-700 rounded-full mr-3 flex items-center justify-center">2</span>
                    Information We Collect
                  </h2>
                  <div className="pl-11">
                    <p className="mb-4 text-gray-700 leading-relaxed">We may collect the following types of information:</p>
                    <ul className="space-y-2 mb-4">
                      <li className="flex items-start">
                        <div className="flex-shrink-0 w-5 h-5 rounded-full bg-primary-100 flex items-center justify-center mt-1 mr-3">
                          <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
                        </div>
                        <span className="text-gray-700">Personal information (such as name, email address, phone number, and delivery address)</span>
                      </li>
                      <li className="flex items-start">
                        <div className="flex-shrink-0 w-5 h-5 rounded-full bg-primary-100 flex items-center justify-center mt-1 mr-3">
                          <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
                        </div>
                        <span className="text-gray-700">Order information (products ordered, special instructions)</span>
                      </li>
                      <li className="flex items-start">
                        <div className="flex-shrink-0 w-5 h-5 rounded-full bg-primary-100 flex items-center justify-center mt-1 mr-3">
                          <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
                        </div>
                        <span className="text-gray-700">Website usage data (such as IP address, browser type, pages visited)</span>
                      </li>
                    </ul>
                  </div>
                </section>
                
                <section className="policy-section">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                    <span className="inline-block w-8 h-8 bg-primary-100 text-primary-700 rounded-full mr-3 flex items-center justify-center">3</span>
                    How We Use Your Information
                  </h2>
                  <div className="pl-11">
                    <p className="mb-4 text-gray-700 leading-relaxed">We use your information to:</p>
                    <ul className="space-y-2 mb-4">
                      <li className="flex items-start">
                        <div className="flex-shrink-0 w-5 h-5 rounded-full bg-primary-100 flex items-center justify-center mt-1 mr-3">
                          <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
                        </div>
                        <span className="text-gray-700">Process and fulfill your orders</span>
                      </li>
                      <li className="flex items-start">
                        <div className="flex-shrink-0 w-5 h-5 rounded-full bg-primary-100 flex items-center justify-center mt-1 mr-3">
                          <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
                        </div>
                        <span className="text-gray-700">Communicate with you about your order</span>
                      </li>
                      <li className="flex items-start">
                        <div className="flex-shrink-0 w-5 h-5 rounded-full bg-primary-100 flex items-center justify-center mt-1 mr-3">
                          <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
                        </div>
                        <span className="text-gray-700">Improve our website and services</span>
                      </li>
                      <li className="flex items-start">
                        <div className="flex-shrink-0 w-5 h-5 rounded-full bg-primary-100 flex items-center justify-center mt-1 mr-3">
                          <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
                        </div>
                        <span className="text-gray-700">Send you promotional offers (only with your consent)</span>
                      </li>
                    </ul>
                  </div>
                </section>
                
                {/* Continue with other sections using the same styling pattern */}
                <section className="policy-section">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                    <span className="inline-block w-8 h-8 bg-primary-100 text-primary-700 rounded-full mr-3 flex items-center justify-center">4</span>
                    Information Sharing
                  </h2>
                  <p className="mb-4 text-gray-700 leading-relaxed pl-11">
                    We do not sell, trade, or otherwise transfer your personal information to outside parties except as necessary to provide our services (such as delivery services or payment processors).
                  </p>
                </section>
                
                <section className="policy-section">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                    <span className="inline-block w-8 h-8 bg-primary-100 text-primary-700 rounded-full mr-3 flex items-center justify-center">5</span>
                    Data Security
                  </h2>
                  <p className="mb-4 text-gray-700 leading-relaxed pl-11">
                    We implement appropriate security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction.
                  </p>
                </section>
                
                <section className="policy-section">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                    <span className="inline-block w-8 h-8 bg-primary-100 text-primary-700 rounded-full mr-3 flex items-center justify-center">6</span>
                    Cookies
                  </h2>
                  <p className="mb-4 text-gray-700 leading-relaxed pl-11">
                    We use cookies to enhance your experience on our website. You can set your browser to refuse cookies, but some features of our website may not function properly.
                  </p>
                </section>
                
                <section className="policy-section">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                    <span className="inline-block w-8 h-8 bg-primary-100 text-primary-700 rounded-full mr-3 flex items-center justify-center">7</span>
                    Your Rights
                  </h2>
                  <p className="mb-4 text-gray-700 leading-relaxed pl-11">
                    Under Canadian privacy laws, you have the right to access, correct, or delete your personal information. To exercise these rights, please contact us at sales@littleovenfarm.com.
                  </p>
                </section>
                
                <section className="policy-section">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                    <span className="inline-block w-8 h-8 bg-primary-100 text-primary-700 rounded-full mr-3 flex items-center justify-center">8</span>
                    Changes to This Policy
                  </h2>
                  <p className="mb-4 text-gray-700 leading-relaxed pl-11">
                    We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
                  </p>
                </section>
                
                <section className="policy-section">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                    <span className="inline-block w-8 h-8 bg-primary-100 text-primary-700 rounded-full mr-3 flex items-center justify-center">9</span>
                    Contact Us
                  </h2>
                  <p className="mb-4 text-gray-700 leading-relaxed pl-11">
                    If you have any questions about this Privacy Policy, please contact us at sales@littleovenfarm.com or by phone at (905) 745-5730.
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