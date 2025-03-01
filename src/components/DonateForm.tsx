
import { useState } from "react";

interface DonateFormProps {
  onClose: () => void;
}

const DonateForm = ({ onClose }: DonateFormProps) => {
  const [donatorName, setDonatorName] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState("50");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Process donation
    console.log({ donatorName, fatherName, phone, amount });
    // Success message
    alert("Thank you for your donation!");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        <h2 className="text-2xl font-bold text-center mb-6 text-autism-purple">Make a Donation</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="donatorName" className="block text-sm font-medium text-gray-700 mb-1">
              Your Name
            </label>
            <input
              type="text"
              id="donatorName"
              value={donatorName}
              onChange={(e) => setDonatorName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-autism-purple focus:border-autism-purple"
              required
            />
          </div>
          
          <div>
            <label htmlFor="fatherName" className="block text-sm font-medium text-gray-700 mb-1">
              Father's Name
            </label>
            <input
              type="text"
              id="fatherName"
              value={fatherName}
              onChange={(e) => setFatherName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-autism-purple focus:border-autism-purple"
              required
            />
          </div>
          
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-autism-purple focus:border-autism-purple"
              required
            />
          </div>
          
          <div>
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
              Donation Amount ($)
            </label>
            <div className="flex flex-wrap gap-2 mb-2">
              {["25", "50", "100", "250", "500"].map((value) => (
                <button
                  key={value}
                  type="button"
                  className={`px-4 py-2 rounded-md text-sm font-medium ${
                    amount === value 
                      ? "bg-autism-purple text-white" 
                      : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                  }`}
                  onClick={() => setAmount(value)}
                >
                  ${value}
                </button>
              ))}
              <button
                type="button"
                className={`px-4 py-2 rounded-md text-sm font-medium ${
                  !["25", "50", "100", "250", "500"].includes(amount) 
                    ? "bg-autism-purple text-white" 
                    : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                }`}
                onClick={() => setAmount("other")}
              >
                Other
              </button>
            </div>
            {(amount === "other" || !["25", "50", "100", "250", "500"].includes(amount)) && (
              <input
                type="number"
                id="customAmount"
                value={amount === "other" ? "" : amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-autism-purple focus:border-autism-purple"
                placeholder="Enter amount"
                min="1"
                required
              />
            )}
          </div>
          
          <button
            type="submit"
            className="w-full py-3 px-4 rounded-full bg-autism-purple text-white font-medium hover:bg-autism-purple/90 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-1"
          >
            Donate Now
          </button>
        </form>
      </div>
    </div>
  );
};

export default DonateForm;
