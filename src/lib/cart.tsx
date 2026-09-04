import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

import { purchaseOptionIndex, type PurchaseOption } from "@/lib/menu-options";

export type CartLine = {
  id: string;
  name: string;
  optionLabel?: string;
  price: number;
  img: string;
  category: string;
  qty: number;
};

type StoredLine = { id: string; qty: number };

const STORAGE_KEY = "westburger-cart-v1";

type CartContextValue = {
  lines: CartLine[];
  count: number;
  subtotal: number;
  addItem: (option: PurchaseOption, qty?: number) => void;
  setQty: (id: string, qty: number) => void;
  increment: (id: string) => void;
  decrement: (id: string) => void;
  removeItem: (id: string) => void;
  clear: () => void;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  // Load persisted cart after hydration (avoids SSR mismatch).
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const stored = JSON.parse(raw) as StoredLine[];
        const restored: CartLine[] = [];
        for (const line of stored) {
          const option = line ? purchaseOptionIndex[line.id] : undefined;
          if (option && line.qty > 0) {
            restored.push({ ...option, qty: Math.min(99, Math.round(line.qty)) });
          }
        }
        if (restored.length) setLines(restored);
      }
    } catch {
      /* ignore corrupted storage */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(lines.map(({ id, qty }) => ({ id, qty }))),
      );
    } catch {
      /* storage unavailable */
    }
  }, [lines, hydrated]);

  const addItem = useCallback((option: PurchaseOption, qty = 1) => {
    setLines((current) => {
      const existing = current.find((line) => line.id === option.id);
      if (existing) {
        return current.map((line) =>
          line.id === option.id ? { ...line, qty: Math.min(99, line.qty + qty) } : line,
        );
      }
      return [...current, { ...option, qty }];
    });
  }, []);

  const setQty = useCallback((id: string, qty: number) => {
    setLines((current) =>
      qty <= 0
        ? current.filter((line) => line.id !== id)
        : current.map((line) => (line.id === id ? { ...line, qty: Math.min(99, qty) } : line)),
    );
  }, []);

  const increment = useCallback((id: string) => {
    setLines((current) =>
      current.map((line) => (line.id === id ? { ...line, qty: Math.min(99, line.qty + 1) } : line)),
    );
  }, []);

  const decrement = useCallback((id: string) => {
    setLines((current) =>
      current.flatMap((line) =>
        line.id === id ? (line.qty <= 1 ? [] : [{ ...line, qty: line.qty - 1 }]) : [line],
      ),
    );
  }, []);

  const removeItem = useCallback((id: string) => {
    setLines((current) => current.filter((line) => line.id !== id));
  }, []);

  const clear = useCallback(() => setLines([]), []);

  const value = useMemo<CartContextValue>(() => {
    const count = lines.reduce((sum, line) => sum + line.qty, 0);
    const subtotal = lines.reduce((sum, line) => sum + line.qty * line.price, 0);
    return {
      lines,
      count,
      subtotal,
      addItem,
      setQty,
      increment,
      decrement,
      removeItem,
      clear,
      isOpen,
      openCart: () => setIsOpen(true),
      closeCart: () => setIsOpen(false),
    };
  }, [lines, isOpen, addItem, setQty, increment, decrement, removeItem, clear]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
}
