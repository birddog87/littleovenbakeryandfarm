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
    <div className="bg-primary-50 rounded-lg shadow-md p-6 md:p-8">
      <h3 className="text-2xl font-bold text-primary-700 mb-4">Stay Updated</h3>
      <p className="text-gray-700 mb-6">
        Subscribe to our newsletter for updates on new products, special offers, and seasonal treats.
      </p>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <div className="relative">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              className="w-full border border-gray-300 rounded-md py-3 px-4 pr-10 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              disabled={status === 'loading' || status === 'success'}
            />
            {status === 'loading' && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <div className="w-5 h-5 border-2 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
              </div>
            )}
          </div>
        </div>
        
        {message && (
          <div className={`text-sm ${status === 'success' ? 'text-green-600' : 'text-red-600'}`}>
            {message}
          </div>
        )}
        
        <button
          type="submit"
          disabled={status === 'loading' || status === 'success'}
          className={`w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 px-4 rounded-md transition-colors ${
            (status === 'loading' || status === 'success') ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {status === 'success' ? 'Subscribed!' : 'Subscribe'}
        </button>
      </form>
    </div>
  );
}