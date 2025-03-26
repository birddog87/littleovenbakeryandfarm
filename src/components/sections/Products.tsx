// src/components/sections/Products.tsx
import { useEffect, useRef } from 'react';

interface ProductsProps {
  openOrderForm: () => void;
}

const products = [
  {
    id: 1,
    name: 'Farm Fresh Eggs',
    description:
      'Locally raised, free-range eggs from happy hens. Each carton contains 12 eggs with vibrant orange yolks rich in nutrients.',
    price: '$7.00 per carton',
    deals: ['3 cartons for $18.00', '1 flat (30 eggs) for $15.00'],
    image: '/images/farm-fresh-eggs.png',
  },
  {
    id: 2,
    name: 'Crunchy Round Loaf',
    description:
      'Rustic artisanal bread with a crunchy crust and soft interior. Made with simple ingredients and slow-fermented for perfect flavor.',
    price: '$6.00 each',
    deals: ['2 for $10.00'],
    image: '/images/crunchy-round-loaf.png',
    imagePosition: 'top',
  },
  {
    id: 3,
    name: 'Sandwich Bread',
    description:
      'Soft, sliced bread perfect for sandwiches and toast. Made with unbleached flour and no preservatives or artificial ingredients.',
    price: '$7.00 each',
    deals: ['2 for $12.00'],
    image: '/images/sandwich-bread.png',
  },
  {
    id: 4,
    name: 'French Bread',
    description:
      'Traditional French baguette with a crispy exterior and light, airy interior. Perfect for dipping in olive oil or serving with cheese.',
    price: '$7.00 each',
    deals: ['2 for $12.00'],
    image: '/images/french-bread.png',
  },
  {
    id: 5,
    name: 'Sourdough Bread (Coming Soon)',
    description:
      'Tangy, slow-fermented bread with a chewy crust and airy crumb. Stay tuned for our newest loaf!',
    price: 'Coming Soon',
    deals: [],
    image: '/images/sourdough.png',
  },
  {
    id: 6,
    name: 'Hamburger Buns',
    description:
      'Indulge in our gourmet hamburger buns—pillow‑soft on the inside with a delicately crisp, golden egg wash finish. Perfectly paired with your favorite grilled burger for a sumptuous summer treat.',
    price: '$6.00 for 8 buns',
    deals: ['$10.00 for 16 buns'],
    image: '/images/hamburger-buns.png',
  },
];

export default function Products({ openOrderForm }: ProductsProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const productRefs = useRef<(HTMLDivElement | null)[]>([]);

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

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    productRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
      productRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  return (
    <section id="products" ref={sectionRef} className="py-20 bg-amber-50 opacity-0">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4 font-serif">
            Our Fresh Products
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            All our products are made fresh using quality ingredients. Pre-order for pickup or local delivery.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <div
              key={product.id}
              ref={(el) => {
                productRefs.current[index] = el;
              }}
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105 opacity-0"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="h-48 bg-primary-50 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  style={{ 
                    objectPosition: product.imagePosition === 'top' ? 'center top' : 'center center' 
                  }}
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {product.name}
                </h3>
                <p className="text-gray-600 mb-4 min-h-[80px]">
                  {product.description}
                </p>
                <div className="border-t pt-4">
                  <p className="text-primary-600 font-bold">{product.price}</p>
                  {product.deals.map((deal, i) => (
                    <p key={i} className="text-green-600 text-sm font-medium">
                      {deal}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <button
            onClick={openOrderForm}
            className="bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            Order Now
          </button>
        </div>
      </div>
    </section>
  );
}

