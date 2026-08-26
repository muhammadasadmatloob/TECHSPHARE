import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      q: 'What devices are compatible with TechSphere hardware?',
      a: 'Our hardware utilizes SphereOS which syncs perfectly across iOS, Android, macOS, and Windows via our dedicated companion application, ensuring a seamless bridge regardless of your primary device.'
    },
    {
      q: 'Do you ship internationally?',
      a: 'Yes, we ship to over 140 countries worldwide. All international orders include duties and taxes pre-calculated at checkout, so there are no surprise fees upon delivery.'
    },
    {
      q: 'How does the 30-day trial work?',
      a: 'We give you 30 days to test the hardware in your own environment. If it does not revolutionize your workflow, return it in original condition for a full refund. We cover return shipping.'
    },
    {
      q: 'Is the data collected by the neural processors secure?',
      a: 'Optionally and strictly encrypted. All processing occurs locally on the TS-Silicon M4 chip. Your biometric data is encrypted at the hardware level and never transmitted to external cloud servers.'
    }
  ];

  return (
    <section id="faq" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        <div className="lg:col-span-5 space-y-4">
          <span className="text-xs font-mono text-gray-300 uppercase tracking-widest">Support Concierge</span>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">Frequently Asked Questions</h2>
          <p className="text-ink-secondary text-sm leading-relaxed">
            Got questions about compatibility, shipping, or our hardware architecture? Find your answers here or contact our concierge support.
          </p>
        </div>

        <div className="lg:col-span-7 space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="glass-panel rounded-2xl border border-white/10 overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 focus:outline-none"
                >
                  <span className="text-base font-bold text-white">{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-300 transition-transform duration-300 flex-shrink-0 ${
                      isOpen ? 'rotate-180 text-white' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 text-sm text-ink-secondary leading-relaxed border-t border-white/5 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
