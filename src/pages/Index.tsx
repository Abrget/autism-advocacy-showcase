
import { useEffect } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import SchoolSection from "../components/SchoolSection";
import ActivitySection from "../components/ActivitySection";
import ProductGrid from "../components/ProductGrid";
import Footer from "../components/Footer";

const Index = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <SchoolSection />
      <ActivitySection />
      <ProductGrid />
      <Footer />
    </div>
  );
};

export default Index;
