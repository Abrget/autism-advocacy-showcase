
import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Define the school features data
const schoolFeatures = [
  {
    id: 1,
    title: "Specialized Curriculum",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b",
    description: "Our tailored curriculum is designed to meet the unique needs of children with autism, focusing on academic, social, and life skills development.",
    highlight: "Student-centered approach"
  },
  {
    id: 2,
    title: "Sensory-Friendly Classrooms",
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c",
    description: "All our classrooms are designed with sensory considerations in mind, providing a comfortable learning environment with adjustable lighting and minimal distractions.",
    highlight: "Comfortable environment"
  },
  {
    id: 3,
    title: "Low Student-Teacher Ratio",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7",
    description: "We maintain small class sizes to ensure each student receives the individual attention and support they need to thrive academically and socially.",
    highlight: "Personalized attention"
  },
  {
    id: 4,
    title: "Integrated Therapy Services",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d",
    description: "Our school offers on-site speech, occupational, and behavioral therapy, seamlessly integrated into the school day to support holistic development.",
    highlight: "Comprehensive support"
  },
  {
    id: 5,
    title: "Parent Training Programs",
    image: "https://images.unsplash.com/photo-1543269865-cbf427effbad",
    description: "We provide parents with training and resources to help them continue supporting their child's learning and development at home.",
    highlight: "Family involvement"
  }
];

const SchoolSection = () => {
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
  
  const maxIndex = schoolFeatures.length - visibleSlides;

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
      id="our-school"
      className="py-20 bg-white" 
      style={{ 
        background: "linear-gradient(to bottom, #ffffff, #f1f0fb, #ffffff)"
      }}
    >
      <div className="container mx-auto px-6">
        <div className="text-center mb-16" data-animate>
          <div className="inline-block px-3 py-1 mb-4 rounded-full bg-autism-lightPurple text-sm font-medium text-autism-purple">
            Our Approach
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our School</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            A nurturing educational environment specifically designed to support and empower students on the autism spectrum.
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
          
          {/* School features slider */}
          <div className="overflow-hidden" ref={sliderRef}>
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * (100 / visibleSlides)}%)` }}
            >
              {schoolFeatures.map((feature) => (
                <div 
                  key={feature.id} 
                  className="w-full md:w-1/2 xl:w-1/3 flex-shrink-0 px-4"
                  style={{ flex: `0 0 ${100 / visibleSlides}%` }}
                >
                  <div className="bg-white rounded-xl shadow-md overflow-hidden h-full transition-all duration-300 hover:shadow-xl hover:translate-y-[-5px]">
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={feature.image} 
                        alt={feature.title}
                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                      />
                      <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-autism-blue/90 text-white text-xs font-medium">
                        {feature.highlight}
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-3 text-gray-800">{feature.title}</h3>
                      <p className="text-gray-600 mb-5 line-clamp-3">{feature.description}</p>
                      
                      <button className="px-5 py-2 rounded-full bg-autism-softBlue text-autism-blue font-medium hover:bg-autism-blue hover:text-white transition-colors">
                        Learn More
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
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${currentIndex === index ? 'bg-autism-blue w-6' : 'bg-gray-300'}`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
        
        <div className="text-center mt-10" data-animate>
          <button className="px-8 py-3 rounded-full bg-gradient-to-r from-autism-blue to-autism-purple text-white font-medium shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1">
            Learn About Our Approach
          </button>
        </div>
      </div>
    </section>
  );
};

export default SchoolSection;
