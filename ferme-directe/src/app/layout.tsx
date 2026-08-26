import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/layout/Header';
import CartDrawer from '@/components/cart/CartDrawer';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000'),
  title: {
    default: 'Ferma — Produse Proaspete Direct de la Fermă | Fresh Farm Products Romania',
    template: '%s | Ferma',
  },
  description:
    'Cumpără tomate de excepție, legume proaspete și produse artizanale direct de la ferma noastră din România. Livrare locală, produse fără pesticide. Shop fresh organic vegetables and artisan products from our Romanian farm.',
  keywords: ['ferma', 'tomate', 'legume proaspete', 'bio', 'România', 'livrare locală', 'farm to table'],
  openGraph: {
    type: 'website',
    locale: 'ro_RO',
    alternateLocale: 'en_US',
    siteName: 'Ferma',
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ro" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400..800&family=Newsreader:ital,opsz,wght@0,6..72,400..700;1,6..72,400..500&family=Plus+Jakarta+Sans:wght@300..700&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#C4622D" />
      </head>
      <body className="grain">
        <Header />
        <main style={{ minHeight: '100vh' }}>
          {children}
        </main>
        <Footer />
        <CartDrawer />
      </body>
    </html>
  );
}
