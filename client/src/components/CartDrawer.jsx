import React, { useState } from 'react';
import { X, Minus, Plus, ShoppingBag, CheckCircle, ShieldCheck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { submitOrder } from '../services/api';

export const CartDrawer = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cartItemsList,
    totalItems,
    subtotal,
    updateQuantity,
    clearCart
  } = useCart();

  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [formData, setFormData] = useState({ customerName: '', customerEmail: '', shippingAddress: '' });
  const [orderStatus, setOrderStatus] = useState({ loading: false, success: false, orderDetails: null, error: '' });

  if (!isCartOpen) return null;

  const handleCheckoutSubmit = async (e) => {
    e.preventDefault();
    setOrderStatus({ loading: true, success: false, orderDetails: null, error: '' });

    try {
      const orderPayload = {
        customerName: formData.customerName,
        customerEmail: formData.customerEmail,
        shippingAddress: formData.shippingAddress,
        items: cartItemsList.map(item => ({
          productId: item.id,
          name: item.name,
          price: item.price,
          qty: item.qty
        })),
        subtotal
      };

      const response = await submitOrder(orderPayload);
      setOrderStatus({
        loading: false,
        success: true,
        orderDetails: response.data,
        error: ''
      });
      clearCart();
    } catch (err) {
      setOrderStatus({
        loading: false,
        success: false,
        orderDetails: null,
        error: err.message || 'Order submission failed.'
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Overlay Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-black/70 backdrop-blur-md animate-fadeIn"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#0a0a0c] border-l border-white/15 p-6 flex flex-col justify-between shadow-2xl relative">
          
          {/* Header */}
          <div className="flex items-center justify-between pb-6 border-b border-white/10">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-white" />
              <h3 className="text-lg font-bold text-white">Shopping Bag ({totalItems})</h3>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 text-ink-muted hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto py-6 space-y-4">
            {cartItemsList.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <ShoppingBag className="w-10 h-10 text-ink-muted mx-auto" />
                <p className="text-sm text-ink-secondary">Your shopping bag is currently empty.</p>
              </div>
            ) : (
              cartItemsList.map((item) => (
                <div key={item.id} className="flex gap-4 p-3 rounded-2xl bg-white/5 border border-white/10 items-center">
                  <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-xl bg-black/40" />
                  <div className="flex-1">
                    <h4 className="text-xs font-bold text-white line-clamp-1">{item.name}</h4>
                    <span className="text-xs font-mono text-gray-300 block mt-1">
                      ${(item.price * item.qty).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </span>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="w-5 h-5 rounded bg-white/10 text-white flex items-center justify-center hover:bg-white/20"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-mono font-bold text-white px-1">{item.qty}</span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="w-5 h-5 rounded bg-white/10 text-white flex items-center justify-center hover:bg-white/20"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Cart Footer */}
          {cartItemsList.length > 0 && (
            <div className="pt-6 border-t border-white/10 space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-ink-secondary">Subtotal</span>
                <span className="font-mono font-bold text-lg text-white">
                  ${subtotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </span>
              </div>
              <p className="text-[11px] text-ink-muted">Duties & express shipping calculated at checkout.</p>
              <button
                onClick={() => setCheckoutModalOpen(true)}
                className="w-full py-3.5 rounded-full bg-white text-black font-semibold text-sm hover:bg-gray-200 transition-colors"
              >
                Proceed to Checkout
              </button>
            </div>
          )}

        </div>
      </div>

      {/* Checkout Modal Dialog */}
      {checkoutModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl">
          <div className="w-full max-w-lg glass-panel rounded-3xl p-8 border border-white/20 relative space-y-6">
            <button
              onClick={() => setCheckoutModalOpen(false)}
              className="absolute top-6 right-6 p-2 text-ink-muted hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            {orderStatus.success ? (
              <div className="text-center py-8 space-y-4">
                <CheckCircle className="w-14 h-14 text-white mx-auto" />
                <h3 className="text-2xl font-bold text-white">Order Confirmed!</h3>
                <p className="text-xs font-mono text-gray-300">
                  ORDER ID: {orderStatus.orderDetails?.orderNumber}
                </p>
                <p className="text-sm text-ink-secondary">
                  Your hardware requisition has been successfully placed into the manufacturing priority queue. A confirmation email has been dispatched.
                </p>
                <button
                  onClick={() => {
                    setCheckoutModalOpen(false);
                    setIsCartOpen(false);
                  }}
                  className="px-8 py-3 rounded-full bg-white text-black font-semibold text-xs hover:bg-gray-200 transition-colors"
                >
                  Return to Ecosystem
                </button>
              </div>
            ) : (
              <form onSubmit={handleCheckoutSubmit} className="space-y-4">
                <div className="flex items-center gap-2 text-white border-b border-white/10 pb-3">
                  <ShieldCheck className="w-5 h-5" />
                  <h3 className="text-lg font-bold text-white">Secure Checkout</h3>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="block text-ink-secondary mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      value={formData.customerName}
                      onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white focus:outline-none focus:border-white"
                    />
                  </div>

                  <div>
                    <label className="block text-ink-secondary mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      value={formData.customerEmail}
                      onChange={(e) => setFormData({ ...formData, customerEmail: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white focus:outline-none focus:border-white"
                    />
                  </div>

                  <div>
                    <label className="block text-ink-secondary mb-1">Shipping Address</label>
                    <textarea
                      required
                      rows={2}
                      value={formData.shippingAddress}
                      onChange={(e) => setFormData({ ...formData, shippingAddress: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white focus:outline-none focus:border-white"
                    />
                  </div>
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                  <span className="text-xs text-ink-secondary">Total Due:</span>
                  <span className="font-mono text-lg font-bold text-white">
                    ${subtotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </span>
                </div>

                {orderStatus.error && (
                  <p className="text-xs text-red-400 text-center">{orderStatus.error}</p>
                )}

                <button
                  type="submit"
                  disabled={orderStatus.loading}
                  className="w-full py-3.5 rounded-full bg-white text-black font-semibold text-sm hover:bg-gray-200 transition-colors"
                >
                  {orderStatus.loading ? 'Processing Order...' : 'Submit Hardware Requisition'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
