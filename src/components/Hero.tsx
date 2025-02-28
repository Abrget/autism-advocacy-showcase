
import { useEffect, useRef } from "react";

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in");
          }
        });
      },
      { threshold: 0.1 }
    );
    
    if (heroRef.current) {
      const childElements = heroRef.current.querySelectorAll("[data-animate]");
      childElements.forEach((el) => observer.observe(el));
    }
    
    return () => {
      if (heroRef.current) {
        const childElements = heroRef.current.querySelectorAll("[data-animate]");
        childElements.forEach((el) => observer.unobserve(el));
      }
    };
  }, []);

  return (
    <section 
      ref={heroRef}
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ 
        background: "linear-gradient(109.6deg, rgba(223,234,247,1) 11.2%, rgba(244,248,252,1) 91.1%)"
      }}
    >
      {/* Decorative circles */}
      <div className="absolute top-1/4 right-[10%] w-64 h-64 rounded-full bg-autism-lightPurple/40 blur-xl animate-float" />
      <div className="absolute bottom-1/4 left-[5%] w-48 h-48 rounded-full bg-autism-softBlue/30 blur-xl animate-pulse-slow" />
      
      <div className="container mx-auto px-6 py-16 pt-32 md:pt-16 flex flex-col md:flex-row items-center z-10">
        <div className="md:w-1/2 mb-10 md:mb-0 md:pr-10" data-animate>
          <div className="inline-block px-3 py-1 mb-4 rounded-full bg-autism-softGreen text-sm font-medium text-autism-purple">
            Understanding Together
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Supporting the <span className="text-gradient">Autism Community</span> with Compassion
          </h1>
          <p className="text-gray-600 text-lg mb-8 max-w-lg">
            Fostering understanding, providing resources, and creating a world where everyone on the autism spectrum can thrive.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="px-8 py-3 rounded-full bg-autism-purple text-white font-medium hover:bg-opacity-90 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-1">
              Get Involved
            </button>
            <button className="px-8 py-3 rounded-full bg-white text-autism-purple font-medium border border-autism-purple hover:bg-autism-lightPurple transition-all">
              Learn More
            </button>
          </div>
        </div>
        
        <div className="md:w-1/2 relative" data-animate>
          <div className="relative z-10 bg-white rounded-2xl shadow-xl overflow-hidden transform hover-scale">
            <img 
              src="https://images.unsplash.com/photo-1618160702438-9b02ab6515c9" 
              alt="Children playing together" 
              className="w-full h-auto"
              style={{ maxHeight: "500px", objectFit: "cover" }}
            />
          </div>
          <div className="absolute -bottom-6 -right-6 w-64 h-64 bg-autism-purple/10 rounded-full blur-xl -z-10" />
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,96L80,85.3C160,75,320,53,480,53.3C640,53,800,75,960,80C1120,85,1280,75,1360,69.3L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z" 
                fill="#FFFFFF"/>
        </svg>
      </div>
    </section>
  );
};

export default Hero;
