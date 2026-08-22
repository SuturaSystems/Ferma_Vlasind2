'use client';

import React from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight, Truck, Loader2 } from 'lucide-react';
import { useStore, formatPrice, FREE_DELIVERY_MIN } from '@/store';

export default function CartDrawer() {
  const {
    cart,
    isCartOpen,
    toggleCart,
    updateQuantity,
    removeFromCart,
    getCartTotal,
    getDeliveryFee,
    language,
  } = useStore();

  const [checkingOut, setCheckingOut] = React.useState(false);
  const l = language;
  const subtotal = getCartTotal();
  const deliveryFee = getDeliveryFee();
  const total = subtotal + deliveryFee;
  const toFreeDelivery = FREE_DELIVERY_MIN - subtotal;

  const t = {
    title: l === 'ro' ? 'Coșul Tău de Cumpărături' : 'Your Farm Basket',
    emptyTitle: l === 'ro' ? 'Coșul este gol' : 'Your basket is empty',
    emptyDesc: l === 'ro' ? 'Descoperă recolta noastră proaspătă din această dimineață.' : 'Explore our fresh morning harvest to fill your basket.',
    exploreBtn: l === 'ro' ? 'Explorează Magazinul' : 'Explore the Shop',
    freeDeliveryUnlocked: l === 'ro' ? 'Ai deblocat livrarea gratuită!' : 'Free delivery unlocked!',
    freeDeliveryRemaining: l === 'ro'
      ? `Adaugă ${formatPrice(toFreeDelivery)} pentru livrare gratuită`
      : `Add ${formatPrice(toFreeDelivery)} for free delivery`,
    subtotal: l === 'ro' ? 'Subtotal produse' : 'Items subtotal',
    delivery: l === 'ro' ? 'Livrare locală' : 'Local delivery',
    free: l === 'ro' ? 'Gratuită' : 'Free',
    total: l === 'ro' ? 'Total comandă' : 'Total order',
    checkout: l === 'ro' ? 'Finalizează Comanda' : 'Proceed to Checkout',
  };

  const handleCheckout = async () => {
    setCheckingOut(true);
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
        alert(data.error || 'Eroare la inițializarea plății');
      }
    } catch {
      alert('Eroare de rețea. Vă rugăm încercați din nou.');
    } finally {
      setCheckingOut(false);
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
              position: 'fixed',
              inset: 0,
              zIndex: 200,
              backgroundColor: 'rgba(28, 25, 23, 0.45)',
              backdropFilter: 'blur(6px)',
            }}
          />

          {/* Drawer Panel */}
          <motion.aside
            id="cart-drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              bottom: 0,
              width: '100%',
              maxWidth: '460px',
              backgroundColor: '#FFFFFF',
              zIndex: 300,
              display: 'flex',
              flexDirection: 'column',
              boxShadow: 'var(--shadow-xl)',
            }}
          >
            {/* Header */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '1.25rem 1.5rem',
                borderBottom: '1px solid var(--color-border)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    backgroundColor: 'var(--color-terracotta-soft)',
                    color: 'var(--color-terracotta)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <ShoppingBag size={16} />
                </div>
                <h2
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.35rem',
                    fontWeight: 600,
                    color: 'var(--color-ink)',
                  }}
                >
                  {t.title}
                </h2>
              </div>
              <button
                onClick={toggleCart}
                className="btn btn-ghost btn-icon"
                aria-label="Închide coșul"
              >
                <X size={18} />
              </button>
            </div>

            {/* Free Delivery Bar */}
            {subtotal > 0 && (
              <div
                style={{
                  padding: '0.85rem 1.5rem',
                  backgroundColor: 'var(--color-bg-subtle)',
                  borderBottom: '1px solid var(--color-border)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
                  <Truck size={14} color={toFreeDelivery <= 0 ? 'var(--color-laurel)' : 'var(--color-ink-muted)'} />
                  <span
                    style={{
                      fontSize: '0.8125rem',
                      fontWeight: 600,
                      color: toFreeDelivery <= 0 ? 'var(--color-laurel)' : 'var(--color-ink-muted)',
                    }}
                  >
                    {toFreeDelivery <= 0 ? t.freeDeliveryUnlocked : t.freeDeliveryRemaining}
                  </span>
                </div>
                <div
                  style={{
                    height: 4,
                    backgroundColor: 'rgba(28, 25, 23, 0.08)',
                    borderRadius: 9999,
                    overflow: 'hidden',
                  }}
                >
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min((subtotal / FREE_DELIVERY_MIN) * 100, 100)}%` }}
                    style={{
                      height: '100%',
                      backgroundColor: toFreeDelivery <= 0 ? 'var(--color-laurel)' : 'var(--color-terracotta)',
                      borderRadius: 9999,
                    }}
                  />
                </div>
              </div>
            )}

            {/* Cart Items List */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '1.25rem 1.5rem' }}>
              {cart.length === 0 ? (
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100%',
                    textAlign: 'center',
                    gap: '1rem',
                  }}
                >
                  <div
                    style={{
                      width: 64,
                      height: 64,
                      borderRadius: '50%',
                      backgroundColor: 'var(--color-bg-subtle)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--color-ink-faint)',
                    }}
                  >
                    <ShoppingBag size={28} />
                  </div>
                  <div>
                    <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.25rem' }}>
                      {t.emptyTitle}
                    </h3>
                    <p style={{ fontSize: '0.875rem', color: 'var(--color-ink-muted)', maxWidth: '28ch' }}>
                      {t.emptyDesc}
                    </p>
                  </div>
                  <button onClick={toggleCart} className="btn btn-primary btn-sm">
                    {t.exploreBtn}
                  </button>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <AnimatePresence initial={false}>
                    {cart.map((item) => {
                      const itemImg = item.product.images?.[0] || '/images/hero-tomatoes.jpg';
                      return (
                        <motion.div
                          key={item.product.id}
                          layout
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, x: 20, transition: { duration: 0.2 } }}
                          style={{
                            display: 'flex',
                            gap: '1rem',
                            padding: '0.85rem',
                            backgroundColor: 'var(--color-bg)',
                            borderRadius: 'var(--radius-md)',
                            border: '1px solid var(--color-border-subtle)',
                          }}
                        >
                          {/* Thumbnail */}
                          <div
                            style={{
                              position: 'relative',
                              width: 64,
                              height: 64,
                              borderRadius: 'var(--radius-sm)',
                              overflow: 'hidden',
                              flexShrink: 0,
                              backgroundColor: '#EAE5DB',
                            }}
                          >
                            <Image
                              src={itemImg}
                              alt={item.product.name[l]}
                              fill
                              sizes="64px"
                              style={{ objectFit: 'cover' }}
                            />
                          </div>

                          {/* Info & Stepper */}
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.25rem' }}>
                              <p style={{ fontWeight: 600, fontSize: '0.9375rem', color: 'var(--color-ink)', lineHeight: 1.3 }}>
                                {item.product.name[l]}
                              </p>
                              <button
                                onClick={() => removeFromCart(item.product.id)}
                                style={{
                                  background: 'none',
                                  border: 'none',
                                  color: 'var(--color-ink-faint)',
                                  cursor: 'pointer',
                                  padding: '2px',
                                }}
                                aria-label="Remove item"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>

                            <p style={{ fontSize: '0.75rem', color: 'var(--color-ink-muted)', marginBottom: '0.65rem' }}>
                              {formatPrice(item.product.price)} / {item.product.unit}
                            </p>

                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                              {/* Quantity Stepper */}
                              <div
                                style={{
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  backgroundColor: '#FFFFFF',
                                  border: '1px solid var(--color-border)',
                                  borderRadius: 'var(--radius-full)',
                                  padding: '1px',
                                }}
                              >
                                <button
                                  onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                  className="btn btn-ghost"
                                  style={{ width: 26, height: 26, padding: 0, borderRadius: '50%' }}
                                  aria-label="Decrease"
                                >
                                  <Minus size={12} />
                                </button>
                                <span style={{ width: '1.75rem', textAlign: 'center', fontWeight: 600, fontSize: '0.875rem' }}>
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                  disabled={item.quantity >= item.product.stock}
                                  className="btn btn-ghost"
                                  style={{ width: 26, height: 26, padding: 0, borderRadius: '50%' }}
                                  aria-label="Increase"
                                >
                                  <Plus size={12} />
                                </button>
                              </div>

                              <span style={{ fontWeight: 700, fontSize: '0.9375rem', color: 'var(--color-ink)' }}>
                                {formatPrice(item.product.price * item.quantity)}
                              </span>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </div>
              )}
            </div>

            {/* Footer Summary & Checkout */}
            {cart.length > 0 && (
              <div
                style={{
                  padding: '1.25rem 1.5rem',
                  borderTop: '1px solid var(--color-border)',
                  backgroundColor: '#FFFFFF',
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.25rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', color: 'var(--color-ink-muted)' }}>
                    <span>{t.subtotal}</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', color: 'var(--color-ink-muted)' }}>
                    <span>{t.delivery}</span>
                    <span style={{ color: deliveryFee === 0 ? 'var(--color-laurel)' : undefined, fontWeight: deliveryFee === 0 ? 600 : 400 }}>
                      {deliveryFee === 0 ? t.free : formatPrice(deliveryFee)}
                    </span>
                  </div>
                  <div style={{ height: 1, backgroundColor: 'var(--color-border-subtle)', margin: '0.25rem 0' }} />
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: '1.125rem', color: 'var(--color-ink)' }}>
                    <span>{t.total}</span>
                    <span style={{ color: 'var(--color-terracotta)' }}>{formatPrice(total)}</span>
                  </div>
                </div>

                <button
                  id="checkout-button"
                  onClick={handleCheckout}
                  disabled={checkingOut}
                  className="btn btn-primary btn-lg"
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  {checkingOut ? (
                    <>
                      <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} />
                      <span>{l === 'ro' ? 'Se redirecționează...' : 'Redirecting...'}</span>
                    </>
                  ) : (
                    <>
                      <span>{t.checkout}</span>
                      <ArrowRight size={16} />
                    </>
                  )}
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
