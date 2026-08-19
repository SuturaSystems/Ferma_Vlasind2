import type { Product, BoxSubscription } from '@/types';

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Produits Seed — Ferma
// Données de démonstration (remplacer par DB en production)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const PRODUCTS: Product[] = [
  {
    id: 'tom-inima',
    slug: 'tomate-inima-de-bou',
    name: { ro: 'Tomate Inimă de Bou', en: 'Beef Heart Tomatoes' },
    description: {
      ro: 'Soiul nostru emblematic. Cărnoase, puțin acide, cu un gust bogat și profund. Perfecte pentru salate și sosuri.',
      en: 'Our signature variety. Meaty, slightly acidic, with a rich and deep flavour. Perfect for salads and sauces.',
    },
    story: {
      ro: 'Cultivate din semințe tradiționale de peste 30 de ani, tomatele noastre Inimă de Bou sunt simbolul fermei. Fiecare roșie este crescută cu grijă, fără pesticide, în solul bogat al Olteniei.',
      en: 'Grown from traditional seeds for over 30 years, our Beef Heart tomatoes are the symbol of the farm. Each tomato is carefully grown, pesticide-free, in the rich soil of Oltenia.',
    },
    price: 1200, // 12.00 RON/kg
    unit: 'kg',
    stock: 45,
    category: 'tomate',
    season: ['vara', 'ete'],
    images: ['/images/products/tomate-inima.jpg'],
    badges: ['Fără pesticide', 'Soi tradițional', 'Recoltă proaspătă'],
    featured: true,
    available: true,
    origin: 'Oltenia, România',
    harvestDate: 'Zilnic dimineața',
  },
  {
    id: 'tom-cherry',
    slug: 'tomate-cherry-mix',
    name: { ro: 'Cherry Mix de Culori', en: 'Coloured Cherry Mix' },
    description: {
      ro: 'Un amestec festiv de cherry roșii, galbene și negre. Dulci și zemoase, ideale pentru aperitive și mese copii.',
      en: 'A festive mix of red, yellow and black cherry tomatoes. Sweet and juicy, ideal for appetizers and kids meals.',
    },
    story: {
      ro: 'Trei soiuri de cherry crescute în aceeași seră, culese manual la coacere perfectă.',
      en: 'Three cherry varieties grown in the same greenhouse, hand-picked at perfect ripeness.',
    },
    price: 1500, // 15.00 RON/500g
    unit: 'kg',
    stock: 28,
    category: 'tomate',
    season: ['vara', 'ete'],
    images: ['/images/products/cherry-mix.jpg'],
    badges: ['Fără pesticide', 'Dulci naturale'],
    featured: true,
    available: true,
    origin: 'Oltenia, România',
    harvestDate: 'Zilnic dimineața',
  },
  {
    id: 'tom-negre',
    slug: 'tomate-negre-kumato',
    name: { ro: 'Tomate Negre Kumato', en: 'Black Kumato Tomatoes' },
    description: {
      ro: 'Varietatea rară cu gust complex, ușor dulce-amăruie. Apreciate de gurmanzi și chefi profesioniști.',
      en: 'The rare variety with complex taste, slightly sweet-bitter. Prized by food lovers and professional chefs.',
    },
    story: {
      ro: 'Soi rar, cu pigment natural închis. Bogate în antioxidanți, cu un profil de gust care surprinde la fiecare mușcătură.',
      en: 'Rare variety with natural dark pigment. Rich in antioxidants, with a flavour profile that surprises with every bite.',
    },
    price: 1800,
    unit: 'kg',
    stock: 12,
    category: 'tomate',
    season: ['vara', 'ete'],
    images: ['/images/products/tomate-negre.jpg'],
    badges: ['Soi rar', 'Bogat în antioxidanți'],
    featured: false,
    available: true,
    origin: 'Oltenia, România',
    harvestDate: 'De 3 ori pe săptămână',
  },
  {
    id: 'salata-verde',
    slug: 'salata-verde-proaspata',
    name: { ro: 'Salată Verde de Grădină', en: 'Fresh Garden Lettuce' },
    description: {
      ro: 'Salată crocantă, culeasă în dimineața livrării. Proaspătă, fără nitrați, direct din solar.',
      en: 'Crispy lettuce, harvested on delivery morning. Fresh, nitrate-free, straight from the greenhouse.',
    },
    story: {
      ro: 'Crescută în solul natural, udată cu apă de izvor.',
      en: 'Grown in natural soil, watered with spring water.',
    },
    price: 600,
    unit: 'botte',
    stock: 60,
    category: 'legume',
    season: ['printemps', 'ete'],
    images: ['/images/products/salata.jpg'],
    badges: ['Fără nitrați', 'Recoltată dimineața'],
    featured: false,
    available: true,
    origin: 'Oltenia, România',
    harvestDate: 'În ziua livrării',
  },
  {
    id: 'castraveti',
    slug: 'castraveti-de-camp',
    name: { ro: 'Castraveți de Câmp', en: 'Field Cucumbers' },
    description: {
      ro: 'Castraveți fragezi, parfumați, crescuți în aer liber. Cu coajă subțire, miezul este crocant și răcoritor.',
      en: 'Tender, fragrant cucumbers, grown outdoors. With thin skin, the flesh is crispy and refreshing.',
    },
    story: {
      ro: 'Soiuri tradiționale românești de câmp, fără tratamente chimice.',
      en: 'Traditional Romanian field varieties, without chemical treatments.',
    },
    price: 700,
    unit: 'kg',
    stock: 35,
    category: 'legume',
    season: ['vara', 'ete'],
    images: ['/images/products/castraveti.jpg'],
    badges: ['Câmp deschis', 'Soi tradițional'],
    featured: false,
    available: true,
    origin: 'Oltenia, România',
    harvestDate: 'Zilnic',
  },
  {
    id: 'oua-tara',
    slug: 'oua-de-tara',
    name: { ro: 'Ouă de Țară', en: 'Free-Range Eggs' },
    description: {
      ro: 'Ouă de la găini crescute liber, hrănite natural cu cereale și verdeață. Gălbenuș portocaliu intens.',
      en: 'Eggs from free-range hens, naturally fed with cereals and greens. Intense orange yolk.',
    },
    story: {
      ro: 'Găinile noastre se plimbă liber toată ziua pe pășunile fermei. Hrănite cu cereale și insecte naturale, ouăle lor sunt excepționale.',
      en: 'Our hens roam freely all day on the farm pastures. Fed with cereals and natural insects, their eggs are exceptional.',
    },
    price: 200, // 2.00 RON/ou
    unit: 'piece',
    stock: 120,
    category: 'oeufs',
    season: ['printemps', 'ete', 'automne', 'iarna'],
    images: ['/images/products/oua.jpg'],
    badges: ['Găini libere', 'Hrană naturală'],
    featured: true,
    available: true,
    origin: 'Ferma Noastră, Oltenia',
    harvestDate: 'Zilnic',
  },
  {
    id: 'miere-flori',
    slug: 'miere-de-flori',
    name: { ro: 'Miere de Flori de Câmp', en: 'Wildflower Honey' },
    description: {
      ro: 'Miere polifloră, culeasă din florile câmpurilor fermei. Aromată, cu gust complex și culoare chihlimbar.',
      en: 'Polyfloral honey, gathered from the farm\'s field flowers. Fragrant, with complex taste and amber colour.',
    },
    story: {
      ro: 'Stupii noștri stau la marginea câmpurilor, departe de orice poluare. Mierea este extrasă manual, neîncălzită, păstrând toate enzimele naturale.',
      en: 'Our hives stand at the edge of the fields, away from any pollution. The honey is manually extracted, unheated, preserving all natural enzymes.',
    },
    price: 3500, // 35.00 RON/borcan 500g
    unit: 'borcan',
    stock: 20,
    category: 'miel',
    season: ['ete', 'automne'],
    images: ['/images/products/miere.jpg'],
    badges: ['Miere crudă', 'Nefiltrată', 'Polifloră'],
    featured: false,
    available: true,
    origin: 'Ferma Noastră, Oltenia',
    harvestDate: 'Recoltă anuală',
  },
  {
    id: 'zacusca',
    slug: 'zacusca-traditionala',
    name: { ro: 'Zacuscă Tradițională', en: 'Traditional Zacuscă' },
    description: {
      ro: 'Rețeta bunicii noastre: vinete coapte, ardei copți, ceapă și roșii de la ferma noastră. Fără conservanți.',
      en: 'Our grandmother\'s recipe: roasted eggplant, roasted peppers, onion and tomatoes from our farm. No preservatives.',
    },
    story: {
      ro: 'Preparată manual în fiecare toamnă, cu legume culese chiar de pe ferma noastră. O tradiție de 3 generații.',
      en: 'Prepared by hand every autumn, with vegetables harvested right from our farm. A 3-generation tradition.',
    },
    price: 2500,
    unit: 'borcan',
    stock: 15,
    category: 'conserves',
    season: ['automne', 'iarna'],
    images: ['/images/products/zacusca.jpg'],
    badges: ['Rețetă tradițională', 'Fără conservanți', '3 generații'],
    featured: true,
    available: true,
    origin: 'Ferma Noastră, Oltenia',
    harvestDate: 'Recoltă toamnă',
  },
];

