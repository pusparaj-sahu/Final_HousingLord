export default function CTASection() {
  return (
    <div className="max-w-4xl mx-auto px-6 my-16" data-aos="fade-up">
      <div className="bg-gradient-to-br from-black to-[#1a1a1a] rounded-xl p-8 md:p-12 text-center shadow-lg">
        <h2 className="text-3xl md:text-4xl text-primary font-bold mb-6">Unleash Your Rental Potential</h2>
        <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
          Unlock the door to your dream rental with our exceptional collection of properties. Combining unparalleled design, cutting-edge amenities, and personalized service, we empower you to find the perfect living space that elevates your lifestyle.
        </p>
        <button className="bg-primary text-black font-bold py-3 px-8 rounded-full text-xl transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/30">
          Explore Now
        </button>
      </div>
    </div>
  );
}
