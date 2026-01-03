// src/components/Newsletter.tsx
import { useState } from 'react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      setMessage('Please enter your email address');
      setStatus('error');
      return;
    }

    try {
      setStatus('loading');
      
      const response = await fetch('/api/subscribe-newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setEmail('');
        setMessage(data.message);
        setStatus('success');
      } else {
        setMessage(data.message || 'Something went wrong. Please try again.');
        setStatus('error');
      }
    } catch (error) {
      console.error('Error subscribing to newsletter:', error);
      setMessage('Network error. Please try again later.');
      setStatus('error');
    }
  };

  return (
    <section className="py-12 bg-aged-parchment bg-paper-grain relative">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4 font-serif">Stay Updated</h2>
          <div className="divider-wheat w-24 mx-auto mb-6"></div>
          <p className="text-xl text-gray-800 mb-8">
            Subscribe to our newsletter for updates on new products, special offers, and seasonal treats.
          </p>
          
          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="flex-grow relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="w-full bg-white/80 border-2 border-primary-300/50 rounded-md py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 focus:bg-white shadow-rustic"
                  disabled={status === 'loading' || status === 'success'}
                />
                {status === 'loading' && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <div className="w-5 h-5 border-2 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
                  </div>
                )}
              </div>
              
              <button
                type="submit"
                disabled={status === 'loading' || status === 'success'}
                className={`bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 px-6 rounded-md transition-colors ${
                  (status === 'loading' || status === 'success') ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {status === 'success' ? 'Subscribed!' : 'Subscribe'}
              </button>
            </div>
            
            {message && (
              <div className={`text-sm mt-2 ${status === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                {message}
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}