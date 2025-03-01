
import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

// Product data
const tshirts = [
  {
    id: 1,
    title: "Autism Awareness Tee",
    description: "Comfortable cotton t-shirt with autism awareness design",
    price: 24.99,
    image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901",
    category: "tshirt" as const
  },
  {
    id: 2,
    title: "Spectrum Support Shirt",
    description: "Premium quality shirt promoting autism awareness and support",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99",
    category: "tshirt" as const
  },
  {
    id: 3,
    title: "Neurodiversity Champion",
    description: "Celebrate neurodiversity with this comfortable and stylish tee",
    price: 22.99,
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27",
    category: "tshirt" as const
  },
  {
    id: 4,
    title: "Acceptance Matters Tee",
    description: "Spread the message of acceptance with this premium t-shirt",
    price: 26.99,
    image: "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9",
    category: "tshirt" as const
  }
];

const books = [
  {
    id: 5,
    title: "Understanding Autism",
    description: "A comprehensive guide to understanding autism spectrum disorder",
    price: 19.99,
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f",
    category: "book" as const
  },
  {
    id: 6,
    title: "Spectrum Stories",
    description: "Collection of inspiring stories from individuals on the autism spectrum",
    price: 15.99,
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794",
    category: "book" as const
  },
  {
    id: 7,
    title: "Autism Parenting Guide",
    description: "Essential guide for parents of children with autism",
    price: 24.99,
    image: "https://images.unsplash.com/photo-1553729459-efe14ef6055d",
    category: "book" as const
  },
  {
    id: 8,
    title: "Sensory Solutions",
    description: "Practical solutions for sensory processing challenges",
    price: 18.99,
    image: "https://images.unsplash.com/photo-1589998059171-988d887df646",
    category: "book" as const
  }
];

const ProductGrid = () => {
  const [visible, setVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className={`text-center mb-16 ${visible ? 'animate-fade-in' : 'opacity-0'}`}>
          <div className="inline-block px-3 py-1 mb-4 rounded-full bg-autism-softBlue text-sm font-medium text-autism-blue">
            Our Shop
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Support Our Cause</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Every purchase helps fund our programs and initiatives for the autism community.
          </p>
        </div>
        
        {/* T-Shirts Section */}
        <div className={`mb-16 ${visible ? 'animate-fade-in' : 'opacity-0'}`}>
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-2xl font-semibold">Awareness T-Shirts</h3>
            <a href="#" className="text-autism-purple font-medium hover:underline">View all</a>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {tshirts.map(product => (
              <ProductCard
                key={product.id}
                id={product.id}
                title={product.title}
                description={product.description}
                price={product.price}
                image={product.image}
                category={product.category}
              />
            ))}
          </div>
        </div>
        
        {/* Books Section */}
        <div className={`${visible ? 'animate-fade-in' : 'opacity-0'}`}>
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-2xl font-semibold">Educational Books</h3>
            <a href="#" className="text-autism-blue font-medium hover:underline">View all</a>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {books.map(product => (
              <ProductCard
                key={product.id}
                id={product.id}
                title={product.title}
                description={product.description}
                price={product.price}
                image={product.image}
                category={product.category}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;
