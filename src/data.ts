/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ColorPaletteEntry, Product, FAQItem } from './types';

export const COLOR_PALETTE: ColorPaletteEntry[] = [
  {
    id: 'toucan-orange',
    nameEs: 'Naranja Tucán',
    nameEn: 'Toucan Orange',
    hex: '#F97316',
    categoryEs: 'Paleta Exótica',
    categoryEn: 'Exotic Palette',
    descriptionEs: 'Un naranja sumamente energético y cálido inspirado en el pico de nuestro tucán.',
    descriptionEn: 'An energetic and warm orange inspired by our toucan\'s iconic bill.',
    isToucanColor: true
  },
  {
    id: 'tropical-yellow',
    nameEs: 'Amarillo Tropical',
    nameEn: 'Tropical Yellow',
    hex: '#FACC15',
    categoryEs: 'Paleta Exótica',
    categoryEn: 'Exotic Palette',
    descriptionEs: 'Luminoso y vibrante como el sol de la selva ecuatorial, perfecto para crear ambientes llenos de vida.',
    descriptionEn: 'Bright and vibrant like the equatorial jungle sun, perfect for creating lively spaces.',
    isToucanColor: true
  },
  {
    id: 'coral-red',
    nameEs: 'Rojo Coral',
    nameEn: 'Coral Red',
    hex: '#EF4444',
    categoryEs: 'Paleta Exótica',
    categoryEn: 'Exotic Palette',
    descriptionEs: 'El atrevido y pasional matiz rojo que acentúa las puntas del plumaje y pico del tucán.',
    descriptionEn: 'The bold, passionate red hue that highlights the tips of the toucan\'s features.',
    isToucanColor: true
  },
  {
    id: 'jungle-cyan',
    nameEs: 'Celeste Selva',
    nameEn: 'Jungle Cyan',
    hex: '#06B6D4',
    categoryEs: 'Paleta Exótica',
    categoryEn: 'Exotic Palette',
    descriptionEs: 'Un celeste refrescante e innovador, inspirado en los destellos magnéticos alrededor de los ojos de nuestro tucán.',
    descriptionEn: 'A refreshing and innovative light blue, inspired by the magnetic glow around our toucan\'s eyes.',
    isToucanColor: true
  },
  {
    id: 'ocean-blue',
    nameEs: 'Azul Marino Colormar',
    nameEn: 'Colormar Deep Blue',
    hex: '#1E3A8A',
    categoryEs: 'Clásicos Imperiales',
    categoryEn: 'Imperial Classics',
    descriptionEs: 'Elegante, equilibrado y profundo. Ideal para fachadas sofisticadas y paredes de acento.',
    descriptionEn: 'Elegant, balanced, and deep. Ideal for sophisticated facades and accent walls.',
  },
  {
    id: 'emerald-forest',
    nameEs: 'Verde Esmeralda',
    nameEn: 'Emerald Forest',
    hex: '#10B981',
    categoryEs: 'Naturaleza Orgánica',
    categoryEn: 'Organic Nature',
    descriptionEs: 'Un tono orgánico y pacífico que imita la opulencia de la vegetación selvática húmeda.',
    descriptionEn: 'An organic and peaceful shade echoing the richness of the wet rainforest canopy.',
  },
  {
    id: 'concrete-gray',
    nameEs: 'Gris Cemento',
    nameEn: 'Concrete Gray',
    hex: '#94A3B8',
    categoryEs: 'Minimalismo Urbano',
    categoryEn: 'Urban Minimalism',
    descriptionEs: 'El equilibrio industrial perfecto. Refinado, moderno y altamente versátil para interiores vanguardistas.',
    descriptionEn: 'The perfect industrial balance. Refined, modern, and highly versatile for vanguard interiors.',
  },
  {
    id: 'pure-alabaster',
    nameEs: 'Blanco Alabastro',
    nameEn: 'Alabaster White',
    hex: '#F8FAFC',
    categoryEs: 'Minimalismo Urbano',
    categoryEn: 'Urban Minimalism',
    descriptionEs: 'Un blanco puro y luminoso que multiplica el rebote de la luz natural de tus estancias.',
    descriptionEn: 'A pure, luminous white that multiplies natural light bounce inside your rooms.',
  }
];

