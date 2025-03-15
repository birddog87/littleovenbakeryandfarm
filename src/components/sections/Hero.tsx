import { useEffect, useRef } from 'react';

interface HeroProps {
  openOrderForm: () => void;
}

export default function Hero({ openOrderForm }: HeroProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleScroll = () => {
      if (!heroRef.current) return;
      const scrollPosition = window.scrollY;
      const opacity = 1 - Math.min(0.5, scrollPosition / 1000); // Less aggressive fade
      const translateY = scrollPosition * 0.2; // Reduced parallax effect
      
      heroRef.current.style.opacity = opacity.toString();
      heroRef.current.style.transform = `translateY(${translateY}px)`;
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background image with parallax effect - Reduced darkness */}
      <div className="absolute inset-0 bg-cover bg-center" style={{ 
        backgroundImage: 'url(/images/hero-bg.jpg)',
        filter: 'brightness(0.85)' // Increased brightness from 0.7
      }}></div>
      
      {/* Hero content */}
      <div ref={heroRef} className="relative z-10 text-center px-4 max-w-4xl mx-auto transition-all duration-300">
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-white mb-6 font-serif drop-shadow-lg animate-fadeInDown">
          <span className="block">Fresh, Artisanal</span>
          <span className="block text-primary-100">Bread & Eggs</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-white mb-8 max-w-2xl mx-auto leading-relaxed animate-fadeInUp opacity-90">
          Handcrafted bread and farm-fresh eggs from our family to yours. 
          Made with love in Hagersville, Ontario.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fadeInUp animation-delay-300">
          <button 
            onClick={openOrderForm}
            className="bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            Order Now
          </button>
          
          <a 
            href="#products"
            className="bg-white bg-opacity-30 hover:bg-opacity-40 backdrop-blur-sm text-white font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            See Products
          </a>
        </div>
        
        <div className="absolute bottom-10 left-0 right-0 animate-bounce">
          <a href="#products" className="inline-block">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}