// src/components/layout/Footer.tsx 
export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <h3 className="text-xl font-bold mb-4 text-primary-100">The Little Oven Bakery and Farm</h3>
            <p className="text-gray-400 mb-4">
              Artisanal bread and farm-fresh eggs made with love in Hagersville, Ontario.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                </svg>
              </a>
               <a href="https://www.instagram.com/thelittleovenfarm?" className="text-gray-400 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4 text-primary-100">Contact Us</h3>
            <p className="text-gray-400 mb-2">107 Concession 17 Walpole</p>
            <p className="text-gray-400 mb-2">Wilsonville, Ontario N0E 1H0</p>
            <p className="text-gray-400 mb-2">Canada</p>
            <p className="text-gray-400 mb-2">Phone: (905) 745-5730</p>
            <p className="text-gray-400">Email: sales@littleovenfarm.com</p>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4 text-primary-100">Hours</h3>
            <div className="flex justify-between border-b border-gray-700 pb-2 mb-2">
              <span className="text-gray-400">Monday - Friday</span>
              <span className="text-white">Order Online Only</span>
            </div>
            <div className="flex justify-between border-b border-gray-700 pb-2 mb-2">
              <span className="text-gray-400">Saturday</span>
              <span className="text-white">9AM - 5PM</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Sunday</span>
              <span className="text-white">9AM - 5PM</span>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-4 border-t border-gray-800 text-center">
          <div className="flex justify-center space-x-6">
            <a href="/privacy-policy" className="text-gray-400 hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="/terms-of-service" className="text-gray-400 hover:text-white transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-800 text-center">
          <p className="text-gray-500">&copy; {currentYear} The Little Oven Bakery and Farm. All rights reserved.</p>
          <p className="text-gray-600 mt-2 text-sm">Handcrafted with love in Hagersville, Ontario</p>
        </div>
      </div>
    </footer>
  );
}