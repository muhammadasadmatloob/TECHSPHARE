import React from 'react';

export const Materials = () => {
  return (
    <section id="materials" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1920&q=80"
          alt="Macro titanium metal"
          className="w-full h-full object-cover filter brightness-[0.35] contrast-125"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/70 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-12">
        <div className="lg:col-span-7 space-y-6">
          <span className="text-xs font-mono text-gray-300 uppercase tracking-widest">Design Language</span>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
            Forged in Aerospace Titanium.
          </h2>
          <p className="text-ink-secondary text-base leading-relaxed max-w-xl">
            We reject plastic. Every TechSphere module is CNC-machined from a single block of Grade 5 Titanium, ensuring unmatched thermal dissipation and a strength-to-weight ratio that feels virtually weightless.
          </p>
        </div>
      </div>
    </section>
  );
};
