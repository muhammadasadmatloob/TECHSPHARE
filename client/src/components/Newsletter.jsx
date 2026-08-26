import React, { useState } from 'react';
import { subscribeNewsletter } from '../services/api';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';

export const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState({ loading: false, success: false, message: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;

    setStatus({ loading: true, success: false, message: '' });
    try {
      const res = await subscribeNewsletter(email);
      setStatus({
        loading: false,
        success: true,
        message: res.message || 'Welcome to the TechSphere ecosystem.'
      });
      setEmail('');
    } catch (err) {
      setStatus({
        loading: false,
        success: false,
        message: err.message || 'Failed to join waitlist. Please try again.'
      });
    }
  };

  return (
    <section id="cta" className="py-24 relative bg-black/40 border-t border-white/5">
      <div className="max-w-4xl mx-auto px-6 text-center space-y-6">
        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
          Step into the TechSphere.
        </h2>
        <p className="text-ink-secondary text-base max-w-xl mx-auto">
          Join our early access waitlist for exclusive hardware drops, SphereOS beta invites, and engineering updates.
        </p>

        <form onSubmit={handleSubmit} className="max-w-md mx-auto flex flex-col sm:flex-row gap-3 pt-2">
          <input
            type="email"
            placeholder="Enter your email address"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 px-5 py-3.5 rounded-full bg-white/5 border border-white/15 text-sm text-white placeholder-ink-muted focus:outline-none focus:border-white transition-colors"
          />
          <button
            type="submit"
            disabled={status.loading}
            className="px-8 py-3.5 rounded-full bg-white text-black font-semibold text-sm hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
          >
            <span>{status.loading ? 'Joining...' : 'Join Future'}</span>
            <Send className="w-4 h-4" />
          </button>
        </form>

        {status.message && (
          <div
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono border ${
              status.success
                ? 'bg-white/10 border-white/30 text-white'
                : 'bg-red-500/10 border-red-500/30 text-red-400'
            }`}
          >
            {status.success ? <CheckCircle className="w-3.5 h-3.5" /> : <AlertCircle className="w-3.5 h-3.5" />}
            <span>{status.message}</span>
          </div>
        )}
      </div>
    </section>
  );
};
