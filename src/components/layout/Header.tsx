// src/components/layout/Header.tsx
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

interface HeaderProps {
  openOrderForm: () => void;
}

export default function Header({ openOrderForm }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();
  
  // Check if we're on a legal page
  const isLegalPage =
    router.pathname === '/privacy-policy' ||
    router.pathname === '/terms-of-service';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle nav link clicks for Home, Products, About
  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    target: string
  ) => {
    if (router.pathname !== '/') {
      e.preventDefault();
      if (target === 'home') {
        router.push('/');
      } else {
        router.push(`/#${target}`);
      }
    }
  };

  // Updated Order Now click handler using a query parameter
  const handleOrderNowClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (router.pathname !== '/') {
      e.preventDefault();
      router.push({
        pathname: '/',
        query: { order: 'true' }
      });
    } else {
      openOrderForm();
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || isLegalPage ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        {/* Top bar */}
        <div className="flex justify-between items-center">
          {/* Logo area */}
          <div className="flex items-center">
            <div className="h-10 w-10 mr-3 relative overflow-hidden rounded-full">
              <div className="absolute inset-0 bg-primary-100 flex items-center justify-center">
                <span className="text-primary-700 text-lg font-bold">LO</span>
              </div>
            </div>
            <h1
              className={`font-serif font-bold text-xl md:text-2xl transition-colors duration-300 ${
                scrolled || isLegalPage ? 'text-primary-700' : 'text-white text-shadow'
              }`}
            >
              The Little Oven Bakery and Farm
            </h1>
          </div>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center space-x-6">
            {['Home', 'Products', 'About'].map((item) => (
              <a
                key={item}
                href={item === 'Home' ? '/' : `/#${item.toLowerCase()}`}
                className={`font-medium transition-colors duration-300 hover:text-primary-600 ${
                  scrolled || isLegalPage ? 'text-gray-700' : 'text-white text-shadow-sm'
                }`}
                onClick={(e) => handleNavClick(e, item.toLowerCase())}
              >
                {item}
              </a>
            ))}
            <button
              onClick={handleOrderNowClick}
              className="transform hover:scale-105 transition-all duration-300 bg-primary-600 hover:bg-primary-700 text-white font-bold py-2 px-4 rounded-full shadow-md hover:shadow-lg"
            >
              Order Now
            </button>
          </nav>

          {/* Mobile menu button */}
          <button
            className={`md:hidden ${scrolled || isLegalPage ? 'text-primary-700' : 'text-white'}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 py-4 bg-white rounded-lg shadow-lg animate-fadeIn">
            <div className="flex flex-col space-y-3 px-4">
              {['Home', 'Products', 'About'].map((item) => (
                <a
                  key={item}
                  href={item === 'Home' ? '/' : `/#${item.toLowerCase()}`}
                  className="text-gray-700 hover:text-primary-600 font-medium py-2"
                  onClick={(e) => {
                    setMobileMenuOpen(false);
                    handleNavClick(e, item.toLowerCase());
                  }}
                >
                  {item}
                </a>
              ))}
              <button
                onClick={(e) => {
                  setMobileMenuOpen(false);
                  handleOrderNowClick(e);
                }}
                className="bg-primary-600 hover:bg-primary-700 text-white font-bold py-2 px-4 rounded-md w-full mt-2"
              >
                Order Now
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
