import React from 'react';
import { useCart } from '../context/CartContext';
import { CheckCircle2 } from 'lucide-react';

export const Toast = () => {
  const { toastMessage } = useCart();
  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3 rounded-full bg-[#0a0a0c]/90 border border-white/20 text-xs text-white shadow-2xl backdrop-blur-xl animate-fadeIn">
      <CheckCircle2 className="w-4 h-4 text-white" />
      <span>{toastMessage}</span>
    </div>
  );
};
