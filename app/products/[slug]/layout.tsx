import { Metadata } from 'next';
import { PRODUCTS } from '@/lib/data';

interface Props {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = PRODUCTS.find((p) => p.slug === slug);
  if (!product) {
    return {
      title: 'Canadian Prop Money Banknote Replica',
    };
  }
  return {
    title: `${product.name} | Canadian Prop Money`,
    description: `${product.tagline} ${product.description}`.substring(0, 160),
    alternates: {
      canonical: `https://canadianpropmoney.org/products/${slug}`,
    },
  };
}

export default function ProductDetailLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
