// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Types — Ferma E-commerce
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export type Category =
  | 'tomate'
  | 'legume'
  | 'herbes'
  | 'conserves'
  | 'oeufs'
  | 'miel'
  | 'panier';

export type Season = 'printemps' | 'ete' | 'automne' | 'iarna' | 'vara';
export type Unit = 'kg' | 'botte' | 'piece' | 'borcan' | 'cutie' | 'fixed';

export interface Product {
  id: string;
  slug: string;
  name: { ro: string; en: string };
  description: { ro: string; en: string };
  story: { ro: string; en: string };
  price: number; // RON, ex: 1500 = 15.00 RON
  unit: Unit;
  stock: number;
  category: Category;
  season: Season[];
  images: string[];
  badges: string[];
  featured: boolean;
  available: boolean;
  weight?: number; // grams
  origin?: string;
  harvestDate?: string;
  stripePriceId?: string; // à configurer avec Stripe
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
}

export interface DeliverySlot {
  id: string;
  date: string; // ISO date
  timeRange: string; // "09:00-12:00"
  available: boolean;
  zone: string;
}

export interface Order {
  id: string;
  stripeSessionId: string;
  status: 'pending' | 'paid' | 'preparing' | 'delivered' | 'cancelled';
  customerEmail: string;
  customerName: string;
  customerPhone: string;
  deliveryAddress: string;
  deliverySlot?: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  createdAt: string;
}

export interface BoxSubscription {
  id: string;
  name: { ro: string; en: string };
  description: { ro: string; en: string };
  price: number; // per delivery, RON
  frequency: 'weekly' | 'biweekly';
  items: string[]; // descriptions
  stripePriceId?: string;
  image: string;
  popular?: boolean;
}

export interface StoreState {
  cart: CartItem[];
  isCartOpen: boolean;
  language: 'ro' | 'en';
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  setLanguage: (lang: 'ro' | 'en') => void;
  getCartTotal: () => number;
  getCartCount: () => number;
  getDeliveryFee: () => number;
}
