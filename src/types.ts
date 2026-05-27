/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Language = 'es' | 'en';

export interface ColorPaletteEntry {
  id: string;
  nameEs: string;
  nameEn: string;
  hex: string;
  categoryEs: string;
  categoryEn: string;
  descriptionEs: string;
  descriptionEn: string;
  isToucanColor?: boolean;
}

export interface Product {
  id: string;
  nameEs: string;
  nameEn: string;
  category: 'paints' | 'tools' | 'sealants' | 'accessories';
  descriptionEs: string;
  descriptionEn: string;
  price: number;
  unitEs: string;
  unitEn: string;
  rating: number;
  reviewsCount: number;
  image: string;
  featured?: boolean;
  colorHex?: string; // If it represents a pre-mixed paint color
  stock: number;
}

export interface CoverageInput {
  width: number; // meters
  height: number; // meters
  doors: number;
  windows: number;
  coats: number;
  paintType: 'matte' | 'satin' | 'gloss';
}

export interface CoverageOutput {
  wallArea: number; // square meters
  netArea: number; // square meters (excluding doors and windows)
  litersNeeded: number;
  gallonsNeeded: number;
  cansRecommended: number; // rounding up to typical cans (3.8 liters / 1 gal per can)
}

export interface FAQItem {
  questionEs: string;
  questionEn: string;
  answerEs: string;
  answerEn: string;
}

export interface OrderState {
  productName: string;
  colorName?: string;
  colorHex?: string;
  liters: number;
  name: string;
  email: string;
  phone: string;
  submitted: boolean;
  loading: boolean;
  error: string | null;
}
