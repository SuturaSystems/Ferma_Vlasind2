'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Heart, Leaf } from 'lucide-react';
import Link from 'next/link';
import { useStore } from '@/store';

export default function NotreFermePage() {
  const { language } = useStore();
  const l = language;

  const t = {
    tag: l === 'ro' ? 'Povestea Noastră' : 'Our Story',
    title: l === 'ro' ? 'O Fermă, O Familie,\nO Tradiție de 30 de Ani' : 'One Farm, One Family,\nA 30-Year Tradition',
    intro: l === 'ro'
      ? 'Ferma noastră se întinde pe 15 hectare de pământ fertil în inima Olteniei. Aici, trei generații de agricultori au cultivat dragostea pentru pământ și respectul pentru natură.'
      : 'Our farm spans 15 hectares of fertile land in the heart of Oltenia. Here, three generations of farmers have cultivated love for the land and respect for nature.',
    values: [
      {
        emoji: '🌱',
        title: l === 'ro' ? 'Fără Pesticide' : 'Pesticide-Free',
        desc: l === 'ro' ? 'Folosim metode tradiționale și naturale de control al dăunătorilor. Pământul și sănătatea ta sunt prioritatea noastră.' : 'We use traditional and natural pest control methods. Your land and health are our priority.',
      },
      {
        emoji: '💧',
        title: l === 'ro' ? 'Irigare Rațională' : 'Rational Irrigation',
        desc: l === 'ro' ? 'Sistemul nostru de irigare prin picurare economisește apa și asigură o creștere sănătoasă a plantelor.' : 'Our drip irrigation system saves water and ensures healthy plant growth.',
      },
      {
        emoji: '🌍',
        title: l === 'ro' ? 'Carbon Neutral' : 'Carbon Neutral',
        desc: l === 'ro' ? 'Livrăm local, reducem ambalajele și compostăm tot ce nu se poate vinde. Ferma noastră e prietenoasă cu planeta.' : 'We deliver locally, reduce packaging and compost everything that can\'t be sold. Our farm is planet-friendly.',
      },
      {
        emoji: '❤️',
        title: l === 'ro' ? 'Cu Suflet' : 'With Heart',
        desc: l === 'ro' ? 'Fiecare roșie e culeasă cu mâna. Fiecare produs poartă grija și pasiunea echipei noastre.' : 'Every tomato is hand-picked. Every product carries the care and passion of our team.',
      },
    ],
    teamTitle: l === 'ro' ? 'Echipa Noastră' : 'Our Team',
    ctaTitle: l === 'ro' ? 'Comandă Direct de la Noi' : 'Order Directly from Us',
    ctaDesc: l === 'ro' ? 'Livrare locală, produse proaspete, gust autentic.' : 'Local delivery, fresh products, authentic taste.',
    ctaBtn: l === 'ro' ? 'Deschide Magazinul' : 'Open the Shop',
  };

  return (
    <div style={{ paddingTop: '5rem' }}>
      {/* Hero */}
      <section style={{
        position: 'relative',
        height: '70vh', minHeight: '500px',
        overflow: 'hidden',
        display: 'flex', alignItems: 'flex-end',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'url(/images/farm-aerial.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundColor: '#6B7C5A',
        }}>
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to top, rgba(42,34,24,0.8) 0%, rgba(42,34,24,0.2) 60%, transparent 100%)',
          }} />
        </div>

        <div className="container-site" style={{ position: 'relative', zIndex: 2, paddingBottom: '4rem', width: '100%' }}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <span style={{
              fontSize: '0.75rem', fontWeight: 600,
              color: 'rgba(200,220,180,0.9)',
              textTransform: 'uppercase', letterSpacing: '0.1em',
              display: 'block', marginBottom: '0.875rem',
            }}>
              {t.tag}
            </span>
            <h1 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2rem, 5vw, 3.75rem)',
              fontWeight: 700,
              color: 'white',
              lineHeight: 1.15,
              maxWidth: '20ch',
              whiteSpace: 'pre-line',
            }}>
              {t.title}
            </h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '1.25rem', color: 'rgba(245,237,214,0.7)' }}>
              <MapPin size={15} />
              <span style={{ fontSize: '0.9375rem' }}>Oltenia, România</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Intro */}
      <section style={{ padding: '4rem 0', background: 'var(--color-offwhite)' }}>
        <div className="container-site" style={{ maxWidth: '800px' }}>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.125rem, 2.5vw, 1.375rem)',
              color: 'var(--color-brown)',
              lineHeight: 1.7,
              fontStyle: 'italic',
            }}
          >
            {t.intro}
          </motion.p>
        </div>
      </section>

      {/* Values */}
      <section style={{ padding: '4rem 0 5rem', background: 'var(--color-cream)' }}>
        <div className="container-site">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.5rem, 3vw, 2rem)',
              fontWeight: 700,
              color: 'var(--color-brown)',
              marginBottom: '2.5rem',
            }}
          >
            {l === 'ro' ? 'Valorile Noastre' : 'Our Values'}
          </motion.h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '1.5rem',
          }}>
            {t.values.map((val, i) => (
              <motion.div
                key={val.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="card"
                style={{ padding: '1.75rem' }}
              >
                <div style={{ fontSize: '2.25rem', marginBottom: '0.875rem' }}>{val.emoji}</div>
                <h3 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.125rem',
                  fontWeight: 700,
                  color: 'var(--color-brown)',
                  marginBottom: '0.625rem',
                }}>
                  {val.title}
                </h3>
                <p style={{ fontSize: '0.9375rem', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
                  {val.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{
        background: 'var(--color-terracotta)',
        padding: '4rem 0',
        textAlign: 'center',
      }}>
        <div className="container-site">
          <Heart size={32} color="rgba(245,237,214,0.6)" style={{ marginBottom: '1rem' }} />
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
            fontWeight: 700,
            color: 'var(--color-white)',
            marginBottom: '0.875rem',
          }}>
            {t.ctaTitle}
          </h2>
          <p style={{ color: 'rgba(245,237,214,0.8)', fontSize: '1.0625rem', marginBottom: '2rem' }}>
            {t.ctaDesc}
          </p>
          <Link href="/boutique" className="btn" style={{
            background: 'var(--color-white)',
            color: 'var(--color-terracotta)',
            padding: '0.875rem 2rem',
            borderRadius: 'var(--radius-lg)',
            fontWeight: 600,
            fontSize: '1rem',
          }}>
            {t.ctaBtn}
          </Link>
        </div>
      </section>
    </div>
  );
}
