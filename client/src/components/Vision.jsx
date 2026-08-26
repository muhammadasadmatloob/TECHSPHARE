import React from 'react';
import { ShieldCheck, Zap } from 'lucide-react';

export const Vision = () => {
  return (
    <section id="vision" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text */}
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs font-mono text-ink-secondary uppercase tracking-widest">Our Vision</span>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight">Beyond the Interface.</h2>
            <p className="text-ink-secondary text-base leading-relaxed">
              We believe technology should dissolve into the background. TechSphere was founded on a singular principle: computing should map to human intuition, not the other way around. By merging advanced neuro-acoustics with spatial optics, we build the bridge between thought and action.
            </p>

            <div className="grid grid-cols-2 gap-6 pt-4">
              <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-2">
                <div className="flex items-center gap-2 text-white">
                  <ShieldCheck className="w-5 h-5 text-gray-300" />
                  <span className="text-3xl font-extrabold text-gradient">30+</span>
                </div>
                <p className="text-xs font-mono text-ink-secondary uppercase tracking-wider">Global Patents</p>
              </div>

              <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-2">
                <div className="flex items-center gap-2 text-white">
                  <Zap className="w-5 h-5 text-gray-300" />
                  <span className="text-3xl font-extrabold text-gradient">0.4ms</span>
                </div>
                <p className="text-xs font-mono text-ink-secondary uppercase tracking-wider">Neural Latency</p>
              </div>
            </div>
          </div>

          {/* Right Visual Image Card */}
          <div className="lg:col-span-5">
            <div className="relative group rounded-3xl overflow-hidden glass-panel border border-white/15 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1614729939124-032f0b56c9ce?auto=format&fit=crop&w=800&q=80"
                alt="Spatial computing abstract render"
                className="w-full h-80 lg:h-[420px] object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-black/70 backdrop-blur-md border border-white/10">
                <p className="text-xs font-mono text-gray-300">TS-OPTICS v4.2 MATRIX</p>
                <p className="text-sm font-medium text-white">Real-Time Spatial Light Modulation Engine</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
