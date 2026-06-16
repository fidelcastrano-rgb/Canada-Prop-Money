"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export interface CartItem {
  key: string; // "slug|variantName"
  name: string; // Product Name
  variant: string; // Variant Name
  price: number; // Price per unit
  qty: number; // Quantity
}

interface CartContextType {
  items: CartItem[];
  addToOrder: (name: string, slug: string, variant: string, price: number, qty?: number) => void;
  removeItem: (key: string) => void;
  updateQty: (key: string, qty: number) => void;
  clearOrder: () => void;
  totalItems: number;
  totalCost: number;
  isOrderBuilderVisible: boolean;
  setIsOrderBuilderVisible: (visible: boolean) => void;
  sendWhatsApp: () => void;
  sendEmail: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOrderBuilderVisible, setIsOrderBuilderVisible] = useState(false);
  const router = useRouter();

  // Load from local storage
  useEffect(() => {
    const saved = localStorage.getItem("canadian_prop_money_cart");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setTimeout(() => {
          setItems(parsed);
        }, 0);
      } catch (e) {
        console.error("Failed to parse cart", e);
      }
    }
  }, []);

  // Save to local storage
  const saveItems = (newItems: CartItem[]) => {
    setItems(newItems);
    localStorage.setItem("canadian_prop_money_cart", JSON.stringify(newItems));
  };

  const addToOrder = (name: string, slug: string, variant: string, price: number, qty = 1) => {
    const key = `${slug}|${variant}`;
    const existingIndex = items.findIndex((item) => item.key === key);

    let newItems = [...items];
    if (existingIndex > -1) {
      newItems[existingIndex].qty += qty;
    } else {
      newItems.push({
        key,
        name,
        variant,
        price,
        qty,
      });
    }
    saveItems(newItems);
    setIsOrderBuilderVisible(true);
  };

  const removeItem = (key: string) => {
    const newItems = items.filter((item) => item.key !== key);
    saveItems(newItems);
  };

  const updateQty = (key: string, qty: number) => {
    if (qty <= 0) {
      removeItem(key);
      return;
    }
    const newItems = items.map((item) => {
      if (item.key === key) {
        return { ...item, qty };
      }
      return item;
    });
    saveItems(newItems);
  };

  const clearOrder = () => {
    saveItems([]);
    setIsOrderBuilderVisible(false);
  };

  const totalItems = items.reduce((sum, item) => sum + item.qty, 0);
  const totalCost = items.reduce((sum, item) => sum + item.price * item.qty, 0);

  // Helper: Generates a human-friendly plain text summary of the order
  const generateOrderSummary = () => {
    const header = "🇨🇦 *CANADIAN PROP MONEY ORDER BUILDER REQUEST*\n\n";
    const body = items
      .map(
        (item) =>
          `• *${item.name}* (${item.variant})\n  Qty: ${item.qty} x $${item.price} CAD = $${(item.price * item.qty).toFixed(2)}`
      )
      .join("\n\n");
    const footer = `\n\n💵 *Estimated Subtotal:* $${totalCost.toFixed(2)} CAD\n📞 Sourced via Web Order Builder.`;
    return encodeURIComponent(header + body + footer);
  };

  const sendWhatsApp = () => {
    const txt = generateOrderSummary();
    const phone = "+18437320661"; // Representative dispatch office number
    // Open in a new tab safely
    window.open(`https://wa.me/${phone}?text=${txt}`, "_blank", "noopener,noreferrer");
  };

  const sendEmail = () => {
    const subject = `New Web Prop Money Inquiry (Total: $${totalCost.toFixed(2)} CAD)`;
    const body = items
      .map((item) => `- ${item.name} - ${item.variant} (Qty: ${item.qty} x $${item.price} CAD = $${item.price * item.qty} CAD)`)
      .join("\n");
    const mailto = `mailto:sales@canadianpropmoney.org?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
      `Hello Canadian Prop Money Delivery Desk,\n\nI would like to inquire/order the following theatrical prop stacks:\n\n${body}\n\nEstimated Subtotal: $${totalCost.toFixed(
        2
      )} CAD\n\nPlease email checkout procedures or custom contract invoice.\nThanks!`
    )}`;
    window.location.href = mailto;
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addToOrder,
        removeItem,
        updateQty,
        clearOrder,
        totalItems,
        totalCost,
        isOrderBuilderVisible,
        setIsOrderBuilderVisible,
        sendWhatsApp,
        sendEmail,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
