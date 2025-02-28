
import { useEffect, useRef } from "react";
import ProductCard from "./ProductCard";

const tshirts = [
  {
    id: 1,
    title: "Autism Awareness Tee",
    price: 24.99,
    image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901",
    category: "tshirt" as const,
    description: "Comfortable cotton t-shirt with autism awareness design"
  },
  {
    id: 2,
    title: "Spectrum Support Shirt",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99",
    category: "tshirt" as const,
    description: "Premium quality shirt promoting autism awareness and support"
  },
  {
    id: 3,
    title: "Neurodiversity Champion",
    price: 22.99,
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27",
    category: "tshirt" as const,
    description: "Celebrate neurodiversity with this comfortable and stylish tee"
  },
  {
    id: 4,
    title: "Acceptance Matters Tee",
    price: 26.99,
    image: "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9",
    category: "tshirt" as const, 
    description: "Spread the message of acceptance with this premium t-shirt"
  }
];

const books = [
  {
    id: 5,
    title: "Understanding Autism",
    price: 19.99,
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f",
    category: "book" as const,
    description: "A comprehensive guide to understanding autism spectrum disorder"
  },
  {
    id: 6,
    title: "Spectrum Stories",
    price: 15.99,
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794",
    category: "book" as const,
    description: "Collection of inspiring stories from individuals on the autism spectrum"
  },
  {
    id: 7,
    title: "Autism Parenting Guide",
    price: 24.99,
    image: "https://images.unsplash.com/photo-1553729459-efe14ef6055d",
    category: "book" as const,
    description: "Essential guide for parents of children with autism"
  },
  {
    id: 8,
    title: "Sensory Solutions",
    price: 18.99,
    image: "https://images.unsplash.com/photo-1589998059171-988d887df646",
    category: "book" as const,
    description: "Practical solutions for sensory processing challenges"
  }
];

const ProductGrid = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
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
    <section className="py-20 bg-gray-50" ref={sectionRef}>
      <div className="container mx-auto px-6">
        <div className="text-center mb-16" data-animate>
          <div className="inline-block px-3 py-1 mb-4 rounded-full bg-autism-softBlue text-sm font-medium text-autism-blue">
            Our Shop
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Support Our Cause</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Every purchase helps fund our programs and initiatives for the autism community.
          </p>
        </div>
        
        <div className="mb-16" data-animate>
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-2xl font-semibold">Awareness T-Shirts</h3>
            <a href="#" className="text-autism-purple font-medium hover:underline">View all</a>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {tshirts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </div>
        
        <div data-animate>
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-2xl font-semibold">Educational Books</h3>
            <a href="#" className="text-autism-blue font-medium hover:underline">View all</a>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {books.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;
