import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Our Film Props | Canadian Prop Money',
  description: 'Learn about Canadian Prop Money, established in 2012. We design ultra-realistic, compliant currency props with non-glare coatings and certificates of authenticity.',
  alternates: {
    canonical: 'https://canadianpropmoney.org/about',
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
