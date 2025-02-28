
import { useState } from "react";

interface ProductCardProps {
  id: number;
  title: string;
  price: number;
  image: string;
  category: "tshirt" | "book";
  description: string;
}

const ProductCard = ({ id, title, price, image, category, description }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className="relative bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden h-[280px]">
        <img 
          src={image} 
          alt={title}
          className={`w-full h-full object-cover transition-transform duration-700 ${isHovered ? 'scale-105' : 'scale-100'}`}
        />
        <div className={`absolute inset-0 bg-black bg-opacity-0 transition-opacity duration-300 ${isHovered ? 'bg-opacity-10' : ''}`} />
        
        <div className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-medium" 
             style={{ 
               backgroundColor: category === "tshirt" ? "#E5DEFF" : "#D3E4FD",
               color: category === "tshirt" ? "#9b87f5" : "#33C3F0"
             }}>
          {category === "tshirt" ? "T-Shirt" : "Book"}
        </div>
      </div>
      
      <div className="p-5">
        <h3 className="text-lg font-semibold mb-1 truncate">{title}</h3>
        <p className="text-gray-500 text-sm mb-3 line-clamp-2">{description}</p>
        
        <div className="flex justify-between items-center">
          <span className="text-autism-purple font-bold">${price.toFixed(2)}</span>
          
          <button className="px-4 py-2 rounded-full bg-autism-softBlue text-autism-blue text-sm font-medium hover:bg-autism-blue hover:text-white transition-colors">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
