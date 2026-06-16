import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Dispatch & Sales Desk | Canadian Prop Money',
  description: 'Connect with our Canadian Prop Money dispatch desk. Contact sales@canadianpropmoney.org or message us via WhatsApp at +1 (843) 732-0661 for bulk or custom inquiries.',
  alternates: {
    canonical: 'https://canadianpropmoney.org/contact',
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
