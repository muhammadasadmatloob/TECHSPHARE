import React from 'react';
import { Shield, Activity } from 'lucide-react';

export const SoftwareOS = () => {
  return (
    <section id="software" className="py-24 relative bg-black/40">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Column */}
        <div className="lg:col-span-6 space-y-6">
          <span className="text-xs font-mono text-ink-secondary uppercase tracking-widest">Software Layer</span>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight">
            SphereOS.
            <br />
            <span className="text-gradient">The Intelligence.</span>
          </h2>
          <p className="text-ink-secondary text-base leading-relaxed">
            Hardware is only half the story. SphereOS is a lightweight, UNIX-based operating system designed entirely around spatial computing. It learns your habits securely on-device, pre-loading applications milliseconds before you request them.
          </p>

          <div className="flex items-center gap-6 pt-4 text-xs font-mono text-ink-secondary">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-white" />
              <span>KERNEL: 4.2.1-TS</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-gray-300" />
              <span>VAULT SECURE</span>
            </div>
          </div>
        </div>

        {/* Right Column: Simulated Terminal Mockup */}
        <div className="lg:col-span-6">
          <div className="glass-panel rounded-3xl border border-white/20 overflow-hidden shadow-2xl font-mono text-xs">
            <div className="px-6 py-4 bg-white/5 border-b border-white/10 flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-white/30" />
              <div className="w-3 h-3 rounded-full bg-white/30" />
              <div className="w-3 h-3 rounded-full bg-white/30" />
              <span className="ml-3 text-ink-muted text-[11px]">sphere_os_kernel_terminal</span>
            </div>

            <div className="p-6 space-y-3 bg-[#0a0a0c] text-ink-primary">
              <p className="text-white">&gt; INIT SPHERE_OS v4.2.1-NEURAL</p>
              <p className="text-ink-secondary">&gt; LOADING NEURAL KERNEL MATRIX... <span className="text-white">[OK]</span></p>
              <p className="text-ink-secondary">&gt; ESTABLISHING SUB-MS TELEMETRY SYNC... <span className="text-white">[OK]</span></p>
              <p className="text-ink-secondary">&gt; ON-DEVICE BIOMETRIC ENCRYPTION KEY... <span className="text-white">[LOCKED]</span></p>
              <br />
              <p className="text-white font-bold">&gt; SYSTEM STATUS: OPTIMAL (100%)</p>
              <p className="text-white font-bold">&gt; SPATIAL MAPPING: ACTIVE [60 FPS]</p>
              <p className="text-white font-bold">&gt; BATTERY: 98% (ADAPTIVE ALLOCATION)</p>
              <div className="flex items-center gap-1 text-white animate-pulse pt-2">
                <span>&gt;</span>
                <span className="w-2 h-4 bg-white inline-block" />
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
