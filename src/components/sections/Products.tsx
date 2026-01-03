// src/components/sections/Products.tsx
import { useEffect, useRef } from 'react';

interface ProductsProps {
 openOrderForm: () => void;
}

interface Product {
 id: number;
 name: string;
 description: string;
 price: string;
 deals: string[];
 image: string;
 imagePosition?: string;
}

const products: Product[] = [
 {
   id: 1,
   name: 'Farm Fresh Eggs',
   description:
     'Locally raised, free-range eggs from happy hens. Each carton contains 12 eggs with vibrant orange yolks rich in nutrients.',
   price: '$7.00 per carton',
   deals: ['3 cartons for $18.00', '1 flat (30 eggs) for $15.00'],
   image: '/images/farm-fresh-eggs.jpg',
 },
 {
   id: 2,
   name: 'Crunchy Round Loaf',
   description:
     'Rustic artisanal bread with a crunchy crust and soft interior. Made with simple ingredients and slow-fermented for perfect flavor.',
   price: '$6.00 each',
   deals: ['2 for $10.00'],
   image: '/images/crunchy-round-loaf.jpg',
   imagePosition: 'center 70%',  // More specific positioning value
 },
 {
   id: 3,
   name: 'Sandwich Bread',
   description:
     'Soft, sliced bread perfect for sandwiches and toast. Made with unbleached flour and no preservatives or artificial ingredients.',
   price: '$7.00 each',
   deals: ['2 for $12.00'],
   image: '/images/sandwich-bread.jpg',
 },
 {
   id: 4,
   name: 'French Bread',
   description:
     'Traditional French baguette with a crispy exterior and light, airy interior. Perfect for dipping in olive oil or serving with cheese.',
   price: '$7.00 each',
   deals: ['2 for $12.00'],
   image: '/images/french-bread1.jpg',
 },
 {
   id: 5,
   name: 'Sourdough Bread (Coming Soon)',
   description:
     'Tangy, slow-fermented bread with a chewy crust and airy crumb. Stay tuned for our newest loaf!',
   price: 'Coming Soon',
   deals: [],
   image: '/images/sourdough.jpg',
   imagePosition: 'center 70%',
 },
 {
   id: 6,
   name: 'Hamburger Buns',
   description:
     'Indulge in our gourmet hamburger buns—pillow‑soft on the inside with a delicately crisp, golden egg wash finish. Perfectly paired with your favorite grilled burger for a sumptuous summer treat.',
   price: '$6.00 for 8 buns',
   deals: ['$10.00 for 16 buns'],
   image: '/images/hamburger-buns.jpg',
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
   <section id="products" ref={sectionRef} className="py-20 bg-warm-cream bg-linen-texture relative opacity-0">
     <div className="container mx-auto px-4">
       <div className="text-center mb-16">
         <h2 className="text-4xl md:text-5xl font-bold text-amber-900 mb-4 font-serif">
           Our Fresh Products
         </h2>
         <div className="divider-wheat w-32 mx-auto mb-6"></div>
         <p className="text-xl text-amber-800/90 max-w-2xl mx-auto">
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
             className="bg-gradient-to-b from-amber-50/80 to-orange-50/60 rounded-xl overflow-hidden shadow-rustic-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 opacity-0 border-2 border-amber-200/60 ring-1 ring-amber-900/5"
             style={{ animationDelay: `${index * 150}ms` }}
           >
             <div className="h-48 bg-gradient-to-br from-amber-100/50 to-orange-100/30 overflow-hidden">
             <img
               src={product.image}
               alt={product.name}
               className="w-full h-full object-cover"
               style={{ 
                 objectPosition: product.imagePosition || 'center center' 
               }}
             />
             </div>
             <div className="p-6">
               <h3 className="text-xl font-bold text-amber-900 mb-2">
                 {product.name}
               </h3>
               <p className="text-amber-800/80 mb-4 min-h-[80px]">
                 {product.description}
               </p>
               <div className="border-t-2 border-amber-200/60 pt-4">
                 <p className="text-primary-700 font-bold text-lg">{product.price}</p>
                 {product.deals.map((deal, i) => (
                   <p key={i} className="text-green-700 text-sm font-semibold">
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