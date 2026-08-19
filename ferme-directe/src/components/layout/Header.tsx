'use client';

import React from 'react';
import Link from 'next/link';
import { ShoppingBasket, Menu, X, Globe, Leaf } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/store';
import { formatPrice } from '@/store';

const NAV_LINKS_RO = [
  { href: '/boutique', label: 'Magazin' },
  { href: '/paniers', label: 'Coșuri Abonament' },
  { href: '/notre-ferme', label: 'Ferma Noastră' },
];

const NAV_LINKS_EN = [
  { href: '/boutique', label: 'Shop' },
  { href: '/paniers', label: 'Subscription Baskets' },
  { href: '/notre-ferme', label: 'Our Farm' },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const { cart, toggleCart, getCartCount, getCartTotal, language, setLanguage } = useStore();
  const cartCount = getCartCount();
  const cartTotal = getCartTotal();
  const navLinks = language === 'ro' ? NAV_LINKS_RO : NAV_LINKS_EN;

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          transition: 'all 250ms cubic-bezier(0.16,1,0.3,1)',
          backgroundColor: scrolled ? 'rgba(249,244,234,0.95)' : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(201,194,180,0.4)' : '1px solid transparent',
        }}
      >
        <div className="container-site">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '72px' }}>
            {/* Logo */}
            <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{
                width: 36, height: 36,
                background: 'var(--color-terracotta)',
                borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Leaf size={18} color="white" />
              </div>
              <span style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.5rem',
                fontWeight: 600,
                color: 'var(--color-brown)',
                letterSpacing: '-0.02em',
              }}>
                Ferma
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav style={{ display: 'flex', gap: '0.25rem', alignItems: 'center' }} className="hidden-mobile">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.9375rem',
                    fontWeight: 500,
                    color: 'var(--color-brown-light)',
                    textDecoration: 'none',
                    padding: '0.5rem 0.875rem',
                    borderRadius: 'var(--radius-md)',
                    transition: 'all 150ms ease',
                  }}
                  onMouseEnter={e => {
                    (e.target as HTMLElement).style.color = 'var(--color-terracotta)';
                    (e.target as HTMLElement).style.background = 'rgba(196,98,45,0.06)';
                  }}
                  onMouseLeave={e => {
                    (e.target as HTMLElement).style.color = 'var(--color-brown-light)';
                    (e.target as HTMLElement).style.background = 'transparent';
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Right Actions */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              {/* Language Toggle */}
              <button
                onClick={() => setLanguage(language === 'ro' ? 'en' : 'ro')}
                className="btn btn-ghost btn-sm"
                style={{ gap: '0.25rem', fontWeight: 500, fontSize: '0.8125rem', color: 'var(--color-text-muted)' }}
                title={language === 'ro' ? 'Switch to English' : 'Schimbă în Română'}
              >
                <Globe size={14} />
                {language === 'ro' ? 'EN' : 'RO'}
              </button>

              {/* Cart button */}
              <button
                id="cart-button"
                onClick={toggleCart}
                className="btn btn-primary btn-sm"
                style={{ gap: '0.5rem', position: 'relative' }}
              >
                <ShoppingBasket size={16} />
                <span className="hidden-mobile">
                  {cartCount > 0 ? formatPrice(cartTotal) : (language === 'ro' ? 'Coș' : 'Basket')}
                </span>
                <AnimatePresence>
                  {cartCount > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      style={{
                        position: 'absolute',
                        top: -6,
                        right: -6,
                        width: 18,
                        height: 18,
                        background: 'var(--color-brown)',
                        color: 'white',
                        borderRadius: '50%',
                        fontSize: '0.6875rem',
                        fontWeight: 700,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {cartCount}
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>

              {/* Mobile menu button */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="btn btn-ghost btn-icon show-mobile"
                aria-label="Menu"
              >
                {menuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              style={{
                background: 'var(--color-surface)',
                borderTop: '1px solid var(--color-light)',
                overflow: 'hidden',
              }}
            >
              <div className="container-site" style={{ paddingTop: '1rem', paddingBottom: '1rem' }}>
                {navLinks.map((link, i) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    style={{
                      display: 'block',
                      padding: '0.875rem 0',
                      fontFamily: 'var(--font-body)',
                      fontSize: '1.0625rem',
                      fontWeight: 500,
                      color: 'var(--color-brown)',
                      textDecoration: 'none',
                      borderBottom: i < navLinks.length - 1 ? '1px solid var(--color-light)' : 'none',
                    }}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
        }
        @media (min-width: 769px) {
          .hidden-mobile { display: flex !important; }
          .show-mobile { display: none !important; }
        }
      `}</style>
    </>
  );
}
