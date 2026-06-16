import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Film-Grade Canadian Prop Money Packages | Shop Replicas',
  description: 'Browse our catalog of realistic Canadian prop money. Order premium $20, $50, and $100 polymer-grade replica bills, movie-set bundles, and production props with certificates.',
  alternates: {
    canonical: 'https://canadianpropmoney.org/products',
  },
};

export default function ProductsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
