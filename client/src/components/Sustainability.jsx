import React from 'react';
import { Leaf, Recycle, Globe } from 'lucide-react';

export const Sustainability = () => {
  return (
    <section id="sustainability" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6 text-center space-y-12">
        <div className="max-w-2xl mx-auto space-y-4">
          <span className="text-xs font-mono text-ink-secondary uppercase tracking-widest">Our Planet</span>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight">
            Carbon Negative.<br />
            <span className="text-gradient">Future Positive.</span>
          </h2>
          <p className="text-ink-secondary text-base leading-relaxed">
            Innovation shouldn't cost the Earth. We have completely overhauled our supply chain to ensure every product leaves the factory with a net-negative carbon footprint.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="glass-panel p-8 rounded-3xl border border-white/10 text-center space-y-2">
            <Recycle className="w-8 h-8 text-white mx-auto mb-2" />
            <span className="text-4xl font-extrabold text-white block">100%</span>
            <p className="text-xs font-mono text-ink-secondary uppercase">Recycled Titanium & Aluminum</p>
          </div>

          <div className="glass-panel p-8 rounded-3xl border border-white/10 text-center space-y-2">
            <Leaf className="w-8 h-8 text-gray-300 mx-auto mb-2" />
            <span className="text-4xl font-extrabold text-white block">Zero</span>
            <p className="text-xs font-mono text-ink-secondary uppercase">Plastic Fiber Packaging</p>
          </div>

          <div className="glass-panel p-8 rounded-3xl border border-white/10 text-center space-y-2">
            <Globe className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <span className="text-4xl font-extrabold text-white block">2030</span>
            <p className="text-xs font-mono text-ink-secondary uppercase">Complete Grid Carbon Neutrality</p>
          </div>
        </div>
      </div>
    </section>
  );
};
