import { useState, useEffect } from "react";
import { X, Menu } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/80 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-2 cursor-pointer">
          <div className="w-8 h-8 bg-gradient-to-tr from-indigo-600 to-violet-500 rounded-lg flex items-center justify-center text-white font-bold">
            RF
          </div>
          <span className="text-xl font-bold text-slate-800 tracking-tight">RoomieFind</span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
          <a href="#features" className="hover:text-indigo-600 transition-colors">Features</a>
          <a href="#how-it-works" className="hover:text-indigo-600 transition-colors">How it Works</a>
          <a href="#stories" className="hover:text-indigo-600 transition-colors">Stories</a>
          <button className="px-5 py-2.5 bg-slate-900 text-white rounded-full hover:bg-slate-800 transition-all hover:shadow-lg hover:scale-105 active:scale-95">
            Get Started
          </button>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-slate-600" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-slate-100 overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-4 font-medium text-slate-600">
              <a href="#features" onClick={() => setMobileMenuOpen(false)}>Features</a>
              <a href="#how-it-works" onClick={() => setMobileMenuOpen(false)}>How it Works</a>
              <a href="#stories" onClick={() => setMobileMenuOpen(false)}>Stories</a>
              <button className="w-full py-3 bg-indigo-600 text-white rounded-xl">Get Started</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};


export default Navbar