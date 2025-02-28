
import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Define the activities data
const activities = [
  {
    id: 1,
    title: "Sensory-Friendly Workshops",
    image: "https://images.unsplash.com/photo-1607453998774-d533f65dac99",
    description: "Interactive workshops designed for individuals with sensory sensitivities, providing a safe and comfortable environment to learn and engage.",
    date: "Every Saturday"
  },
  {
    id: 2,
    title: "Art Therapy Sessions",
    image: "https://images.unsplash.com/photo-1580060839134-75a5edca2e99",
    description: "Creative expression sessions that help individuals on the spectrum communicate emotions and develop fine motor skills through various art forms.",
    date: "Tuesdays & Thursdays"
  },
  {
    id: 3,
    title: "Family Support Groups",
    image: "https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a",
    description: "Regular meetings where families can share experiences, challenges, and solutions while building a supportive community network.",
    date: "First Monday of each month"
  },
  {
    id: 4,
    title: "Life Skills Training",
    image: "https://images.unsplash.com/photo-1556711905-ebe6437d200b",
    description: "Practical sessions focused on developing essential daily living and social skills for independent living and community integration.",
    date: "Wednesdays"
  },
  {
    id: 5,
    title: "Autism Awareness Walks",
    image: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8",
    description: "Community events that raise awareness about autism while promoting inclusion and celebrating neurodiversity through organized walks.",
    date: "Quarterly Events"
  }
];

const ActivitySection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  
  // Visible slides calculation based on window width
  const getVisibleSlides = () => {
    if (typeof window !== "undefined") {
      if (window.innerWidth >= 1280) return 3;
      if (window.innerWidth >= 768) return 2;
    }
    return 1;
  };
  
  const [visibleSlides, setVisibleSlides] = useState(getVisibleSlides());
  
  useEffect(() => {
    const handleResize = () => {
      setVisibleSlides(getVisibleSlides());
    };
    
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  
  const maxIndex = activities.length - visibleSlides;

  const nextSlide = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setCurrentIndex(prev => Math.min(prev + 1, maxIndex));
    
    setTimeout(() => setIsAnimating(false), 500);
  };

  const prevSlide = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setCurrentIndex(prev => Math.max(prev - 1, 0));
    
    setTimeout(() => setIsAnimating(false), 500);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -100px 0px" }
    );
    
    if (sectionRef.current) {
      const childElements = sectionRef.current.querySelectorAll("[data-animate]");
      childElements.forEach((el) => observer.observe(el));
    }
    
    return () => {
      if (sectionRef.current) {
        const childElements = sectionRef.current.querySelectorAll("[data-animate]");
        childElements.forEach((el) => observer.unobserve(el));
      }
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="py-20 bg-white" 
      style={{ 
        background: "linear-gradient(to bottom, #ffffff, #f9f5ff, #ffffff)"
      }}
    >
      <div className="container mx-auto px-6">
        <div className="text-center mb-16" data-animate>
          <div className="inline-block px-3 py-1 mb-4 rounded-full bg-autism-lightPurple text-sm font-medium text-autism-purple">
            Join Us
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Activities</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover a range of engaging activities designed to support, educate, and empower individuals across the autism spectrum.
          </p>
        </div>
        
        <div className="relative px-4" data-animate>
          {/* Slider navigation */}
          <button 
            onClick={prevSlide}
            disabled={currentIndex === 0}
            className={`absolute left-0 top-1/2 z-10 -translate-y-1/2 -translate-x-4 md:-translate-x-6 w-12 h-12 flex items-center justify-center rounded-full bg-white shadow-lg transition-opacity ${currentIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'opacity-100 hover:bg-gray-50'}`}
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-6 w-6 text-gray-700" />
          </button>
          
          <button 
            onClick={nextSlide}
            disabled={currentIndex >= maxIndex}
            className={`absolute right-0 top-1/2 z-10 -translate-y-1/2 translate-x-4 md:translate-x-6 w-12 h-12 flex items-center justify-center rounded-full bg-white shadow-lg transition-opacity ${currentIndex >= maxIndex ? 'opacity-50 cursor-not-allowed' : 'opacity-100 hover:bg-gray-50'}`}
            aria-label="Next slide"
          >
            <ChevronRight className="h-6 w-6 text-gray-700" />
          </button>
          
          {/* Activity slider */}
          <div className="overflow-hidden" ref={sliderRef}>
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * (100 / visibleSlides)}%)` }}
            >
              {activities.map((activity) => (
                <div 
                  key={activity.id} 
                  className="w-full md:w-1/2 xl:w-1/3 flex-shrink-0 px-4"
                  style={{ flex: `0 0 ${100 / visibleSlides}%` }}
                >
                  <div className="bg-white rounded-xl shadow-md overflow-hidden h-full transition-all duration-300 hover:shadow-xl hover:translate-y-[-5px]">
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={activity.image} 
                        alt={activity.title}
                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                      />
                      <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-autism-purple/90 text-white text-xs font-medium">
                        {activity.date}
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-3 text-gray-800">{activity.title}</h3>
                      <p className="text-gray-600 mb-5 line-clamp-3">{activity.description}</p>
                      
                      <button className="px-5 py-2 rounded-full bg-autism-softBlue text-autism-blue font-medium hover:bg-autism-blue hover:text-white transition-colors">
                        Read More
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Slider indicators */}
          <div className="flex justify-center mt-8 space-x-2">
            {Array.from({ length: maxIndex + 1 }).map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  if (!isAnimating) {
                    setIsAnimating(true);
                    setCurrentIndex(index);
                    setTimeout(() => setIsAnimating(false), 500);
                  }
                }}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${currentIndex === index ? 'bg-autism-purple w-6' : 'bg-gray-300'}`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
        
        <div className="text-center mt-10" data-animate>
          <button className="px-8 py-3 rounded-full bg-gradient-to-r from-autism-purple to-autism-blue text-white font-medium shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1">
            View All Activities
          </button>
        </div>
      </div>
    </section>
  );
};

export default ActivitySection;
