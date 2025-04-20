import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_LINKS } from "@/lib/constants";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();

  // Handle scroll event to change header style
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  // Close mobile menu when location changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  return (
    <header 
      className={`bg-white bg-opacity-95 shadow-sm fixed w-full top-0 z-50 transition-all duration-300 ${
        scrolled ? "py-2 shadow-md" : "py-4"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link href="/">
            <a className="flex items-center space-x-2">
              <i className="ri-knife-line text-2xl text-primary"></i>
              <span className="text-2xl font-bold font-playfair text-neutral-dark">CulinaryCompass</span>
            </a>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {NAV_LINKS.map((link) => (
              <Link key={link.path} href={link.path}>
                <a 
                  className={`text-neutral-dark hover:text-primary font-medium transition-colors duration-200 ${
                    location === link.path ? "border-b-2 border-primary" : ""
                  }`}
                >
                  {link.name}
                </a>
              </Link>
            ))}
          </nav>
          
          {/* Mobile Navigation Toggle */}
          <button 
            className="md:hidden text-neutral-dark focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <i className={`ri-${isMenuOpen ? "close" : "menu"}-line text-2xl`}></i>
          </button>
        </div>
        
        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden"
            >
              <div className="py-2 space-y-2">
                {NAV_LINKS.map((link) => (
                  <Link key={link.path} href={link.path}>
                    <a 
                      className={`block py-2 px-4 text-neutral-dark font-medium hover:bg-background rounded transition-colors ${
                        location === link.path ? "bg-background text-primary" : ""
                      }`}
                    >
                      {link.name}
                    </a>
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;
