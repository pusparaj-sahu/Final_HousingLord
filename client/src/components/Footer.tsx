export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background py-12 sm:py-16 border-t border-primary/20">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
          {/* Company Info */}
          <div className="sm:col-span-2 lg:col-span-1">
            <h3 className="text-lg sm:text-xl text-white font-bold mb-4 sm:mb-6">Housing Lord</h3>
            <p className="text-sm sm:text-base text-white/70 mb-6">
              Connecting property owners with verified tenants across Odisha. Simplifying
              the rental process with transparency, security, and exceptional service.
            </p>
            <div className="flex space-x-3 sm:space-x-4">
              <a href="#" className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/30 transition-colors" aria-label="Facebook">
                <i className="fab fa-facebook-f text-primary text-sm sm:text-base"></i>
              </a>
              <a href="#" className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/30 transition-colors" aria-label="Twitter">
                <i className="fab fa-twitter text-primary text-sm sm:text-base"></i>
              </a>
              <a href="#" className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/30 transition-colors" aria-label="Instagram">
                <i className="fab fa-instagram text-primary text-sm sm:text-base"></i>
              </a>
              <a href="#" className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/30 transition-colors" aria-label="LinkedIn">
                <i className="fab fa-linkedin-in text-primary text-sm sm:text-base"></i>
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg sm:text-xl text-white font-bold mb-4 sm:mb-6">Quick Links</h3>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <a href="#" className="text-sm sm:text-base text-white/70 hover:text-primary transition-colors">Home</a>
              </li>
              <li>
                <a href="#properties" className="text-sm sm:text-base text-white/70 hover:text-primary transition-colors">Properties</a>
              </li>
              <li>
                <a href="#how-it-works" className="text-sm sm:text-base text-white/70 hover:text-primary transition-colors">How It Works</a>
              </li>
              <li>
                <a href="#about" className="text-sm sm:text-base text-white/70 hover:text-primary transition-colors">About Us</a>
              </li>
              <li>
                <a href="#faq" className="text-sm sm:text-base text-white/70 hover:text-primary transition-colors">FAQs</a>
              </li>
              <li>
                <a href="#contact" className="text-sm sm:text-base text-white/70 hover:text-primary transition-colors">Contact</a>
              </li>
            </ul>
          </div>
          
          {/* Services */}
          <div>
            <h3 className="text-lg sm:text-xl text-white font-bold mb-4 sm:mb-6">Services</h3>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <a href="#" className="text-sm sm:text-base text-white/70 hover:text-primary transition-colors">Property Listing</a>
              </li>
              <li>
                <a href="#" className="text-sm sm:text-base text-white/70 hover:text-primary transition-colors">Tenant Verification</a>
              </li>
              <li>
                <a href="#" className="text-sm sm:text-base text-white/70 hover:text-primary transition-colors">Rental Agreements</a>
              </li>
              <li>
                <a href="#" className="text-sm sm:text-base text-white/70 hover:text-primary transition-colors">Professional Photography</a>
              </li>
              <li>
                <a href="#" className="text-sm sm:text-base text-white/70 hover:text-primary transition-colors">Property Management</a>
              </li>
              <li>
                <a href="#" className="text-sm sm:text-base text-white/70 hover:text-primary transition-colors">Legal Consultation</a>
              </li>
            </ul>
          </div>
          
          {/* Newsletter */}
          <div className="sm:col-span-2 lg:col-span-1">
            <h3 className="text-lg sm:text-xl text-white font-bold mb-4 sm:mb-6">Newsletter</h3>
            <p className="text-sm sm:text-base text-white/70 mb-4">
              Subscribe to our newsletter for the latest property listings and rental tips.
            </p>
            <form className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              <input 
                type="email" 
                placeholder="Your Email" 
                className="px-3 sm:px-4 py-2.5 sm:py-3 bg-background border border-primary/30 text-white rounded-lg focus:outline-none focus:border-primary text-sm sm:text-base"
              />
              <button 
                type="submit"
                className="px-3 sm:px-4 py-2.5 sm:py-3 bg-primary text-black rounded-lg font-bold hover:bg-white hover:text-primary transition-colors text-sm sm:text-base whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
            <p className="text-xs sm:text-sm text-white/50 mt-3 sm:mt-4">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>
        
        {/* Bottom Section */}
        <div className="border-t border-primary/10 mt-8 sm:mt-12 pt-6 sm:pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0">
          <p className="text-sm text-white/70 text-center sm:text-left">
            &copy; {currentYear} Housing Lord. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
            <a href="#" className="text-xs sm:text-sm text-white/70 hover:text-primary transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-xs sm:text-sm text-white/70 hover:text-primary transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-xs sm:text-sm text-white/70 hover:text-primary transition-colors">
              Cookie Policy
            </a>
            <a href="#" className="text-xs sm:text-sm text-white/70 hover:text-primary transition-colors">
              Sitemap
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}