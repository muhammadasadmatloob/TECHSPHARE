import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowRight, Sparkles, Cpu, Zap, Activity } from 'lucide-react';

export const Hero = () => {
  const heroRef = useRef(null);
  const coreRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        heroRef.current.querySelectorAll('.gsap-hero-el'),
        { opacity: 0, y: 35 },
        { opacity: 1, y: 0, duration: 1.1, stagger: 0.16, ease: 'power3.out' }
      );

      if (coreRef.current) {
        gsap.to(coreRef.current, {
          y: -14,
          duration: 3.5,
          repeat: -1,
          yoyo: true,
          ease: 'power1.inOut'
        });
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="hero" ref={heroRef} className="relative min-h-screen pt-28 pb-16 flex items-center justify-center">
      <div className="max-w-7xl mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Content */}
        <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
          <div className="gsap-hero-el inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-white tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-gray-300" />
            <span>ARCHITECTING LAYER 01</span>
          </div>

          <h1 className="gsap-hero-el text-4xl sm:text-6xl xl:text-7xl font-extrabold tracking-tight leading-[1.1]">
            <span>Spatial Computing.</span>
            <br />
            <span className="text-gradient">Engineered to Perfection.</span>
          </h1>

          <p className="gsap-hero-el text-base sm:text-lg text-ink-secondary max-w-xl mx-auto lg:mx-0 leading-relaxed">
            Next-gen neural processors, high-fidelity tactile hardware, and seamless ecosystem synchronization designed for human intuition.
          </p>

          <div className="gsap-hero-el flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
            <a
              href="#products"
              className="px-8 py-3.5 rounded-full bg-white text-black font-semibold hover:bg-gray-200 transition-all transform hover:-translate-y-0.5 shadow-lg shadow-white/10 flex items-center gap-2 text-sm"
            >
              Explore Products
            </a>
            <a
              href="#vision"
              className="px-6 py-3.5 rounded-full bg-white/5 border border-white/15 text-white font-medium hover:bg-white/10 transition-all flex items-center gap-2 text-sm group"
            >
              <span>Discover Vision</span>
              <ArrowRight className="w-4 h-4 text-gray-400 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>

        {/* Right Column: Custom Precision Brand Neural Chip Node (White & Gray Metallic Theme) */}
        <div className="lg:col-span-5 relative flex items-center justify-center">
          <div ref={coreRef} className="relative w-full max-w-sm aspect-square">
            
            {/* Outer Orbital Rings */}
            <div className="absolute inset-0 rounded-full border border-white/20 animate-spin-slow" />
            <div className="absolute inset-4 rounded-full border border-dashed border-white/10 animate-[spin_30s_linear_infinite_reverse]" />
            <div className="absolute inset-10 rounded-full bg-gradient-to-tr from-white/10 to-transparent blur-2xl pointer-events-none" />

            {/* Central Neural Chip Hardware Core Card */}
            <div className="absolute inset-12 glass-panel rounded-3xl border border-white/20 p-6 flex flex-col justify-between shadow-2xl backdrop-blur-2xl bg-black/70">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-white animate-pulse" />
                  <span className="text-[11px] font-mono text-ink-secondary">TS-M4 NEURAL CORE</span>
                </div>
                <Cpu className="w-5 h-5 text-white" />
              </div>

              <div className="space-y-2 py-4">
                <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-white to-gray-500 w-4/5 animate-pulse" />
                </div>
                <div className="flex justify-between text-[10px] font-mono text-ink-muted">
                  <span>COMPUTE MATRIX</span>
                  <span className="text-white">99.8% OPTIMAL</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-3 border-t border-white/10">
                <div className="p-2 rounded-xl bg-white/5 text-center">
                  <span className="text-[9px] font-mono text-ink-muted block">LATENCY</span>
                  <span className="text-xs font-mono font-bold text-white">0.4ms</span>
                </div>
                <div className="p-2 rounded-xl bg-white/5 text-center">
                  <span className="text-[9px] font-mono text-ink-muted block">BANDWIDTH</span>
                  <span className="text-xs font-mono font-bold text-gray-300">800GB/s</span>
                </div>
              </div>
            </div>

            {/* Floating Satellite Telemetry Badges */}
            <div className="absolute -top-4 -left-4 px-3 py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-white/15 text-[10px] font-mono text-white flex items-center gap-1.5 shadow-xl">
              <Zap className="w-3 h-3 text-gray-300" />
              <span>QUANTUM VELOCITY</span>
            </div>

            <div className="absolute -bottom-4 -right-4 px-3 py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-white/15 text-[10px] font-mono text-white flex items-center gap-1.5 shadow-xl">
              <Activity className="w-3 h-3 text-gray-300" />
              <span>SPATIAL LIGHT MATRIX</span>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
