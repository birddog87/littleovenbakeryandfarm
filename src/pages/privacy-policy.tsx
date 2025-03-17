// src/pages/privacy-policy.tsx
import Head from 'next/head';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

export default function PrivacyPolicy() {
  return (
    <>
      <Head>
        <title>Privacy Policy - Little Oven Bakery and Farm</title>
      </Head>

      <Header openOrderForm={() => {}} />
      
      <main className="pt-24 pb-12 bg-amber-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl font-bold text-gray-900 mb-6 font-serif">Privacy Policy</h1>
          
          <div className="bg-white rounded-lg shadow-md p-8">
            <p className="mb-4">Last Updated: March 17, 2025</p>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-3 mt-6">1. Introduction</h2>
            <p className="mb-4">
              At Little Oven Bakery and Farm ("we," "our," or "us"), we respect your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website or place an order with us.
            </p>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-3 mt-6">2. Information We Collect</h2>
            <p className="mb-4">We may collect the following types of information:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Personal information (such as name, email address, phone number, and delivery address)</li>
              <li>Order information (products ordered, special instructions)</li>
              <li>Website usage data (such as IP address, browser type, pages visited)</li>
            </ul>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-3 mt-6">3. How We Use Your Information</h2>
            <p className="mb-4">We use your information to:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Process and fulfill your orders</li>
              <li>Communicate with you about your order</li>
              <li>Improve our website and services</li>
              <li>Send you promotional offers (only with your consent)</li>
            </ul>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-3 mt-6">4. Information Sharing</h2>
            <p className="mb-4">
              We do not sell, trade, or otherwise transfer your personal information to outside parties except as necessary to provide our services (such as delivery services or payment processors).
            </p>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-3 mt-6">5. Data Security</h2>
            <p className="mb-4">
              We implement appropriate security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction.
            </p>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-3 mt-6">6. Cookies</h2>
            <p className="mb-4">
              We use cookies to enhance your experience on our website. You can set your browser to refuse cookies, but some features of our website may not function properly.
            </p>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-3 mt-6">7. Your Rights</h2>
            <p className="mb-4">
              Under Canadian privacy laws, you have the right to access, correct, or delete your personal information. To exercise these rights, please contact us at sales@littleovenfarm.com.
            </p>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-3 mt-6">8. Changes to This Policy</h2>
            <p className="mb-4">
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
            </p>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-3 mt-6">9. Contact Us</h2>
            <p className="mb-4">
              If you have any questions about this Privacy Policy, please contact us at sales@littleovenfarm.com or by phone at (905) 745-5730.
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </>
  );
}