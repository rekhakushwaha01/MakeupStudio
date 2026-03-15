import React, { createContext, useContext, useMemo, useState } from "react";
import { useAuth } from "./AuthContext.jsx";

const API_BASE = "http://localhost:4000";

const CartContext = createContext(null);

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within CartProvider");
  }
  return ctx;
};

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [customerInfo, setCustomerInfo] = useState(null);
  const [lastOrder, setLastOrder] = useState(null);
  const [toast, setToast] = useState({ visible: false, message: "" });

  const addToCart = async (product, quantity) => {
    if (quantity <= 0) return;
    if (!user) {
      alert("Please sign in to add items to your cart.");
      return;
    }

    // Update local UI immediately
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { ...product, quantity }];
    });

    const message = `Added ${quantity} × ${product.name} to cart`;
    setToast({ visible: true, message });
    setTimeout(() => {
      setToast((prev) => ({ ...prev, visible: false }));
    }, 2500);

    // Persist in backend (MongoDB)
    try {
      await fetch(`${API_BASE}/api/cart/${encodeURIComponent(user.id)}/items`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: String(product.id),
          name: product.name,
          price: product.price,
          quantity,
        }),
      });
    } catch (err) {
      console.error("Failed to sync cart with backend", err);
    }
  };

  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
    setAppliedCoupon(null);
    setCouponCode("");
  };

  const applyCoupon = (code) => {
    const normalized = code.trim().toUpperCase();
    setCouponCode(code);
    if (normalized === "BEAUTY10") {
      setAppliedCoupon({ code: "BEAUTY10", type: "percent", value: 10 });
      return { success: true, message: "Coupon applied: 10% off" };
    }
    setAppliedCoupon(null);
    return { success: false, message: "Invalid coupon code" };
  };

  const totals = useMemo(() => {
    const subtotal = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    let discount = 0;
    if (appliedCoupon?.type === "percent") {
      discount = (subtotal * appliedCoupon.value) / 100;
    }
    const total = Math.max(subtotal - discount, 0);
    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    return { subtotal, discount, total, totalItems };
  }, [cartItems, appliedCoupon]);

  const value = {
    cartItems,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    couponCode,
    appliedCoupon,
    applyCoupon,
    customerInfo,
    setCustomerInfo,
    lastOrder,
    setLastOrder,
    toast,
    dismissToast: () => setToast((prev) => ({ ...prev, visible: false })),
    ...totals,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

