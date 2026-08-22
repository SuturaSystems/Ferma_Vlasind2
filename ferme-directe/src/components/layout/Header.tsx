'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingBag, Menu, X, Globe, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore, formatPrice } from '@/store';

const NAV_LINKS = {
  ro: [
    { href: '/boutique', label: 'Magazin & Recoltă' },
    { href: '/paniers', label: 'Coșuri Abonament' },
    { href: '/notre-ferme', label: 'Povestea Fermei' },
  ],
  en: [
    { href: '/boutique', label: 'Shop & Harvest' },
    { href: '/paniers', label: 'Weekly Baskets' },
    { href: '/notre-ferme', label: 'Our Story' },
  ],
};

export default function Header() {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);
  const pathname = usePathname();

  const { cart, toggleCart, getCartCount, getCartTotal, language, setLanguage } = useStore();
  const cartCount = mounted ? getCartCount() : 0;
  const cartTotal = mounted ? getCartTotal() : 0;
  const navLinks = language === 'ro' ? NAV_LINKS.ro : NAV_LINKS.en;

  React.useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      {/* Top micro-announcement banner */}
      <div style={{
        backgroundColor: '#1C1917',
        color: '#F5EDE0',
        fontSize: '0.75rem',
        letterSpacing: '0.04em',
        padding: '0.45rem 1rem',
        textAlign: 'center',
        fontWeight: 500,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem',
        zIndex: 110,
        position: 'relative',
      }}>
        <span style={{ display: 'inline-block', width: 6, height: 6, borderRadius: '50%', backgroundColor: '#52B788' }} />
        <span>
          {language === 'ro' 
            ? 'Recoltă zilnică în Oltenia • Livrare gratuită de la 150 RON'
            : 'Fresh daily harvest in Oltenia • Free delivery on orders over 150 RON'}
        </span>
      </div>

      <header
        style={{
          position: 'sticky',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          transition: 'all 200ms ease',
          backgroundColor: scrolled ? 'rgba(251, 249, 245, 0.94)' : 'rgba(251, 249, 245, 0.85)',
          backdropFilter: 'blur(16px)',
          borderBottom: '1px solid',
          borderColor: scrolled ? 'rgba(28, 25, 23, 0.1)' : 'rgba(28, 25, 23, 0.05)',
        }}
      >
        <div className="container-site">
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '70px',
          }}>
            {/* Brand Logo & Seal */}
            <Link
              href="/"
              style={{
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
              }}
            >
              <div
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: '50%',
                  backgroundColor: 'var(--color-terracotta)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFFFFF',
                  boxShadow: '0 2px 8px rgba(148, 46, 31, 0.25)',
                }}
              >
                <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', fontStyle: 'italic', fontWeight: 600 }}>F</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.5rem',
                    fontWeight: 700,
                    color: 'var(--color-ink)',
                    letterSpacing: '-0.02em',
                    lineHeight: 1,
                  }}
                >
                  Ferma
                </span>
                <span
                  style={{
                    fontSize: '0.625rem',
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    color: 'var(--color-ink-muted)',
                    fontWeight: 600,
                    marginTop: '2px',
                  }}
                >
                  Oltenia • 1994
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav style={{ display: 'flex', alignItems: 'center', gap: '2rem' }} className="hidden-mobile">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.9375rem',
                      fontWeight: isActive ? 600 : 500,
                      color: isActive ? 'var(--color-terracotta)' : 'var(--color-ink)',
                      textDecoration: 'none',
                      position: 'relative',
                      padding: '0.35rem 0',
                      transition: 'color 150ms ease',
                    }}
                    onMouseEnter={(e) => ((e.target as HTMLElement).style.color = 'var(--color-terracotta)')}
                    onMouseLeave={(e) => {
                      if (!isActive) (e.target as HTMLElement).style.color = 'var(--color-ink)';
                    }}
                  >
                    {link.label}
                    {isActive && (
                      <motion.div
                        layoutId="activeNav"
                        style={{
                          position: 'absolute',
                          bottom: -2,
                          left: 0,
                          right: 0,
                          height: 2,
                          backgroundColor: 'var(--color-terracotta)',
                          borderRadius: 2,
                        }}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Header Actions */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              {/* Language Switcher */}
              <button
                onClick={() => setLanguage(language === 'ro' ? 'en' : 'ro')}
                className="btn btn-ghost btn-sm"
                style={{
                  gap: '0.35rem',
                  fontSize: '0.8125rem',
                  fontWeight: 600,
                  border: '1px solid var(--color-border)',
                  padding: '0.35rem 0.65rem',
                }}
                aria-label="Toggle language"
              >
                <Globe size={13} color="var(--color-ink-muted)" />
                <span>{language.toUpperCase()}</span>
              </button>

              {/* Cart Drawer Trigger */}
              <button
                id="cart-button"
                onClick={toggleCart}
                className="btn btn-primary btn-sm"
                style={{
                  gap: '0.5rem',
                  position: 'relative',
                  padding: '0.45rem 1rem',
                }}
              >
                <ShoppingBag size={15} />
                <span>{cartCount > 0 ? formatPrice(cartTotal) : (language === 'ro' ? 'Coș' : 'Cart')}</span>
                {cartCount > 0 && (
                  <span
                    style={{
                      width: 18,
                      height: 18,
                      borderRadius: '50%',
                      backgroundColor: '#FFFFFF',
                      color: 'var(--color-terracotta)',
                      fontSize: '0.6875rem',
                      fontWeight: 700,
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginLeft: '0.15rem',
                    }}
                  >
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Mobile Hamburger */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="btn btn-ghost btn-icon show-mobile"
                aria-label="Open menu"
                style={{ border: '1px solid var(--color-border)' }}
              >
                {menuOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              style={{
                backgroundColor: 'var(--color-surface)',
                borderTop: '1px solid var(--color-border)',
                overflow: 'hidden',
              }}
            >
              <div className="container-site" style={{ padding: '1.25rem 1.5rem' }}>
                <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      style={{
                        fontFamily: 'var(--font-serif)',
                        fontSize: '1.35rem',
                        fontWeight: 600,
                        color: 'var(--color-ink)',
                        textDecoration: 'none',
                        padding: '0.75rem 0',
                        borderBottom: '1px solid var(--color-border-subtle)',
                      }}
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <style>{`
        @media (max-width: 820px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
        }
        @media (min-width: 821px) {
          .hidden-mobile { display: flex !important; }
          .show-mobile { display: none !important; }
        }
      `}</style>
    </>
  );
}
