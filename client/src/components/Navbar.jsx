import React, { useState, useEffect } from 'react';
import { ShoppingBag, Menu, X, Cpu } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { totalItems, setIsCartOpen } = useCart();

  const navLinks = [
    { name: 'Overview', href: '#hero', id: 'hero' },
    { name: 'Story', href: '#vision', id: 'vision' },
    { name: 'Catalog', href: '#products', id: 'products' },
    { name: 'Ecosystem', href: '#ecosystem', id: 'ecosystem' },
    { name: 'Specs', href: '#specs', id: 'specs' },
    { name: 'FAQ', href: '#faq', id: 'faq' },
  ];

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 40);

          // Highly accurate position-based scrollspy for all sections
          const navHeight = 100;
          let currentSection = 'hero';

          for (const link of navLinks) {
            const el = document.getElementById(link.id);
            if (el) {
              const top = el.getBoundingClientRect().top;
              if (top <= navHeight) {
                currentSection = link.id;
              }
            }
          }
          setActiveSection(currentSection);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleSmoothScroll = (e, id) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const navHeight = 80;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - navHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full h-20 z-50 transition-all duration-300 border-b transform-gpu ${
        scrolled
          ? 'bg-[#050505]/85 backdrop-blur-md border-white/10 shadow-2xl'
          : 'bg-transparent border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto h-full px-6 flex items-center justify-between">
        
        {/* Brand Logo */}
        <a
          href="#hero"
          onClick={(e) => handleSmoothScroll(e, 'hero')}
          className="flex items-center gap-3 group"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-white/80 to-white/30 p-0.5 transition-transform duration-300 group-hover:scale-105">
            <div className="w-full h-full bg-[#050505] rounded-[6px] flex items-center justify-center">
              <Cpu className="w-4 h-4 text-white" />
            </div>
          </div>
          <span className="font-mono font-bold tracking-widest text-lg text-white group-hover:text-ink-secondary transition-colors">
            TECHSPHERE
          </span>
        </a>

        {/* Desktop Navigation Link with White & Gray Glowing Active State */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleSmoothScroll(e, link.id)}
                className={`text-sm transition-all duration-300 relative py-1.5 ${
                  isActive
                    ? 'text-white font-bold drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]'
                    : 'text-ink-secondary hover:text-white font-medium'
                }`}
              >
                {link.name}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-white to-gray-400 rounded-full shadow-[0_0_8px_#ffffff]" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsCartOpen(true)}
            className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:border-white/30 hover:bg-white/10 transition-all text-xs font-semibold tracking-wide"
            aria-label="Open Cart"
          >
            <ShoppingBag className="w-4 h-4 text-white" />
            <span className="text-white">Bag</span>
            <span className="w-5 h-5 rounded-full bg-white text-black font-bold flex items-center justify-center text-[10px]">
              {totalItems}
            </span>
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-ink-secondary hover:text-white"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-20 bg-[#050505]/95 backdrop-blur-xl border-b border-white/10 p-6 shadow-2xl flex flex-col gap-4 animate-fadeIn">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleSmoothScroll(e, link.id)}
                className={`text-lg py-2 border-b border-white/5 transition-colors flex items-center justify-between ${
                  isActive
                    ? 'text-white font-bold'
                    : 'text-ink-secondary hover:text-white font-medium'
                }`}
              >
                <span>{link.name}</span>
                {isActive && <span className="w-2 h-2 rounded-full bg-white shadow-[0_0_8px_#ffffff]" />}
              </a>
            );
          })}
        </div>
      )}
    </header>
  );
};
