
import { useState, useEffect } from "react";

interface ProductPopupProps {
  onClose: () => void;
  product: {
    id: number;
    title: string;
    description: string;
    price: number;
    image: string;
    category: string;
  };
}

const ProductPopup = ({ onClose, product }: ProductPopupProps) => {
  const [donatorName, setDonatorName] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [phone, setPhone] = useState("");
  const [quantity, setQuantity] = useState(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Process purchase
    console.log({ 
      donatorName, 
      fatherName, 
      phone, 
      product, 
      quantity,
      total: product.price * quantity
    });
    // Success message
    alert("Thank you for your purchase!");
    onClose();
  };

  // Prevent body scrolling when popup is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-xl max-w-3xl w-full p-6 relative my-8">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/2">
            <div className="rounded-lg overflow-hidden h-64 md:h-80">
              <img 
                src={product.image} 
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          <div className="md:w-1/2">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-autism-softGreen text-autism-purple mb-2">
              {product.category}
            </span>
            <h2 className="text-2xl font-bold mb-2 text-gray-800">{product.title}</h2>
            <p className="text-gray-600 mb-4">{product.description}</p>
            <div className="text-autism-purple font-bold text-xl mb-6">${product.price.toFixed(2)}</div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="popupDonatorName" className="block text-sm font-medium text-gray-700 mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  id="popupDonatorName"
                  value={donatorName}
                  onChange={(e) => setDonatorName(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-autism-purple focus:border-autism-purple"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="popupFatherName" className="block text-sm font-medium text-gray-700 mb-1">
                  Father's Name
                </label>
                <input
                  type="text"
                  id="popupFatherName"
                  value={fatherName}
                  onChange={(e) => setFatherName(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-autism-purple focus:border-autism-purple"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="popupPhone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="popupPhone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-autism-purple focus:border-autism-purple"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
                  Quantity
                </label>
                <div className="flex items-center">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-1 bg-gray-200 rounded-l-md"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    id="quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-16 text-center px-2 py-1 border-y border-gray-300"
                    min="1"
                  />
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-1 bg-gray-200 rounded-r-md"
                  >
                    +
                  </button>
                </div>
              </div>
              
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 px-4 rounded-full bg-autism-purple text-white font-medium hover:bg-autism-purple/90 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-1"
                >
                  Purchase Now - ${(product.price * quantity).toFixed(2)}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPopup;
