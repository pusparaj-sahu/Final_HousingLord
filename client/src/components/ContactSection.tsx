import { FormEvent, useState } from "react";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [formStatus, setFormStatus] = useState<null | "success" | "error">(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // In a real application, we would send the form data to a server
    console.log("Form submitted:", formData);
    
    // For demonstration, simulate success
    setFormStatus("success");
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setFormStatus(null);
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    }, 3000);
  };

  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-black to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16" data-aos="fade-up">
          <span className="text-primary font-semibold uppercase tracking-wider">Get In Touch</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-3 mb-6 text-white">Contact Us</h2>
          <p className="text-white/70 max-w-3xl mx-auto">
            Have questions about our services or need assistance finding your perfect rental?
            Our team is here to help. Reach out to us through the form below or use our contact details.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div data-aos="fade-right">
            <div className="bg-background/30 border border-primary/20 rounded-lg p-8 h-full">
              <h3 className="text-2xl font-bold text-white mb-6">Send Us A Message</h3>
              
              {formStatus === "success" && (
                <div className="bg-green-500/20 border border-green-500/50 text-white p-4 rounded-lg mb-6 flex items-center">
                  <i className="fas fa-check-circle text-green-500 mr-2 text-xl"></i>
                  <span>Your message has been sent successfully. We'll get back to you soon!</span>
                </div>
              )}
              
              {formStatus === "error" && (
                <div className="bg-red-500/20 border border-red-500/50 text-white p-4 rounded-lg mb-6 flex items-center">
                  <i className="fas fa-times-circle text-red-500 mr-2 text-xl"></i>
                  <span>There was an error sending your message. Please try again later.</span>
                </div>
              )}
              
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label htmlFor="name" className="block text-white/80 mb-2">Your Name*</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-background border border-primary/30 text-white rounded-lg focus:outline-none focus:border-primary"
                      placeholder="Ram Sharma"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-white/80 mb-2">Email Address*</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-background border border-primary/30 text-white rounded-lg focus:outline-none focus:border-primary"
                      placeholder="ram@example.com"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label htmlFor="phone" className="block text-white/80 mb-2">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-background border border-primary/30 text-white rounded-lg focus:outline-none focus:border-primary"
                      placeholder="+91 98765 43210"
                    />
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-white/80 mb-2">Subject*</label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-background border border-primary/30 text-white rounded-lg focus:outline-none focus:border-primary"
                    >
                      <option value="">Select a subject</option>
                      <option value="rental-inquiry">Rental Inquiry</option>
                      <option value="property-listing">Property Listing</option>
                      <option value="tenant-verification">Tenant Verification</option>
                      <option value="support">Technical Support</option>
                      <option value="feedback">Feedback</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="message" className="block text-white/80 mb-2">Your Message*</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 bg-background border border-primary/30 text-white rounded-lg focus:outline-none focus:border-primary resize-none"
                    placeholder="How can we help you?"
                  ></textarea>
                </div>
                
                <button 
                  type="submit"
                  className="bg-primary text-black py-3 px-8 rounded-lg font-bold hover:bg-white hover:text-primary transition-colors w-full md:w-auto"
                >
                  <i className="fas fa-paper-plane mr-2"></i> Send Message
                </button>
              </form>
            </div>
          </div>
          
          <div data-aos="fade-left">
            <div className="bg-background/30 border border-primary/20 rounded-lg p-8 h-full">
              <h3 className="text-2xl font-bold text-white mb-6">Contact Information</h3>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <i className="fas fa-map-marker-alt text-primary text-xl"></i>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-lg">Our Office Location</h4>
                    <p className="text-white/70 mt-1">
                      405, A-5, Jagannath Warriors Residency, near Infocity- II, Madanpur, Bhubaneswar, Odisha 752054
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <i className="fas fa-phone-alt text-primary text-xl"></i>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-lg">Phone Numbers</h4>
                    <p className="text-white/70 mt-1">
                      +916371636969
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <i className="fas fa-envelope text-primary text-xl"></i>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-lg">Email Addresses</h4>
                    <p className="text-white/70 mt-1">
                      info@housinglord.com<br />
                      support@housinglord.com
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <i className="fas fa-clock text-primary text-xl"></i>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-lg">Business Hours</h4>
                    <p className="text-white/70 mt-1">
                      Monday - Saturday: 9:00 AM - 7:00 PM<br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <h4 className="text-white font-semibold text-lg mb-4">Connect With Us</h4>
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
                  <a href="#" className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/30 transition-colors" aria-label="YouTube">
                    <i className="fab fa-youtube text-primary"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}