// Updated Footer.tsx with "Crafted by" section
export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-warm-charcoal bg-wood-texture text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <h3 className="text-xl font-bold mb-4 text-primary-100">
              The Little Oven Bakery and Farm
            </h3>
            <p className="text-gray-400 mb-4">
              Artisanal bread and farm-fresh eggs made with love in Hagersville, Ontario.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.instagram.com/thelittleovenfarm" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4 text-primary-100">Contact Us</h3>
            <p className="text-gray-400 mb-2">Phone: (905) 745-5730</p>
            <p className="text-gray-400">Email: sales@littleovenfarm.com</p>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4 text-primary-100">Hours</h3>
            <div className="flex justify-between border-b border-primary-900/30 pb-2 mb-2">
              <span className="text-gray-400">Monday - Friday</span>
              <span className="text-primary-100">Order Online Only</span>
            </div>
            <div className="flex justify-between border-b border-primary-900/30 pb-2 mb-2">
              <span className="text-gray-400">Saturday</span>
              <span className="text-primary-100">9AM - 5PM</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Sunday</span>
              <span className="text-primary-100">9AM - 5PM</span>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-primary-900/30 pt-4 text-center text-gray-400 text-sm">
          <div className="flex flex-col items-center justify-center space-y-3">
            <div>
              &copy; {currentYear} The Little Oven Bakery and Farm. All rights reserved.
            </div>
            
            <div className="flex space-x-3">
              <a href="/privacy-policy" className="hover:text-gray-300 transition-colors">Privacy Policy</a>
              <span>|</span>
              <a href="/terms-of-service" className="hover:text-gray-300 transition-colors">Terms of Service</a>
            </div>
            
            {/* Crafted by section */}
            <a 
              href="https://HAMMND.com" 
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center px-4 py-2 mt-4 rounded-full bg-black/30 hover:bg-black/50 backdrop-blur-sm transition-all duration-300"
            >
              <span className="text-gray-400 mr-2">Crafted by</span>
              <div className="flex items-center">
                <span className="font-bold bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent animate-gradientFlow">
                  HAMMND
                </span>
                <div className="ml-1.5 text-primary-400 animate-pulse">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 3L13.4101 8.82329H19.5H13.4101L12 3Z" fill="currentColor"/>
                    <path d="M12 3L10.5899 8.82329H4.5H10.5899L12 3Z" fill="currentColor"/>
                    <path d="M12 21L13.4101 15.1767H19.5H13.4101L12 21Z" fill="currentColor"/>
                    <path d="M12 21L10.5899 15.1767H4.5H10.5899L12 21Z" fill="currentColor"/>
                    <path d="M19.5 12L13.6767 13.4101V19.5V13.4101L19.5 12Z" fill="currentColor"/>
                    <path d="M19.5 12L13.6767 10.5899V4.5V10.5899L19.5 12Z" fill="currentColor"/>
                    <path d="M4.5 12L10.3233 13.4101V19.5V13.4101L4.5 12Z" fill="currentColor"/>
                    <path d="M4.5 12L10.3233 10.5899V4.5V10.5899L4.5 12Z" fill="currentColor"/>
                  </svg>
                </div>
                <div className="ml-1 text-sm opacity-70 group-hover:opacity-100 transition-opacity">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                  </svg>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}