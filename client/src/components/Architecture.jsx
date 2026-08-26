import React from 'react';
import { Zap, Eye, Shield, BatteryCharging } from 'lucide-react';

export const Architecture = () => {
  const features = [
    {
      icon: Zap,
      title: 'Quantum Velocity',
      desc: 'Dedicated photon-processing units deliver operations in picoseconds, eliminating input latency.',
      color: 'text-white'
    },
    {
      icon: Eye,
      title: 'Spatial Awareness',
      desc: 'Lidar-infused environment mapping understands room acoustics and ambient lighting in real-time.',
      color: 'text-gray-300'
    },
    {
      icon: Shield,
      title: 'Vault Security',
      desc: 'Hardware-level encryption keys ensure your biometric telemetry never leaves your device framework.',
      color: 'text-gray-400'
    },
    {
      icon: BatteryCharging,
      title: 'Adaptive Power',
      desc: 'AI-driven power allocation shuts down idle neural clusters to extend battery life by up to 40%.',
      color: 'text-gray-200'
    }
  ];

  return (
    <section id="features" className="py-24 relative bg-black/40 border-y border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-mono text-ink-secondary uppercase tracking-widest">The Architecture</span>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight">Core Innovations</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                className="glass-panel p-8 rounded-3xl border border-white/10 hover:border-white/25 transition-all duration-300 group hover:-translate-y-1"
              >
                <div className={`w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 ${feat.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white group-hover:text-gray-300 transition-colors mb-2">
                  {feat.title}
                </h3>
                <p className="text-ink-secondary text-sm leading-relaxed">
                  {feat.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
