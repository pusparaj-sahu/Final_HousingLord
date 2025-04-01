export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background py-16 border-t border-primary/20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <h3 className="text-white text-xl font-bold mb-6">Housing Lord</h3>
            <p className="text-white/70 mb-6">
              Connecting property owners with verified tenants across Odisha. Simplifying
              the rental process with transparency, security, and exceptional service.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/30 transition-colors" aria-label="Facebook">
                <i className="fab fa-facebook-f text-primary"></i>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/30 transition-colors" aria-label="Twitter">
                <i className="fab fa-twitter text-primary"></i>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/30 transition-colors" aria-label="Instagram">
                <i className="fab fa-instagram text-primary"></i>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/30 transition-colors" aria-label="LinkedIn">
                <i className="fab fa-linkedin-in text-primary"></i>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-white text-xl font-bold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-white/70 hover:text-primary transition-colors">Home</a>
              </li>
              <li>
                <a href="#properties" className="text-white/70 hover:text-primary transition-colors">Properties</a>
              </li>
              <li>
                <a href="#how-it-works" className="text-white/70 hover:text-primary transition-colors">How It Works</a>
              </li>
              <li>
                <a href="#about" className="text-white/70 hover:text-primary transition-colors">About Us</a>
              </li>
              <li>
                <a href="#faq" className="text-white/70 hover:text-primary transition-colors">FAQs</a>
              </li>
              <li>
                <a href="#contact" className="text-white/70 hover:text-primary transition-colors">Contact</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white text-xl font-bold mb-6">Services</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-white/70 hover:text-primary transition-colors">Property Listing</a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-primary transition-colors">Tenant Verification</a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-primary transition-colors">Rental Agreements</a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-primary transition-colors">Professional Photography</a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-primary transition-colors">Property Management</a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-primary transition-colors">Legal Consultation</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white text-xl font-bold mb-6">Newsletter</h3>
            <p className="text-white/70 mb-4">
              Subscribe to our newsletter for the latest property listings and rental tips.
            </p>
            <form className="flex flex-col sm:flex-row gap-2">
              <input 
                type="email" 
                placeholder="Your Email" 
                className="px-4 py-3 bg-background border border-primary/30 text-white rounded-lg focus:outline-none focus:border-primary"
              />
              <button 
                type="submit"
                className="px-4 py-3 bg-primary text-black rounded-lg font-bold hover:bg-white hover:text-primary transition-colors"
              >
                Subscribe
              </button>
            </form>
            <p className="text-white/50 text-sm mt-4">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>
        
        <div className="border-t border-primary/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/70 mb-4 md:mb-0">
            &copy; {currentYear} Housing Lord. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <a href="#" className="text-white/70 hover:text-primary transition-colors text-sm">
              Privacy Policy
            </a>
            <a href="#" className="text-white/70 hover:text-primary transition-colors text-sm">
              Terms of Service
            </a>
            <a href="#" className="text-white/70 hover:text-primary transition-colors text-sm">
              Cookie Policy
            </a>
            <a href="#" className="text-white/70 hover:text-primary transition-colors text-sm">
              Sitemap
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}