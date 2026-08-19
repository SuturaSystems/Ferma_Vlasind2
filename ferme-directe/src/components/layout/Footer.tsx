'use client';

import Link from 'next/link';
import { Leaf, Share2, ExternalLink, Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{
      background: 'var(--color-brown)',
      color: 'rgba(245,237,214,0.75)',
      padding: '4rem 0 2rem',
    }}>
      <div className="container-site">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '3rem',
          marginBottom: '3rem',
        }}>
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <div style={{
                width: 32, height: 32, borderRadius: '50%',
                background: 'var(--color-terracotta)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Leaf size={16} color="white" />
              </div>
              <span style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.375rem',
                fontWeight: 700,
                color: 'var(--color-cream)',
              }}>
                Ferma
              </span>
            </div>
            <p style={{ fontSize: '0.9rem', lineHeight: 1.65, marginBottom: '1.25rem' }}>
              Produse proaspete direct de la ferma noastră din Oltenia. Trei generații de pasiune pentru pământ.
            </p>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
                className="btn btn-ghost btn-icon"
                style={{ color: 'rgba(245,237,214,0.6)', border: '1px solid rgba(245,237,214,0.15)' }}>
                <Share2 size={16} />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"
                className="btn btn-ghost btn-icon"
                style={{ color: 'rgba(245,237,214,0.6)', border: '1px solid rgba(245,237,214,0.15)' }}>
                <ExternalLink size={16} />
              </a>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h3 style={{ color: 'var(--color-cream)', fontWeight: 600, marginBottom: '1rem', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Magazin
            </h3>
            {[
              { href: '/boutique', label: 'Toate Produsele' },
              { href: '/boutique?cat=tomate', label: 'Tomate de Excepție' },
              { href: '/boutique?cat=legume', label: 'Legume Proaspete' },
              { href: '/paniers', label: 'Coșuri Abonament' },
            ].map(({ href, label }) => (
              <Link key={label} href={href} style={{
                display: 'block',
                fontSize: '0.9rem',
                color: 'rgba(245,237,214,0.65)',
                textDecoration: 'none',
                marginBottom: '0.5rem',
                transition: 'color 150ms',
              }}
                onMouseEnter={e => (e.target as HTMLElement).style.color = 'var(--color-cream)'}
                onMouseLeave={e => (e.target as HTMLElement).style.color = 'rgba(245,237,214,0.65)'}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Info */}
          <div>
            <h3 style={{ color: 'var(--color-cream)', fontWeight: 600, marginBottom: '1rem', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Ferma
            </h3>
            {[
              { href: '/notre-ferme', label: 'Povestea Noastră' },
              { href: '/notre-ferme#valori', label: 'Valorile Noastre' },
              { href: '/blog', label: 'Jurnal de Sezon' },
            ].map(({ href, label }) => (
              <Link key={label} href={href} style={{
                display: 'block',
                fontSize: '0.9rem',
                color: 'rgba(245,237,214,0.65)',
                textDecoration: 'none',
                marginBottom: '0.5rem',
                transition: 'color 150ms',
              }}
                onMouseEnter={e => (e.target as HTMLElement).style.color = 'var(--color-cream)'}
                onMouseLeave={e => (e.target as HTMLElement).style.color = 'rgba(245,237,214,0.65)'}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Contact */}
          <div>
            <h3 style={{ color: 'var(--color-cream)', fontWeight: 600, marginBottom: '1rem', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Contact
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <a href="tel:+40700000000" style={{
                display: 'flex', alignItems: 'center', gap: '0.5rem',
                fontSize: '0.9rem', color: 'rgba(245,237,214,0.65)', textDecoration: 'none',
              }}>
                <Phone size={14} /> +40 700 000 000
              </a>
              <a href="mailto:contact@ferma.ro" style={{
                display: 'flex', alignItems: 'center', gap: '0.5rem',
                fontSize: '0.9rem', color: 'rgba(245,237,214,0.65)', textDecoration: 'none',
              }}>
                <Mail size={14} /> contact@ferma.ro
              </a>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.9rem' }}>
                <MapPin size={14} style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>Oltenia, România<br />Livrare locală</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: '1px solid rgba(245,237,214,0.1)',
          paddingTop: '1.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          fontSize: '0.8125rem',
          color: 'rgba(245,237,214,0.4)',
        }}>
          <span>© {currentYear} Ferma. Toate drepturile rezervate.</span>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <Link href="/confidentialitate" style={{ color: 'inherit', textDecoration: 'none' }}>Confidențialitate</Link>
            <Link href="/termeni" style={{ color: 'inherit', textDecoration: 'none' }}>Termeni</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