export const BOX_SUBSCRIPTIONS: BoxSubscription[] = [
  {
    id: 'box-mica',
    name: { ro: 'Coșul Mic', en: 'Small Basket' },
    description: {
      ro: 'Perfect pentru 1-2 persoane. Legume și tomate de sezon, selectate manual.',
      en: 'Perfect for 1-2 people. Seasonal vegetables and tomatoes, hand-selected.',
    },
    price: 8500, // 85 RON
    frequency: 'weekly',
    items: [
      '1 kg Tomate Inimă de Bou',
      '500g Cherry Mix',
      '1 Bostă Salată Verde',
      '500g Castraveți',
      '6 Ouă de Țară',
    ],
    image: '/images/boxes/box-mica.jpg',
    stripePriceId: undefined,
  },
  {
    id: 'box-familie',
    name: { ro: 'Coșul Familiei', en: 'Family Basket' },
    description: {
      ro: 'Ideal pentru 3-4 persoane. Varietate completă de produse proaspete de fermă.',
      en: 'Ideal for 3-4 people. Full variety of fresh farm products.',
    },
    price: 15000, // 150 RON
    frequency: 'weekly',
    items: [
      '2 kg Tomate Inimă de Bou',
      '1 kg Cherry Mix',
      '2 Boșchi Salată',
      '1 kg Castraveți',
      '12 Ouă de Țară',
      '1 Borcan Miere (opțional)',
    ],
    image: '/images/boxes/box-familie.jpg',
    popular: true,
    stripePriceId: undefined,
  },
  {
    id: 'box-premium',
    name: { ro: 'Coșul Premium', en: 'Premium Basket' },
    description: {
      ro: 'Experiența completă Ferma. Cele mai bune produse ale săptămânii, livrare prioritară.',
      en: 'The complete Ferma experience. Best products of the week, priority delivery.',
    },
    price: 25000, // 250 RON
    frequency: 'weekly',
    items: [
      'Selecție premium de tomate (3 soiuri)',
      'Legume mixte de sezon',
      '18 Ouă de Țară',
      '1 Borcan Miere de Flori',
      '1 Borcan Zacuscă',
      'Herbes fraîches assortiment',
      'Livrare prioritară inclusă',
    ],
    image: '/images/boxes/box-premium.jpg',
    stripePriceId: undefined,
  },
];

export const DELIVERY_ZONES = [
  { id: 'zone-1', name: 'Cluj-Napoca (centru)', fee: 1000, minOrder: 5000 },
  { id: 'zone-2', name: 'Cluj-Napoca (periferié)', fee: 1500, minOrder: 5000 },
  { id: 'zone-3', name: 'Localități apropiate (< 20km)', fee: 2000, minOrder: 8000 },
];

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: string): Product[] {
  if (category === 'all') return PRODUCTS.filter((p) => p.available);
  return PRODUCTS.filter((p) => p.category === category && p.available);
}

export function getFeaturedProducts(): Product[] {
  return PRODUCTS.filter((p) => p.featured && p.available);
}

export function formatPrice(priceInCents: number): string {
  return (priceInCents / 100).toFixed(2) + ' RON';
}
