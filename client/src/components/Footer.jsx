import React from 'react';

export const Footer = () => {
  return (
    <footer className="py-12 border-t border-white/10 bg-[#050505] text-ink-secondary text-xs">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <span className="font-mono font-bold tracking-widest text-white block text-sm">TECHSPHERE</span>
          <p className="mt-1">&copy; {new Date().getFullYear()} TechSphere Systems Inc. All rights reserved.</p>
        </div>

        <div className="flex flex-wrap items-center gap-6">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-white transition-colors">Security Infrastructure</a>
          <a href="#" className="hover:text-white transition-colors">Press Kit</a>
        </div>
      </div>
    </footer>
  );
};
