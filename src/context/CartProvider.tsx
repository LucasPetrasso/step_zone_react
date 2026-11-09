"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { products } from "@/data/products";

export type CartItem = {
  productId: string;
  size: number;
  quantity: number;
};

type CartContextValue = {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  discounts: number;
  total: number;
  isReady: boolean;
  addItem: (productId: string, size: number, quantity: number) => void;
  removeItem: (productId: string, size: number) => void;
  updateQuantity: (productId: string, size: number, quantity: number) => void;
  clearCart: () => void;
};

const STORAGE_KEY = "stepzone_cart";
const CHANGE_EVENT = "stepzone-cart-change";
const EMPTY_CART = "[]";
const CartContext = createContext<CartContextValue | null>(null);

function getCartSnapshot() {
  try {
    return window.localStorage.getItem(STORAGE_KEY) ?? EMPTY_CART;
  } catch (error) {
    console.error("Não foi possível ler o carrinho salvo.", error);
    return EMPTY_CART;
  }
}

function subscribeToCart(onChange: () => void) {
  window.addEventListener("storage", onChange);
  window.addEventListener(CHANGE_EVENT, onChange);
  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener(CHANGE_EVENT, onChange);
  };
}

function subscribeToReadiness() {
  return () => {};
}

function getClientReadiness() {
  return true;
}

function getServerReadiness() {
  return false;
}

function isCartItem(value: unknown): value is CartItem {
  if (!value || typeof value !== "object") return false;
  const item = value as Record<string, unknown>;
  const product =
    typeof item.productId === "string"
      ? products.find((entry) => entry.id === item.productId)
      : undefined;
  return (
    product !== undefined &&
    typeof item.size === "number" &&
    product.sizes.includes(item.size) &&
    typeof item.quantity === "number" &&
    Number.isInteger(item.quantity) &&
    item.quantity > 0
  );
}

function parseCart(snapshot: string): CartItem[] {
  try {
    const parsed: unknown = JSON.parse(snapshot);
    if (Array.isArray(parsed)) return parsed.filter(isCartItem);
    console.error("Os dados salvos do carrinho têm um formato inválido.");
  } catch (error) {
    console.error("Não foi possível interpretar o carrinho salvo.", error);
  }
  return [];
}

function saveCart(items: CartItem[]) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

export function CartProvider({ children }: { children: ReactNode }) {
  const snapshot = useSyncExternalStore(
    subscribeToCart,
    getCartSnapshot,
    () => EMPTY_CART,
  );
  const isReady = useSyncExternalStore(
    subscribeToReadiness,
    getClientReadiness,
    getServerReadiness,
  );
  const items = useMemo(() => parseCart(snapshot), [snapshot]);

  const addItem = useCallback(
    (productId: string, size: number, quantity: number) => {
      const current = parseCart(getCartSnapshot());
      const existing = current.find(
        (item) => item.productId === productId && item.size === size,
      );
      if (existing) {
        saveCart(
          current.map((item) =>
            item.productId === productId && item.size === size
              ? { ...item, quantity: item.quantity + quantity }
              : item,
          ),
        );
        return;
      }
      saveCart([...current, { productId, size, quantity }]);
    },
    [],
  );

  const removeItem = useCallback((productId: string, size: number) => {
    saveCart(
      parseCart(getCartSnapshot()).filter(
        (item) => item.productId !== productId || item.size !== size,
      ),
    );
  }, []);

  const updateQuantity = useCallback(
    (productId: string, size: number, quantity: number) => {
      if (quantity < 1) {
        removeItem(productId, size);
        return;
      }
      saveCart(
        parseCart(getCartSnapshot()).map((item) =>
          item.productId === productId && item.size === size
            ? { ...item, quantity }
            : item,
        ),
      );
    },
    [removeItem],
  );

  const value = useMemo(() => {
    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = items.reduce((sum, item) => {
      const product = products.find((entry) => entry.id === item.productId);
      return sum + (product?.originalPrice ?? product?.price ?? 0) * item.quantity;
    }, 0);
    const discounts = items.reduce((sum, item) => {
      const product = products.find((entry) => entry.id === item.productId);
      return (
        sum +
        ((product?.originalPrice ?? product?.price ?? 0) -
          (product?.price ?? 0)) *
          item.quantity
      );
    }, 0);

    return {
      items,
      itemCount,
      subtotal,
      discounts,
      total: subtotal - discounts,
      isReady,
      addItem,
      removeItem,
      updateQuantity,
      clearCart: () => saveCart([]),
    };
  }, [items, isReady, addItem, removeItem, updateQuantity]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart precisa ser usado dentro de CartProvider.");
  }
  return context;
}
