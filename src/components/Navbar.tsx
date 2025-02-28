
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out px-6 py-4 ${scrolled ? "bg-white/95 backdrop-blur-sm shadow-sm" : "bg-transparent"}`}>
      <nav className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-semibold text-autism-purple">
          Autism Foundation
        </Link>
        
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/" className="story-link text-gray-800 font-medium">Home</Link>
          <Link to="/" className="story-link text-gray-800 font-medium">About</Link>
          <Link to="/" className="story-link text-gray-800 font-medium">Resources</Link>
          <Link to="/" className="story-link text-gray-800 font-medium">Shop</Link>
          <Link to="/" className="story-link text-gray-800 font-medium">Contact</Link>
        </div>
        
        <button className="hidden md:block px-5 py-2 rounded-full bg-autism-purple text-white hover:bg-autism-purple/90 transition-colors">
          Donate Now
        </button>
        
        <button className="md:hidden text-gray-800">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </nav>
    </header>
  );
};

export default Navbar;
