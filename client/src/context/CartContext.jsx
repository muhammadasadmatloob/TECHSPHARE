import React, { createContext, useContext, useState, useMemo } from 'react';
import { CartMapManager } from '../utils/cartOperations';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // Store cart state as Map for O(1) DSA complexity
  const [cartMap, setCartMap] = useState(new Map());
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const addToCart = (product) => {
    setCartMap((prevMap) => CartMapManager.addToMap(prevMap, product));
    setIsCartOpen(true);
    showToast(`Added ${product.name} to Shopping Bag`);
  };

  const updateQuantity = (productId, delta) => {
    setCartMap((prevMap) => CartMapManager.updateQuantityInMap(prevMap, productId, delta));
  };

  const clearCart = () => {
    setCartMap(new Map());
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Calculate totals memoized
  const { totalItems, subtotal } = useMemo(() => CartMapManager.calculateTotals(cartMap), [cartMap]);
  const cartItemsList = useMemo(() => CartMapManager.toArray(cartMap), [cartMap]);

  return (
    <CartContext.Provider
      value={{
        cartMap,
        cartItemsList,
        totalItems,
        subtotal,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        updateQuantity,
        clearCart,
        toastMessage,
        showToast
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