export const PRODUCTS: Product[] = [
  {
    id: 'paint-premium-latex',
    nameEs: 'Pintura Látex Super-Acrílica Premium',
    nameEn: 'Premium Super-Acrylic Latex Paint',
    category: 'paints',
    descriptionEs: 'Acabado satinado de alta gama con máxima resistencia a la humedad, fácil de lavar y con pigmentação pura ultra-cubriente.',
    descriptionEn: 'High-end satin finish with maximum humidity resistance, scrubbable, and ultra-covering pure pigmentation.',
    price: 45.90,
    unitEs: 'Galón',
    unitEn: 'Gallon',
    rating: 4.9,
    reviewsCount: 148,
    image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=600&auto=format&fit=crop',
    featured: true,
    stock: 82
  },
  {
    id: 'paint-matte-exterior',
    nameEs: 'Pintura Exterior de Alta Durabilidad',
    nameEn: 'High-Durability Exterior Paint',
    category: 'paints',
    descriptionEs: 'Pintura elástica para exteriores con protección solar UV-Guard. Resiste agrietamientos, moho y climas tropicales extremos.',
    descriptionEn: 'Elastic exterior paint with active UV-Guard solar protection. Resists cracking, mold, and extreme tropical climates.',
    price: 52.50,
    unitEs: 'Galón',
    unitEn: 'Gallon',
    rating: 4.8,
    reviewsCount: 92,
    image: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?q=80&w=600&auto=format&fit=crop',
    featured: true,
    stock: 54
  },
  {
    id: 'sealant-impermax',
    nameEs: 'Impermeabilizante Membrana Elástica 10A',
    nameEn: 'ImperMax 10-Yr Elastic Membrane Sealant',
    category: 'sealants',
    descriptionEs: 'Sello impermeable para cubiertas y techos de concreto o zinc. Capacidad de elongación extrema contra filtraciones.',
    descriptionEn: 'Waterproof elastic sealant for concrete, masonry or tin roofs. Extreme elongation capability against water leaks.',
    price: 68.00,
    unitEs: 'Galón',
    unitEn: 'Gallon',
    rating: 4.9,
    reviewsCount: 77,
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=600&auto=format&fit=crop',
    stock: 30
  },
  {
    id: 'tool-pro-roller',
    nameEs: 'Rodillo Microfibra Profesional Antigoteo',
    nameEn: 'Pro Anti-Drip Microfiber Roller',
    category: 'tools',
    descriptionEs: 'Rodillo de felpa tejida de 9 pulgadas para una liberación homogénea del color. Mango ergonómico con rosca para extensión.',
    descriptionEn: '9-inch woven microfiber roller for ultra-smooth color release. Ergonomic handle compatible with standard extensions.',
    price: 14.99,
    unitEs: 'Unidad',
    unitEn: 'Unit',
    rating: 4.7,
    reviewsCount: 205,
    image: 'https://images.unsplash.com/photo-1534224039826-c7a0dea0e66a?q=80&w=600&auto=format&fit=crop',
    featured: true,
    stock: 120
  },
  {
    id: 'tool-pro-brush-set',
    nameEs: 'Juego de Brochas Premium con Cerda Mixta (3 u.)',
    nameEn: 'Premium Mixed Bristle Paint Brush Set (3-Pack)',
    category: 'tools',
    descriptionEs: 'Brochas de precisión para cortes de color limpios. Cerdas mixtas ideales para pinturas acrílicas y base aceite.',
    descriptionEn: 'Precision brushes for clean, straight color lines. Mixed bristles perfect for acrylic and oil-based paints.',
    price: 18.55,
    unitEs: 'Set',
    unitEn: 'Set',
    rating: 4.8,
    reviewsCount: 164,
    image: 'https://images.unsplash.com/photo-1520038410233-7141be7e6f97?q=80&w=600&auto=format&fit=crop',
    stock: 65
  },
  {
    id: 'accessory-clean-tape',
    nameEs: 'Cinta Azul para Enmascarar de Alta Precisión',
    nameEn: 'High-Precision Blue Masking Painter\'s Tape',
    category: 'accessories',
    descriptionEs: 'Cinta adhesiva de 1.5 pulgadas para enmascarado. Remoción limpia sin residuos de pegamento hasta por 14 días.',
    descriptionEn: '1.5-inch painter\'s blue tape. Clean removal with zero glue residue for up to 14 days after painting.',
    price: 4.50,
    unitEs: 'Rollo',
    unitEn: 'Roll',
    rating: 4.6,
    reviewsCount: 310,
    image: 'https://images.unsplash.com/photo-1595206133361-b1fe343e5e23?q=80&w=600&auto=format&fit=crop',
    stock: 450
  }
];

