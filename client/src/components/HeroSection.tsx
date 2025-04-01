export default function HeroSection() {
  return (
    <section id="home" className="flex flex-col justify-center items-center text-center h-screen bg-gradient-to-br from-black to-[#1a1a1a] px-6 overflow-hidden">
      <h1 
        id="hero-title" 
        className="text-4xl md:text-5xl lg:text-6xl text-primary uppercase mb-4 transform translate-y-10 opacity-0 transition-all"
      >
        Find Your Dream Rental Home or List Your Property
      </h1>
      <p 
        id="hero-subtitle" 
        className="text-lg md:text-xl lg:text-2xl text-white mb-8 max-w-3xl mx-auto transform translate-y-10 opacity-0 transition-all delay-300"
      >
        Odisha's most trusted rental service connecting house owners with verified tenants. Simple, transparent, and hassle-free rentals!
      </p>
      <div 
        className="hero-buttons flex flex-col md:flex-row gap-4 md:gap-6 mt-8 transform translate-y-10 opacity-0 transition-all delay-500 w-full max-w-md"
      >
        <button 
          id="find-home-btn" 
          className="hero-btn bg-primary text-black py-3 px-6 rounded-full font-bold text-lg hover:scale-105 transition-transform duration-300 hover:shadow-lg hover:shadow-primary/30 w-full md:w-auto"
        >
          🔎 Find a Home
        </button>
        <button 
          id="list-property-btn" 
          className="hero-btn bg-primary text-black py-3 px-6 rounded-full font-bold text-lg hover:scale-105 transition-transform duration-300 hover:shadow-lg hover:shadow-primary/30 w-full md:w-auto"
        >
          🏠 List Your Property
        </button>
      </div>
    </section>
  );
}
