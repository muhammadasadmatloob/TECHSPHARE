import React from 'react';
import { Cpu, Wifi } from 'lucide-react';

export const TechSpecs = () => {
  const specsList = [
    {
      title: 'Processor Complex',
      icon: Cpu,
      rows: [
        { label: 'Core Architecture', value: 'TS-Silicon M4 Neural' },
        { label: 'Machine Learning', value: '32-Core Tensor Engine' },
        { label: 'Bandwidth', value: '800GB/s Unified Memory' }
      ]
    },
    {
      title: 'Connectivity & Ports',
      icon: Wifi,
      rows: [
        { label: 'Wireless Standard', value: 'Wi-Fi 7 / Bluetooth 6.0' },
        { label: 'Ultra-Wideband', value: 'TechSphere Connect U1' },
        { label: 'Physical Interfaces', value: '2x Thunderbolt 5 Ports' }
      ]
    }
  ];

  return (
    <section id="specs" className="py-24 relative bg-black/40 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-14">
          <span className="text-xs font-mono text-ink-secondary uppercase tracking-widest">Under the Hood</span>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight mt-1">System Specifications</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {specsList.map((group, idx) => {
            const Icon = group.icon;
            return (
              <div key={idx} className="glass-panel p-8 rounded-3xl border border-white/10 space-y-6">
                <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                  <Icon className="w-5 h-5 text-white" />
                  <h3 className="text-xl font-bold text-white">{group.title}</h3>
                </div>

                <div className="space-y-4">
                  {group.rows.map((row, rIdx) => (
                    <div key={rIdx} className="flex items-center justify-between text-sm py-1 border-b border-white/5">
                      <span className="text-ink-secondary">{row.label}</span>
                      <span className="font-mono font-medium text-white">{row.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
