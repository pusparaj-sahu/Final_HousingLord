import { useState, FormEvent } from "react";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // In a real application, you would send this data to your backend
    alert('Thank you for your message! Our team will get back to you soon.');
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <section id="contact" className="py-16 md:py-24 bg-black/80">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="grid md:grid-cols-2 gap-10" data-aos="fade-up">
          <div className="bg-[#1a1a1a] p-8 rounded-xl">
            <h2 className="text-3xl text-primary font-bold mb-8">Get in Touch – We're Here to Help!</h2>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <span className="text-3xl">🏠</span>
                <span className="text-lg">Housing Lord, Bhubaneswar, Odisha</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-3xl">📞</span>
                <span className="text-lg">Contact Number</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-3xl">✉</span>
                <span className="text-lg">Email Address</span>
              </div>
            </div>
            <div className="mt-8 flex gap-6">
              <a href="#" className="text-primary hover:-translate-y-1 transition-transform duration-300">Facebook</a>
              <a href="#" className="text-primary hover:-translate-y-1 transition-transform duration-300">Instagram</a>
              <a href="#" className="text-primary hover:-translate-y-1 transition-transform duration-300">LinkedIn</a>
            </div>
          </div>
          
          <div className="bg-primary/10 p-8 rounded-xl border border-primary/20">
            <form id="contactForm" onSubmit={handleSubmit}>
              <div className="mb-6">
                <label htmlFor="name" className="block text-primary mb-2">Name</label>
                <input 
                  type="text" 
                  id="name" 
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-3 bg-black/50 border border-primary text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50" 
                  required 
                />
              </div>
              <div className="mb-6">
                <label htmlFor="email" className="block text-primary mb-2">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-3 bg-black/50 border border-primary text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50" 
                  required 
                />
              </div>
              <div className="mb-6">
                <label htmlFor="phone" className="block text-primary mb-2">Phone</label>
                <input 
                  type="tel" 
                  id="phone" 
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full p-3 bg-black/50 border border-primary text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50" 
                  required 
                />
              </div>
              <div className="mb-6">
                <label htmlFor="message" className="block text-primary mb-2">Message</label>
                <textarea 
                  id="message" 
                  rows={4} 
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full p-3 bg-black/50 border border-primary text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50" 
                  required
                ></textarea>
              </div>
              <button 
                type="submit" 
                className="w-full bg-primary text-black font-bold py-3 px-4 rounded-lg transition-all hover:-translate-y-1 hover:shadow-md"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
