import React from 'react';
import { Quote } from 'lucide-react';

export const Testimonials = () => {
  const testimonials = [
    {
      quote: "TechSphere hasn't just built a new headset; they've completely rewritten the rules of human-computer interaction.",
      author: "Elena Rostova",
      role: "Lead Tech Analyst, Wired"
    },
    {
      quote: "The sub-millisecond latency on the Neural Pods is indistinguishable from analog studio monitors. Pure magic.",
      author: "Marcus Chen",
      role: "Grammy-Winning Producer"
    },
    {
      quote: "SphereOS is the cleanest, most intuitive interface I've used in a decade. It literally predicts my workflow.",
      author: "Sarah Jenkins",
      role: "Senior UX Director"
    }
  ];

  return (
    <section id="testimonials" className="py-24 relative bg-black/40 border-y border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-mono text-gray-300 uppercase tracking-widest">The Community</span>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">What Visionaries Say</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <div key={idx} className="glass-panel p-8 rounded-3xl border border-white/10 flex flex-col justify-between space-y-6">
              <Quote className="w-8 h-8 text-white/40" />
              <p className="text-sm text-ink-primary italic leading-relaxed">
                "{t.quote}"
              </p>
              <div className="pt-4 border-t border-white/10">
                <strong className="text-white block font-semibold text-sm">{t.author}</strong>
                <span className="text-xs text-ink-muted">{t.role}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
