export default function CTASection() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 my-12 sm:my-16" data-aos="fade-up">
      <div className="bg-gradient-to-br from-black to-[#1a1a1a] rounded-lg sm:rounded-xl p-6 sm:p-8 md:p-12 text-center shadow-lg">
        <h2 className="text-2xl sm:text-3xl md:text-4xl text-primary font-bold mb-4 sm:mb-6">Unleash Your Rental Potential</h2>
        <p className="text-sm sm:text-base text-gray-300 mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed">
          Unlock the door to your dream rental with our exceptional collection of properties. Combining unparalleled design, cutting-edge amenities, and personalized service, we empower you to find the perfect living space that elevates your lifestyle.
        </p>
        <button className="bg-primary text-black font-bold py-2.5 sm:py-3 px-6 sm:px-8 rounded-full text-sm sm:text-base md:text-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/30 hover:bg-white hover:text-primary">
          Explore Now
        </button>
      </div>
    </div>
  );
}
