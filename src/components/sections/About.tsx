import { useEffect, useRef } from 'react';

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fadeIn');
          }
        });
      },
      { threshold: 0.1 }
    );
    
    if (sectionRef.current) observer.observe(sectionRef.current);
    if (contentRef.current) observer.observe(contentRef.current);
    if (contactRef.current) observer.observe(contactRef.current);
    
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
      if (contentRef.current) observer.unobserve(contentRef.current);
      if (contactRef.current) observer.unobserve(contactRef.current);
    };
  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-20 bg-primary-50 opacity-0">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4 font-serif">Our Story</h2>
            <div className="w-24 h-1 bg-primary-600 mx-auto"></div>
          </div>
          
          <div ref={contentRef} className="prose prose-lg mx-auto opacity-0">
            <p className="mb-6 text-gray-700 leading-relaxed">
              Welcome to The Little Oven Bakery and Farm, a small artisanal bakery nestled in the beautiful countryside of Hagersville, Ontario. 
              Our journey began with a simple passion for creating delicious, wholesome bread using traditional methods
              and the freshest ingredients.
            </p>
            
            <div className="flex flex-col md:flex-row gap-8 my-12">
              <div className="md:w-1/2">
                <h3 className="text-2xl font-bold text-primary-700 mb-4">Our Philosophy</h3>
                <p className="text-gray-700">
                  Every loaf is handcrafted with care in our home kitchen, using simple ingredients and time-honored 
                  techniques. We believe that good bread takes time, which is why our doughs are slow-fermented to 
                  develop rich flavors and perfect textures.
                </p>
              </div>
              <div className="md:w-1/2">
                <h3 className="text-2xl font-bold text-primary-700 mb-4">Our Chickens</h3>
                <p className="text-gray-700">
                  In addition to our artisanal bread, we offer farm-fresh eggs from our own free-range hens. Our chickens 
                  are raised with love, given access to sunshine, fresh air, and natural feed, resulting in eggs with 
                  vibrant orange yolks and exceptional flavor.
                </p>
              </div>
            </div>
            
            <div ref={contactRef} className="bg-white p-8 rounded-lg shadow-md border border-primary-100 mt-12 relative overflow-hidden opacity-0">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary-100 rounded-full transform translate-x-16 -translate-y-16"></div>
              <div className="relative">
                <h3 className="text-2xl font-bold text-primary-700 mb-6">Visit Us</h3>
                <div className="flex flex-col md:flex-row gap-12">
                  <div>
                    <p className="font-bold text-gray-800 mb-2">Address:</p>
                    <p className="text-gray-700">
                      107 Concession 17 Walpole<br />
                      Wilsonville, Ontario N0E 1H0<br />
                      Canada
                    </p>
                  </div>
                  <div>
                    <p className="font-bold text-gray-800 mb-2">Contact:</p>
                    <p className="text-gray-700">
                      Phone: (905) 745-5730<br />
                      Email: sales@littleovenfarm.com
                    </p>
                  </div>
                  <div>
                    <p className="font-bold text-gray-800 mb-2">Hours:</p>
                    <p className="text-gray-700">
                      Monday - Friday: 8AM - 5PM<br />
                      Saturday: 9AM - 3PM<br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}