export default function Footer() {
  return (
    <footer className="bg-black text-white pt-16">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          <div>
            <h3 className="text-primary text-xl font-semibold mb-6 relative pb-2 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-16 after:bg-primary">
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li><a href="#home" className="text-white hover:text-primary transition-all hover:translate-x-1 inline-block">Home</a></li>
              <li><a href="#about-housing-lord" className="text-white hover:text-primary transition-all hover:translate-x-1 inline-block">About Us</a></li>
              <li><a href="#properties" className="text-white hover:text-primary transition-all hover:translate-x-1 inline-block">Properties</a></li>
              <li><a href="#contact" className="text-white hover:text-primary transition-all hover:translate-x-1 inline-block">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-primary text-xl font-semibold mb-6 relative pb-2 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-16 after:bg-primary">
              Services
            </h3>
            <ul className="space-y-3">
              <li><a href="#services" className="text-white hover:text-primary transition-all hover:translate-x-1 inline-block">Rental Services</a></li>
              <li><a href="#services" className="text-white hover:text-primary transition-all hover:translate-x-1 inline-block">Property Listing</a></li>
              <li><a href="#services" className="text-white hover:text-primary transition-all hover:translate-x-1 inline-block">Tenant Verification</a></li>
              <li><a href="#services" className="text-white hover:text-primary transition-all hover:translate-x-1 inline-block">Documentation</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-primary text-xl font-semibold mb-6 relative pb-2 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-16 after:bg-primary">
              Follow Us
            </h3>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-white hover:text-primary hover:-translate-y-1 transition-all hover:bg-primary/20">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-white hover:text-primary hover:-translate-y-1 transition-all hover:bg-primary/20">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-white hover:text-primary hover:-translate-y-1 transition-all hover:bg-primary/20">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
      
      <div className="py-6 bg-black border-t border-primary/10 mt-10">
        <div className="container mx-auto px-6">
          <p className="text-center text-gray-500 text-sm">&copy; {new Date().getFullYear()} Housing Lord | All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
