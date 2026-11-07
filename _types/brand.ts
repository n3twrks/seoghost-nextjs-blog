// src/templates/saas/(seoghost)/_types/brand.ts
// Mirrors GET /api/v1/brand: the real content of the brand, entered in SEOGhost
// (Brand Kit). Plain text only: it is rendered as text, never as HTML.

export type BrandMedia = {
  id: string;
  kind: 'logo' | 'image' | 'video';
  url: string | null;
  video_url: string | null;
  caption: string | null;
  alt: string | null;
  width: number | null;
  height: number | null;
};

export type BrandReview = {
  id: string;
  author_name: string;
  body: string;
  rating: number | null;
  photo_url: string | null;
  source: string | null;
};

export type BrandOffer = {
  id: string;
  name: string;
  price_label: string | null;
  description: string | null;
  features: string[];
  cta_url: string | null;
  highlighted: boolean;
};

export type Brand = {
  logo: BrandMedia | null;
  media: BrandMedia[];
  reviews: BrandReview[];
  offers: BrandOffer[];
  benefits: string[];
};
