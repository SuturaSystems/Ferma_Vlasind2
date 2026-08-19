'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartItem, Product, StoreState } from '@/types';

// Frais de livraison fixes (en centimes RON)
const BASE_DELIVERY_FEE = 1500; // 15 RON
const FREE_DELIVERY_THRESHOLD = 15000; // 150 RON commande minimum

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      cart: [],
      isCartOpen: false,
      language: 'ro',

      addToCart: (product: Product, quantity = 1) => {
        set((state) => {
          const existing = state.cart.find((item) => item.product.id === product.id);
          if (existing) {
            return {
              cart: state.cart.map((item) =>
                item.product.id === product.id
                  ? { ...item, quantity: Math.min(item.quantity + quantity, product.stock) }
                  : item
              ),
            };
          }
          return { cart: [...state.cart, { product, quantity }], isCartOpen: true };
        });
      },

      removeFromCart: (productId: string) => {
        set((state) => ({
          cart: state.cart.filter((item) => item.product.id !== productId),
        }));
      },

      updateQuantity: (productId: string, quantity: number) => {
        set((state) => {
          if (quantity <= 0) {
            return { cart: state.cart.filter((item) => item.product.id !== productId) };
          }
          return {
            cart: state.cart.map((item) =>
              item.product.id === productId ? { ...item, quantity } : item
            ),
          };
        });
      },

      clearCart: () => set({ cart: [] }),

      toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),

      setLanguage: (lang: 'ro' | 'en') => set({ language: lang }),

      getCartTotal: () => {
        const { cart } = get();
        return cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
      },

      getCartCount: () => {
        const { cart } = get();
        return cart.reduce((sum, item) => sum + item.quantity, 0);
      },

      getDeliveryFee: () => {
        const total = get().getCartTotal();
        return total >= FREE_DELIVERY_THRESHOLD ? 0 : BASE_DELIVERY_FEE;
      },
    }),
    {
      name: 'ferma-cart',
      partialize: (state) => ({ cart: state.cart, language: state.language }),
    }
  )
);

// Helpers
export function formatPrice(cents: number): string {
  return (cents / 100).toLocaleString('ro-RO', {
    style: 'currency',
    currency: 'RON',
    minimumFractionDigits: 2,
  });
}

export const FREE_DELIVERY_MIN = FREE_DELIVERY_THRESHOLD;
