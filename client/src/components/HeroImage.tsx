export default function HeroImage() {
  return (
    <section className="relative w-full h-screen overflow-hidden">
      <div className="relative w-full h-full" data-aos="fade-up">
        <img 
          src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" 
          alt="Luxury Housing" 
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center text-center px-4 md:px-20">
          <h2 className="text-4xl md:text-5xl lg:text-6xl text-primary uppercase font-bold mb-4">
            Experience Luxury Living
          </h2>
          <p className="text-lg md:text-xl lg:text-2xl text-white max-w-3xl mx-auto">
            Discover properties that redefine modern comfort and elegance
          </p>
        </div>
      </div>
    </section>
  );
}
