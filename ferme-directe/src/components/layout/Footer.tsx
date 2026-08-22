'use client';

import React from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, ArrowRight, Check } from 'lucide-react';
import { useStore } from '@/store';

export default function Footer() {
  const { language } = useStore();
  const l = language;
  const currentYear = new Date().getFullYear();
  const [subscribed, setSubscribed] = React.useState(false);
  const [email, setEmail] = React.useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer
      style={{
        backgroundColor: '#1C1917',
        color: '#FBF9F5',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        padding: '5rem 0 2.5rem',
      }}
    >
      <div className="container-site">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '3.5rem',
            marginBottom: '4rem',
          }}
        >
          {/* Brand & Mission Column */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1.25rem' }}>
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: '50%',
                  backgroundColor: 'var(--color-terracotta)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFFFFF',
                }}
              >
                <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1rem', fontStyle: 'italic', fontWeight: 700 }}>F</span>
              </div>
              <span
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.5rem',
                  fontWeight: 700,
                  color: '#FFFFFF',
                  letterSpacing: '-0.02em',
                }}
              >
                Ferma
              </span>
            </div>

            <p style={{ fontSize: '0.9375rem', color: 'rgba(251, 249, 245, 0.7)', lineHeight: 1.65, marginBottom: '1.5rem' }}>
              {l === 'ro'
                ? 'Agricultură regenerativă și alimente de patrimoniu din Oltenia. Culese în zori și livrate la ușa ta.'
                : 'Regenerative farming and heritage produce from Oltenia. Harvested at dawn and delivered to your doorstep.'}
            </p>

            <div style={{ fontSize: '0.8125rem', color: 'rgba(251, 249, 245, 0.5)' }}>
              {l === 'ro' ? 'Certificat Fără Pesticide • Sol Viu' : 'Certified Pesticide Free • Living Soil'}
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h3
              style={{
                fontSize: '0.75rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                color: 'var(--color-saffron)',
                marginBottom: '1.25rem',
              }}
            >
              {l === 'ro' ? 'Navigare' : 'Navigation'}
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {[
                { href: '/boutique', label: l === 'ro' ? 'Magazin & Recoltă' : 'Shop & Harvest' },
                { href: '/paniers', label: l === 'ro' ? 'Coșuri Săptămânale' : 'Weekly Baskets' },
                { href: '/notre-ferme', label: l === 'ro' ? 'Povestea Fermei' : 'Our Story' },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    fontSize: '0.9375rem',
                    color: 'rgba(251, 249, 245, 0.75)',
                    textDecoration: 'none',
                    transition: 'color 150ms ease',
                  }}
                  onMouseEnter={(e) => ((e.target as HTMLElement).style.color = '#FFFFFF')}
                  onMouseLeave={(e) => ((e.target as HTMLElement).style.color = 'rgba(251, 249, 245, 0.75)')}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact & Terroir */}
          <div>
            <h3
              style={{
                fontSize: '0.75rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                color: 'var(--color-saffron)',
                marginBottom: '1.25rem',
              }}
            >
              {l === 'ro' ? 'Contact & Livrare' : 'Contact & Delivery'}
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', fontSize: '0.9375rem', color: 'rgba(251, 249, 245, 0.75)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <MapPin size={15} color="var(--color-terracotta)" />
                <span>Oltenia, România (Livrare locală)</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Phone size={15} color="var(--color-laurel)" />
                <span>+40 700 000 000</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Mail size={15} color="var(--color-saffron)" />
                <span>contact@ferma.ro</span>
              </div>
            </div>
          </div>

          {/* Newsletter / Harvest Alert */}
          <div>
            <h3
              style={{
                fontSize: '0.75rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                color: 'var(--color-saffron)',
                marginBottom: '1.25rem',
              }}
            >
              {l === 'ro' ? 'Buletinul Recoltei' : 'Harvest Bulletin'}
            </h3>
            <p style={{ fontSize: '0.875rem', color: 'rgba(251, 249, 245, 0.7)', marginBottom: '1rem', lineHeight: 1.5 }}>
              {l === 'ro'
                ? 'Primește notificări săptămânale despre produsele proaspăt culese și oferte de sezon.'
                : 'Receive weekly updates on newly harvested batches and seasonal specialties.'}
            </p>

            {subscribed ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#52B788', fontSize: '0.875rem', fontWeight: 600 }}>
                <Check size={16} />
                <span>{l === 'ro' ? 'Mulțumim! Ești abonat.' : 'Thank you! You are subscribed.'}</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} style={{ display: 'flex', gap: '0.5rem' }}>
                <input
                  type="email"
                  required
                  placeholder={l === 'ro' ? 'Adresa ta de email' : 'Your email address'}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.08)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    borderRadius: 'var(--radius-sm)',
                    padding: '0.5rem 0.85rem',
                    color: '#FFFFFF',
                    fontSize: '0.875rem',
                    flex: 1,
                    outline: 'none',
                  }}
                />
                <button
                  type="submit"
                  className="btn btn-primary btn-sm"
                  style={{ padding: '0.5rem 0.85rem' }}
                  aria-label="Subscribe"
                >
                  <ArrowRight size={14} />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Legal Bar */}
        <div
          style={{
            paddingTop: '2rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem',
            fontSize: '0.8125rem',
            color: 'rgba(251, 249, 245, 0.4)',
          }}
        >
          <span>© {currentYear} Ferma • Toate drepturile rezervate.</span>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <span>Oltenia, România</span>
            <span>Plăți securizate prin Stripe</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
