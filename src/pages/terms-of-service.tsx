// src/pages/terms-of-service.tsx
import Head from 'next/head';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

export default function TermsOfService() {
  return (
    <>
      <Head>
        <title>Terms of Service - Little Oven Bakery and Farm</title>
      </Head>

      <Header openOrderForm={() => {}} />
      
      <main className="pt-24 pb-12 bg-amber-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl font-bold text-gray-900 mb-6 font-serif">Terms of Service</h1>
          
          <div className="bg-white rounded-lg shadow-md p-8">
            <p className="mb-4">Last Updated: March 17, 2025</p>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-3 mt-6">1. Agreement to Terms</h2>
            <p className="mb-4">
              By accessing and using Little Oven Bakery and Farm's website and services, you agree to be bound by these Terms of Service and all applicable laws and regulations.
            </p>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-3 mt-6">2. Order Placement and Fulfillment</h2>
            <p className="mb-4">
              Orders placed through our website are subject to availability and acceptance. We reserve the right to limit quantities or refuse service to anyone. Orders are typically ready for pickup during our designated pickup hours on weekends. Delivery is available within a 20km radius of Hagersville, Ontario.
            </p>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-3 mt-6">3. Pricing and Payment</h2>
            <p className="mb-4">
              All prices are in Canadian dollars and do not include applicable taxes. Payment is collected at the time of pickup or delivery. We accept cash and e-transfer payments.
            </p>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-3 mt-6">4. Food Safety and Allergies</h2>
            <p className="mb-4">
              We prepare our products in a home kitchen that may contain common allergens including wheat, dairy, eggs, and nuts. While we take reasonable precautions, we cannot guarantee that our products are free from allergens. Please inform us of any allergies when placing your order.
            </p>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-3 mt-6">5. Order Cancellation</h2>
            <p className="mb-4">
              To cancel or modify an order, please contact us at least 24 hours before your scheduled pickup or delivery time. Orders canceled with less notice may be subject to a cancellation fee.
            </p>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-3 mt-6">6. Intellectual Property</h2>
            <p className="mb-4">
              All content on this website, including text, graphics, logos, and images, is the property of Little Oven Bakery and Farm and is protected by Canadian copyright laws.
            </p>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-3 mt-6">7. Limitation of Liability</h2>
            <p className="mb-4">
              Little Oven Bakery and Farm shall not be liable for any direct, indirect, incidental, special, or consequential damages that result from the use of, or the inability to use, our products or services.
            </p>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-3 mt-6">8. Changes to Terms</h2>
            <p className="mb-4">
              We reserve the right to modify these Terms of Service at any time. We will notify users of any changes by updating the date at the top of this page.
            </p>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-3 mt-6">9. Governing Law</h2>
            <p className="mb-4">
              These Terms of Service are governed by and construed in accordance with the laws of Ontario, Canada.
            </p>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-3 mt-6">10. Contact Us</h2>
            <p className="mb-4">
              If you have any questions about these Terms of Service, please contact us at sales@littleovenfarm.com or by phone at (905) 745-5730.
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </>
  );
}