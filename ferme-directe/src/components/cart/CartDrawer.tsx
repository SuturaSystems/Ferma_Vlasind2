'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBasket, Plus, Minus, Trash2, ChevronRight, Truck } from 'lucide-react';
import { useStore, formatPrice, FREE_DELIVERY_MIN } from '@/store';
import Image from 'next/image';

export default function CartDrawer() {
  const { cart, isCartOpen, toggleCart, updateQuantity, removeFromCart, getCartTotal, getDeliveryFee, language } = useStore();
  const subtotal = getCartTotal();
  const deliveryFee = getDeliveryFee();
  const total = subtotal + deliveryFee;
  const toFreeDelivery = FREE_DELIVERY_MIN - subtotal;

  const t = {
    title: language === 'ro' ? 'Coșul meu' : 'My Basket',
    empty: language === 'ro' ? 'Coșul este gol' : 'Your basket is empty',
    emptyHint: language === 'ro' ? 'Adaugă produse proaspete de la ferma noastră' : 'Add fresh products from our farm',
    explore: language === 'ro' ? 'Explorează magazinul' : 'Explore the shop',
    delivery: language === 'ro' ? 'Livrare' : 'Delivery',
    free: language === 'ro' ? 'Gratuită' : 'Free',
    toFree: language === 'ro' ? `Adaugă ${formatPrice(toFreeDelivery)} pentru livrare gratuită` : `Add ${formatPrice(toFreeDelivery)} for free delivery`,
    subtotal: language === 'ro' ? 'Subtotal' : 'Subtotal',
    total: language === 'ro' ? 'Total' : 'Total',
    checkout: language === 'ro' ? 'Finalizează comanda' : 'Checkout',
  };

  const handleCheckout = async () => {
    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: cart, deliveryFee }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert(data.error || 'Eroare la plată');
      }
    } catch {
      alert('Eroare de rețea. Încercați din nou.');
    }
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            id="cart-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleCart}
            style={{
              position: 'fixed', inset: 0, zIndex: 200,
              background: 'rgba(42,34,24,0.5)',
              backdropFilter: 'blur(4px)',
            }}
          />

          {/* Drawer */}
          <motion.aside
            id="cart-drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            style={{
              position: 'fixed', top: 0, right: 0, bottom: 0,
              width: '100%', maxWidth: '440px',
              background: 'var(--color-surface)',
              zIndex: 300,
              display: 'flex', flexDirection: 'column',
              boxShadow: 'var(--shadow-xl)',
            }}
          >
            {/* Header */}
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '1.25rem 1.5rem',
              borderBottom: '1px solid var(--color-light)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                <ShoppingBasket size={20} color="var(--color-terracotta)" />
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 600 }}>
                  {t.title}
                </h2>
              </div>
              <button onClick={toggleCart} className="btn btn-ghost btn-icon" aria-label="Închide coșul">
                <X size={20} />
              </button>
            </div>

            {/* Free delivery progress */}
            {subtotal > 0 && toFreeDelivery > 0 && (
              <div style={{ padding: '0.875rem 1.5rem', background: 'var(--color-cream)', borderBottom: '1px solid var(--color-cream-dark)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <Truck size={14} color="var(--color-sage)" />
                  <span style={{ fontSize: '0.8125rem', color: 'var(--color-sage-dark)', fontWeight: 500 }}>
                    {t.toFree}
                  </span>
                </div>
                <div style={{ height: 4, background: 'var(--color-cream-dark)', borderRadius: 2, overflow: 'hidden' }}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min((subtotal / FREE_DELIVERY_MIN) * 100, 100)}%` }}
                    style={{ height: '100%', background: 'var(--color-sage)', borderRadius: 2 }}
                  />
                </div>
              </div>
            )}

            {/* Cart Items */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '1rem 1.5rem' }}>
              {cart.length === 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: '1rem', textAlign: 'center' }}>
                  <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'var(--color-cream)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <ShoppingBasket size={28} color="var(--color-mid)" />
                  </div>
                  <div>
                    <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.125rem', fontWeight: 600, marginBottom: '0.375rem' }}>{t.empty}</p>
                    <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>{t.emptyHint}</p>
                  </div>
                  <a href="/boutique" onClick={toggleCart} className="btn btn-primary btn-sm">
                    {t.explore} <ChevronRight size={14} />
                  </a>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <AnimatePresence initial={false}>
                    {cart.map((item) => (
                      <motion.div
                        key={item.product.id}
                        layout
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: 30, transition: { duration: 0.2 } }}
                        style={{
                          display: 'flex', gap: '0.875rem', alignItems: 'flex-start',
                          padding: '0.875rem',
                          background: 'var(--color-offwhite)',
                          borderRadius: 'var(--radius-md)',
                        }}
                      >
                        {/* Image placeholder */}
                        <div style={{
                          width: 72, height: 72, flexShrink: 0,
                          background: 'var(--color-cream)',
                          borderRadius: 'var(--radius-md)',
                          overflow: 'hidden',
                          position: 'relative',
                        }}>
                          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>
                            🍅
                          </div>
                        </div>

                        <div style={{ flex: 1, minWidth: 0 }}>
                          <p style={{ fontWeight: 600, fontSize: '0.9375rem', marginBottom: '0.25rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            {item.product.name[language]}
                          </p>
                          <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)', marginBottom: '0.5rem' }}>
                            {formatPrice(item.product.price)} / {item.product.unit}
                          </p>

                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            {/* Quantity */}
                            <div style={{
                              display: 'flex', alignItems: 'center', gap: '0.5rem',
                              background: 'var(--color-surface)',
                              borderRadius: 'var(--radius-md)',
                              padding: '0.125rem',
                              border: '1px solid var(--color-light)',
                            }}>
                              <button
                                onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                className="btn btn-ghost"
                                style={{ padding: '0.25rem', borderRadius: 'var(--radius-sm)' }}
                              >
                                <Minus size={14} />
                              </button>
                              <span style={{ minWidth: '1.5rem', textAlign: 'center', fontWeight: 600, fontSize: '0.9375rem' }}>
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                disabled={item.quantity >= item.product.stock}
                                className="btn btn-ghost"
                                style={{ padding: '0.25rem', borderRadius: 'var(--radius-sm)' }}
                              >
                                <Plus size={14} />
                              </button>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                              <span style={{ fontWeight: 700, color: 'var(--color-terracotta)' }}>
                                {formatPrice(item.product.price * item.quantity)}
                              </span>
                              <button
                                onClick={() => removeFromCart(item.product.id)}
                                className="btn btn-ghost"
                                style={{ padding: '0.25rem', color: 'var(--color-text-muted)' }}
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>

            {/* Footer Summary */}
            {cart.length > 0 && (
              <div style={{ padding: '1.25rem 1.5rem', borderTop: '1px solid var(--color-light)', background: 'var(--color-surface)' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9375rem', color: 'var(--color-text-muted)' }}>
                    <span>{t.subtotal}</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9375rem', color: 'var(--color-text-muted)' }}>
                    <span>{t.delivery}</span>
                    <span style={{ color: deliveryFee === 0 ? 'var(--color-success)' : undefined }}>
                      {deliveryFee === 0 ? t.free : formatPrice(deliveryFee)}
                    </span>
                  </div>
                  <div className="divider" style={{ margin: '0.375rem 0' }} />
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: '1.0625rem' }}>
                    <span>{t.total}</span>
                    <span style={{ color: 'var(--color-terracotta)' }}>{formatPrice(total)}</span>
                  </div>
                </div>

                <button
                  id="checkout-button"
                  onClick={handleCheckout}
                  className="btn btn-primary btn-lg"
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  {t.checkout} <ChevronRight size={18} />
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