export const FAQS_DICT: FAQItem[] = [
  {
    questionEs: '¿Qué tipo de pintura debo usar para mi living o recámara?',
    questionEn: 'What type of paint should I use for my living room or bedroom?',
    answerEs: 'Para interiores de uso frecuente como recámaras y salas de estar, recomendamos nuestra Pintura Látex Super-Acrílica Premium con acabado Satín o Mate de Colormar. Es lavable, tiene un olor bajísimo (ideal para habitar el espacio rápido) y cubre imperfecciones excepcionalmente.',
    answerEn: 'For highly-trafficked interior spaces like bedrooms and family rooms, we recommend our Colormar Premium Super-Acrylic Latex in a Satin or Matte finish. It is scrubbable, low-odor (allowing fast re-occupancy), and hides wall minor imperfections beautifully.',
  },
  {
    questionEs: '¿Cómo calculo cuántos galones de pintura necesito comprar?',
    questionEn: 'How do I calculate how many gallons of paint I need to purchase?',
    answerEs: '¡Es súper sencillo! Puedes usar la Calculadora de Cobertura Interactiva que diseñamos especialmente para ti en esta página. Solo mide el ancho y alto de tus paredes, descuenta puertas y ventanas, ¡y el sistema te dirá la cifra exacta de galones que debes adquirir!',
    answerEn: 'It\'s easy! You can use our Interactive Paint Coverage Calculator built right into this page. Just input the width and height of your walls, subtract doors and windows, and our system instantly displays the exact gallon quantity to order!',
  },
  {
    questionEs: '¿Qué es el sistema de mezcla personalizada de Colormar?',
    questionEn: 'What is Colormar\'s Custom Paint Tinting System?',
    answerEs: 'En Colormar podemos modular cualquier tono del espectro. Si te inspira el exótico azul de nuestra paleta tucán, o si traes una muestra textil, con nuestro laboratorio computerizado de calibrado espectrofotométrico conseguimos la pintura exacta en la base que desees (mate, satinada o brillante).',
    answerEn: 'At Colormar we can formulate any tone under the spectrum. Whether you are inspired by our exotic toucan blue or bring a textile swatch, our spectrophotometric computerized laboratory obtains the exact match in the finish you prefer (matte, satin, or gloss).',
  },
  {
    questionEs: '¿La pintura exterior resiste filtraciones por lluvia y humedad?',
    questionEn: 'Does the exterior paint resist rain filtration and heavy humidity?',
    answerEs: 'Totalmente. Nuestra Pintura Exterior tiene resinas elastoméricas y tecnología UV-Blocker para expandirse y contraerse con el calor, sellando microfisuras estructurales de la pared y bloqueando el ingreso del agua y la formación de moho u hongos.',
    answerEn: 'Absolutely. Our Exterior Paint is manufactured with elastomeric resins and UV-Blocker technology to expand and contract with high temperature, sealing architectural micro-cracks on walls while blocking rain intrusion and the growth of mold or fungus.',
  },
  {
    questionEs: '¿Envían a domicilio o puedo retirar mi pedido en tienda?',
    questionEn: 'Do you deliver or can I pick up my order in-store?',
    answerEs: 'Ofrecemos ambas opciones. Al solicitar tu cotización o mezcla, puedes elegir despacho a domicilio ultra-rápido en 24 horas, o elegir el retiro Express en nuestra tienda central, donde te esperaremos con el café listo y tu pintura mezclada.',
    answerEn: 'We offer both options. When requesting a quote or custom paint order, you can choose 24-hour ultra-fast home delivery, or select Express Store Pickup, where we will wait for you with warm coffee and your custom paint fully mixed.'
  }
];
