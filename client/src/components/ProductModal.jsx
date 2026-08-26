import React from 'react';
import { X, Cpu, Zap, Shield, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const ProductModal = ({ product, onClose }) => {
  const { addToCart } = useCart();
  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-xl animate-fadeIn">
      <div className="relative w-full max-w-4xl glass-panel rounded-3xl border border-white/20 overflow-hidden shadow-2xl bg-[#050505]/95">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-20 p-2.5 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
          aria-label="Close product modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12">
          
          {/* Left Column: Product Hardware Preview */}
          <div className="lg:col-span-6 bg-black/60 relative p-8 flex flex-col items-center justify-center min-h-[350px]">
            <span className="absolute top-6 left-6 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-[10px] font-mono text-white tracking-wider">
              FLAGSHIP HARDWARE INSPECTOR
            </span>

            <div className="relative w-full h-64 rounded-2xl overflow-hidden shadow-2xl border border-white/10 group">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-mono text-white">
                <span>{product.tag}</span>
                <span className="text-gray-300">GRADE 5 TITANIUM</span>
              </div>
            </div>
          </div>

          {/* Right Column: Details & Specs */}
          <div className="lg:col-span-6 p-8 flex flex-col justify-between space-y-6">
            <div>
              <span className="text-xs font-mono text-ink-secondary tracking-widest uppercase">
                {product.tag}
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">
                {product.name}
              </h2>
              <p className="text-ink-secondary text-sm mt-3 leading-relaxed">
                {product.description}
              </p>

              {/* Hardware Spec Matrix */}
              <div className="grid grid-cols-3 gap-3 my-6">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
                  <Zap className="w-4 h-4 text-gray-300 mx-auto mb-1" />
                  <span className="text-[10px] text-ink-muted block uppercase">LATENCY</span>
                  <span className="text-xs font-bold text-white">{product.specs?.latency || '<0.4ms'}</span>
                </div>

                <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
                  <Cpu className="w-4 h-4 text-gray-300 mx-auto mb-1" />
                  <span className="text-[10px] text-ink-muted block uppercase">CHIP</span>
                  <span className="text-xs font-bold text-white">{product.specs?.architecture || 'M4 Neural'}</span>
                </div>

                <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
                  <Shield className="w-4 h-4 text-gray-300 mx-auto mb-1" />
                  <span className="text-[10px] text-ink-muted block uppercase">SURFACE</span>
                  <span className="text-xs font-bold text-white">Titanium G5</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <div>
                <span className="text-xs text-ink-muted block font-mono">RETAIL PRICE</span>
                <span className="text-2xl font-mono font-bold text-white">
                  ${product.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </span>
              </div>

              <button
                onClick={() => {
                  addToCart(product);
                  onClose();
                }}
                className="px-6 py-3 rounded-full bg-white text-black font-semibold text-sm hover:bg-gray-200 transition-colors flex items-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Shopping Bag</span>
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
