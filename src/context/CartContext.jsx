import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from './ToastContext';

const CartContext = createContext();

const CART_KEY = 'fh_cart';
const FAV_KEY = 'fh_favorites';

export function CartProvider({ children }) {
  const toast = useToast();

  const [cart, setCartState] = useState(() => {
    try {
      const saved = localStorage.getItem(CART_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const [favorites, setFavoritesState] = useState(() => {
    try {
      const saved = localStorage.getItem(FAV_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(cart));
    } catch (e) {}
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem(FAV_KEY, JSON.stringify(favorites));
    } catch (e) {}
  }, [favorites]);

  const addToCart = (item) => {
    setCartState((prevCart) => {
      const existingIndex = prevCart.findIndex((c) => c.id === item.id);
      const qtyToAdd = item.qty || 1;
      if (existingIndex > -1) {
        const newCart = [...prevCart];
        newCart[existingIndex] = {
          ...newCart[existingIndex],
          qty: newCart[existingIndex].qty + qtyToAdd,
        };
        return newCart;
      } else {
        return [...prevCart, { ...item, qty: qtyToAdd }];
      }
    });
    toast(`تمت إضافة ${item.name} إلى السلة`, 'success', 'fa-cart-plus');
  };

  const updateCartQty = (id, qty) => {
    setCartState((prevCart) => {
      if (qty <= 0) {
        return prevCart.filter((c) => c.id !== id);
      }
      return prevCart.map((c) => (c.id === id ? { ...c, qty } : c));
    });
  };

  const removeFromCart = (id) => {
    setCartState((prevCart) => prevCart.filter((c) => c.id !== id));
    toast('تم حذف العنصر من السلة', 'default', 'fa-trash');
  };

  const clearCart = () => {
    setCartState([]);
  };

  const cartCount = cart.reduce((sum, c) => sum + c.qty, 0);
  const cartSubtotal = cart.reduce((sum, c) => sum + c.qty * c.price, 0);

  const toggleFavorite = (id) => {
    const has = favorites.includes(id);
    setFavoritesState((prev) => (has ? prev.filter((f) => f !== id) : [...prev, id]));
    toast(
      has ? 'تمت الإزالة من المفضلة' : 'تمت الإضافة إلى المفضلة',
      has ? 'default' : 'success',
      has ? 'fa-heart-crack' : 'fa-heart'
    );
    return !has;
  };

  const isFavorite = (id) => favorites.includes(id);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateCartQty,
        removeFromCart,
        clearCart,
        cartCount,
        cartSubtotal,
        favorites,
        toggleFavorite,
        isFavorite,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
}
