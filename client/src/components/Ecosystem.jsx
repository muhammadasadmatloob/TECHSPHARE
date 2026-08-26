import React from 'react';
import { CheckCircle2, Cpu } from 'lucide-react';

export const Ecosystem = () => {
  return (
    <section id="ecosystem" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="glass-panel rounded-3xl p-8 lg:p-14 border border-white/15 overflow-hidden relative grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-[#121212]/60 backdrop-blur-2xl">
          
          {/* Left Text */}
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs font-mono text-ink-secondary uppercase tracking-widest">Unified Kernel</span>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight leading-tight">
              One Architecture.
              <br />
              <span className="text-gradient">Total Control.</span>
            </h2>
            <p className="text-ink-secondary text-base leading-relaxed">
              Every TechSphere hardware module syncs via latency-free sub-millisecond local telemetry. Dynamic workload offloading keeps your devices running at peak optimization without touching public clouds.
            </p>

            <ul className="space-y-3 pt-2">
              {[
                'Neural Audio Active ANC & Spatial Tracking',
                '120Hz Micro-OLED Dual Engine Arrays',
                'Quantum-Secured On-Device Encryption'
              ].map((item, idx) => (
                <li key={idx} className="flex items-center gap-3 text-sm text-white">
                  <CheckCircle2 className="w-5 h-5 text-gray-300 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Glowing Hardware Core Visual (White & Gray Metallic Theme) */}
          <div className="lg:col-span-5 relative flex items-center justify-center py-8">
            <div className="relative w-64 h-64 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-2 border-white/20 animate-spin-slow shadow-[0_0_40px_rgba(255,255,255,0.15)]" />
              <div className="absolute inset-6 rounded-full border border-dashed border-white/20 animate-[spin_20s_linear_infinite_reverse]" />
              
              <div className="w-28 h-28 rounded-full bg-gradient-to-tr from-white via-gray-300 to-gray-600 p-0.5 shadow-[0_0_30px_rgba(255,255,255,0.3)] animate-pulse">
                <div className="w-full h-full bg-[#0a0a0c] rounded-full flex flex-col items-center justify-center text-center p-2">
                  <Cpu className="w-6 h-6 text-white mb-1" />
                  <span className="text-[10px] font-mono text-white font-bold tracking-widest">TS-CORE</span>
                  <span className="text-[8px] font-mono text-gray-300">0.01ms</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
